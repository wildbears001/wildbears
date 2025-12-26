import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const navigate = useNavigate();

  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
    }
  }, [token]);

  if (!token) return null;

  /* ================= FORM ================= */
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '',
    pincode: '', country: '', phone: ''
  });

  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const onChangeHandler = (e) =>
    setFormData(d => ({ ...d, [e.target.name]: e.target.value }));

  /* ================= APPLY COUPON (BACKEND) ================= */
  const applyCoupon = async () => {
  if (!couponCode.trim()) {
    toast.error("Enter coupon code");
    return;
  }

  try {
    setCouponLoading(true);
    setCouponError("");

    const orderAmount = getCartAmount();

    const res = await axios.post(
      `${backendUrl}/api/coupons/apply`,
      {
        code: couponCode.trim(),
        orderAmount
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (res.data.success) {
      setCouponData({ code: res.data.code });
      setDiscountAmount(res.data.discount);
      toast.success(res.data.message);
    }

  } catch (err) {
    const msg = err.response?.data?.message || "Invalid coupon";
    setCouponError(msg);
    setCouponData(null);
    setDiscountAmount(0);
    toast.error(msg);
  } finally {
    setCouponLoading(false);
  }
};


  /* ================= RAZORPAY ================= */
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "WILDBEARS",
      description: "Secure Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const res = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            { headers: { token } }
          );

          if (res.data.success) {
            setCartItems({});
            toast.success("Payment successful");
            navigate("/orders");
          } else {
            toast.error("Payment verification failed");
          }
        } catch (err) {
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
          toast.info("Payment cancelled");
        }
      }
    };

    new window.Razorpay(options).open();
  };

  /* ================= SUBMIT ================= */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const hasItems = Object.keys(cartItems).some(id =>
      Object.values(cartItems[id]).some(qty => qty > 0)
    );

    if (!hasItems) {
      toast.error("Cart is empty");
      return;
    }

    try {
      let orderItems = [];

      for (const id in cartItems) {
        for (const size in cartItems[id]) {
          if (cartItems[id][size] > 0) {
            const product = structuredClone(products.find(p => p._id === id));
            if (product) {
              product.size = size;
              product.quantity = cartItems[id][size];
              orderItems.push(product);
            }
          }
        }
      }

      const totalAmount = Math.max(
        0,
        getCartAmount() + delivery_fee - discountAmount
      );

      const orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount,
        coupon: couponData?.code || null,
        discount: discountAmount
      };

      if (method !== "razorpay") {
        toast.error("Only Razorpay is supported");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/order/razorpay`,
        orderData,
        { headers: { token } }
      );

      if (res.data.success) {
        initPay(res.data.order);
      } else {
        toast.error("Payment initialization failed");
        setLoading(false);
      }

    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <form onSubmit={onSubmitHandler} className="min-h-screen pt-10 bg-[#faf9f7]">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10">

        {/* DELIVERY */}
        <section className="bg-white p-8 rounded-2xl border">
          <Title text1="DELIVERY" text2="DETAILS" />
          <div className="grid sm:grid-cols-2 gap-5 mt-8">
            {[
              ['firstName','First name'],['lastName','Last name'],
              ['email','Email'],['phone','Phone'],
              ['street','Street'],['city','City'],
              ['state','State'],['pincode','Pin code'],
              ['country','Country']
            ].map(([k,l]) => (
              <input
                key={k}
                name={k}
                required
                value={formData[k]}
                onChange={onChangeHandler}
                placeholder={l}
                className="border rounded-xl px-4 py-3"
              />
            ))}
          </div>
        </section>

        {/* RIGHT */}
        <section className="space-y-8">

          {/* SUMMARY */}
          <div className="bg-white p-8 rounded-2xl border">
            <h3 className="font-semibold mb-4">Order Summary</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{getCartAmount()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>₹{delivery_fee}</span>
              </div>

              {couponData && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({couponData.code})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between font-bold border-t pt-3">
                <span>Total</span>
                <span>
                  ₹{Math.max(0, getCartAmount() + delivery_fee - discountAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* COUPON */}
          <div className="bg-white p-6 rounded-2xl border">
            <Title text1="APPLY" text2="COUPON" />
            <div className="flex gap-3 mt-4">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon"
                className="flex-1 border rounded-xl px-4 py-3"
              />
              <button
                type="button"
                onClick={applyCoupon}
                disabled={couponLoading}
                className="bg-[#6B4E2E] text-white px-6 py-3 rounded-xl"
              >
                {couponLoading ? "APPLYING..." : "Apply"}
              </button>
            </div>
            {couponError && <p className="text-red-500 text-sm mt-2">{couponError}</p>}
          </div>

          {/* PAYMENT */}
          <div className="bg-white p-6 rounded-2xl border">
            <Title text1="PAYMENT" text2="METHOD" />

            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              {['stripe', 'razorpay', 'cod'].map(m => (
                <div
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`border p-4 rounded-xl cursor-pointer
                    ${method === m ? 'bg-[#6B4E2E]/10 border-[#6B4E2E]' : ''}`}
                >
                  {m === 'cod'
                    ? "Cash on Delivery"
                    : <img src={m === 'stripe' ? assets.stripe_logo : assets.razorpay_logo} className="h-6" />}
                </div>
              ))}
            </div>

            <p className="text-red-500 text-sm mt-4">
              * Only Razorpay is enabled , COD is Disabled
            </p>

            <div className="text-right mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#6B4E2E] text-white px-20 py-4 rounded-2xl"
              >
                {loading ? "PROCESSING..." : "PLACE ORDER"}
              </button>
            </div>
          </div>

        </section>
      </div>
    </form>
  );
};

export default PlaceOrder;
