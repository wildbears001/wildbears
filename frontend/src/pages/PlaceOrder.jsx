import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [isCodEnabled, setIsCodEnabled] = useState(false);
  const [razorpayDiscount, setRazorpayDiscount] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isBuyNow = searchParams.get('buyNow') === 'true';
  const buyProductId = searchParams.get('productId');
  const buySize = searchParams.get('size');

  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    free_delivery_threshold,
    products
  } = useContext(ShopContext);

  /* ================= FETCH SETTINGS ================= */
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/settings/get`);
        if (res.data?.success) {
          setIsCodEnabled(res.data.settings.isCodEnabled);
          setRazorpayDiscount(res.data.settings.razorpayDiscount || 0);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    };
    fetchSettings();
  }, [backendUrl]);


  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
    }
  }, [token]);

  if (!token) return null;

  /* ================= FORM & SAVED ADDRESSES ================= */
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '',
    pincode: '', country: '', phone: ''
  });
  const [errors, setErrors] = useState({});

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [saveAddressEnabled, setSaveAddressEnabled] = useState(false);
  const [addressName, setAddressName] = useState('');

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
      setSavedAddresses(stored);
    } catch(e) {}
  }, []);

  const validateField = (name, value) => {
    let error = "";
    const val = value.trim();

    switch (name) {
      case "firstName":
      case "lastName":
        if (!val) error = "Required field";
        else if (val.length < 2) error = "Minimum 2 characters required";
        else if (!/^[A-Za-z\s]+$/.test(val)) error = "Only alphabets allowed";
        break;
      case "email":
        if (!val) error = "Required field";
        else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(val)) error = "Please enter a valid Gmail address";
        break;
      case "phone":
        if (!val) error = "Required field";
        else if (!/^[0-9]{10}$/.test(val)) error = "Please enter a valid 10-digit mobile number";
        break;
      case "pincode":
        if (!val) error = "Required field";
        else if (!/^[0-9]{6}$/.test(val)) error = "Please enter a valid 6-digit pincode";
        break;
      case "street":
        if (!val) error = "Required field";
        else if (val.length < 5) error = "Minimum 5 characters required";
        break;
      case "city":
      case "state":
      case "country":
        if (!val) error = "Required field";
        else if (!/^[A-Za-z\s]+$/.test(val)) error = "Only alphabets allowed";
        break;
      default:
        break;
    }
    return error;
  };

  const handleSelectAddress = (addr) => {
    const newFormData = {
      firstName: addr.firstName || '',
      lastName: addr.lastName || '',
      email: addr.email || '',
      street: addr.street || '',
      city: addr.city || '',
      state: addr.state || '',
      pincode: addr.pincode || '',
      country: addr.country || '',
      phone: addr.phone || ''
    };
    setFormData(newFormData);
    const newErrors = {};
    for (const key in newFormData) {
      newErrors[key] = validateField(key, newFormData[key]);
    }
    setErrors(newErrors);
    toast.info(`Selected address: ${addr.addressName || 'Saved Address'}`);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/^\s+/, '').replace(/\s{2,}/g, ' ');
    setFormData(d => ({ ...d, [name]: sanitizedValue }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, sanitizedValue) }));
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;
    for (const key in formData) {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const isFormValid = Object.values(errors).every(err => err === "") && Object.values(formData).every(val => val.trim() !== "");

  /* ================= COUPONS ================= */
  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');

  /* ================= DATA COMPUTATION ================= */
  const buyNowProduct = isBuyNow ? products.find(p => p._id === buyProductId) : null;
  const subTotal = buyNowProduct ? buyNowProduct.price : getCartAmount();
  const isFreeDelivery = free_delivery_threshold > 0 && subTotal >= free_delivery_threshold;
  const effectiveDeliveryFee = isFreeDelivery ? 0 : delivery_fee;

  const getOrderItemsList = () => {
    if (isBuyNow && buyNowProduct) {
      const p = structuredClone(buyNowProduct);
      p.size = buySize;
      p.quantity = 1;
      return [p];
    }
    const items = [];
    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        if (cartItems[id][size] > 0) {
          const product = structuredClone(products.find(p => p._id === id));
          if (product) {
            product.size = size;
            product.quantity = cartItems[id][size];
            items.push(product);
          }
        }
      }
    }
    return items;
  };

  const orderItems = getOrderItemsList();

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Enter coupon code");
      return;
    }

    try {
      setCouponLoading(true);
      setCouponError("");

      const res = await axios.post(
        `${backendUrl}/api/coupons/apply`,
        { code: couponCode.trim(), orderAmount: subTotal },
        { headers: { Authorization: `Bearer ${token}` } }
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

  /* ================= PAYMENT ================= */
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
            if (!isBuyNow) setCartItems({});
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

    if (!validateAll()) {
      toast.error("Please fix the validation errors");
      return;
    }

    if (orderItems.length === 0) {
      toast.error(isBuyNow ? "Product not found" : "Cart is empty");
      return;
    }

    const trimmedData = {};
    for (const key in formData) {
      trimmedData[key] = formData[key].trim();
    }

    // Save Address Logic
    if (saveAddressEnabled && addressName.trim()) {
      const newSaved = [...savedAddresses, { ...trimmedData, addressName: addressName.trim() }];
      setSavedAddresses(newSaved);
      localStorage.setItem('savedAddresses', JSON.stringify(newSaved));
      toast.success("Address saved locally for future use!");
    }

    try {
      const totalAmount = Math.max(0, subTotal + effectiveDeliveryFee + (method === "cod" ? 100 : 0) - discountAmount - (method === "razorpay" ? razorpayDiscount : 0));

      const orderData = {
        address: trimmedData,
        items: orderItems,
        amount: totalAmount,
        coupon: couponData?.code || null,
        discount: discountAmount
      };

      setLoading(true);

      if (method === "razorpay") {
        const res = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          orderData,
          { headers: { token } }
        );

        if (res.data.success) {
          initPay(res.data.order);
        } else {
          toast.error(res.data.message || "Payment initialization failed");
          setLoading(false);
        }
      } else if (method === "cod") {
        if (!isCodEnabled) {
          toast.error("Cash on Delivery is currently disabled.");
          setLoading(false);
          return;
        }

        const res = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
        );
        if (res.data.success) {
            if (!isBuyNow) setCartItems({});
            toast.success("Order Placed Successfully via COD");
            navigate("/orders");
        } else {
            toast.error(res.data.message || "Failed to place COD order");
            setLoading(false);
        }

      } else {
        toast.error("Only Razorpay or COD is supported right now");
        setLoading(false);
      }

    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <form onSubmit={onSubmitHandler} className="min-h-screen pt-6 sm:pt-10 pb-20 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-10">

        {/* LEFT COLUMN */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* AVAILABLE SAVED ADDRESSES */}
          {savedAddresses.length > 0 && (
             <section className="bg-white p-6 sm:p-8 rounded-2xl border">
                <Title text1="SAVED" text2="ADDRESSES" />
                <div className="flex gap-4 overflow-x-auto mt-4 pb-2 snap-x">
                  {savedAddresses.map((addr, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleSelectAddress(addr)}
                      className="min-w-[240px] snap-center border border-gray-200 p-4 rounded-xl cursor-pointer hover:border-[#6B4E2E] bg-gray-50 flex flex-col justify-between shrink-0"
                    >
                      <div>
                        <h4 className="font-semibold text-[#6B4E2E] flex items-center gap-2">📍 {addr.addressName}</h4>
                        <p className="text-sm mt-2 text-gray-700">{addr.street}, {addr.city}</p>
                      </div>
                      <span className="text-xs text-blue-600 mt-3 hover:underline">Select Address →</span>
                    </div>
                  ))}
                </div>
             </section>
          )}

          {/* DELIVERY */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border">
            <Title text1="DELIVERY" text2="DETAILS" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-6 sm:mt-8">
              {[
                { key: 'firstName', label: 'First Name *', placeholder: 'Enter your first name' },
                { key: 'lastName', label: 'Last Name *', placeholder: 'Enter your last name' },
                { key: 'email', label: 'Email *', placeholder: 'e.g. example@gmail.com' },
                { key: 'phone', label: 'Mobile Number *', placeholder: '10-digit mobile number' },
                { key: 'street', label: 'Address Line *', placeholder: 'Enter complete address' },
                { key: 'city', label: 'City *', placeholder: 'Enter city name' },
                { key: 'state', label: 'State *', placeholder: 'Enter state name' },
                { key: 'pincode', label: 'Pincode *', placeholder: '6-digit pincode' },
                { key: 'country', label: 'Country *', placeholder: 'Enter country name' }
              ].map(({ key, label, placeholder }) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700 ml-1">{label}</label>
                  <input
                    name={key} 
                    value={formData[key]}
                    onChange={onChangeHandler} 
                    placeholder={placeholder}
                    className={`border bg-gray-50 rounded-xl px-4 py-3 outline-none transition-colors
                      ${errors[key] ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:ring-1 focus:ring-[#6B4E2E]'}`}
                  />
                  {errors[key] && <span className="text-xs text-red-500 ml-1 animate-fade-in">{errors[key]}</span>}
                </div>
              ))}
            </div>

            {/* SAVE THIS ADDRESS CHECKBOX */}
            <div className="mt-8 border-t pt-6">
               <label className="flex items-center gap-3 cursor-pointer select-none">
                 <input 
                   type="checkbox" 
                   className="w-5 h-5 accent-[#6B4E2E]"
                   checked={saveAddressEnabled}
                   onChange={(e) => setSaveAddressEnabled(e.target.checked)}
                 />
                 <span className="text-md text-gray-800">Save this address for future checkouts</span>
               </label>
               
               {saveAddressEnabled && (
                 <div className="mt-4 animate-fade-in">
                   <input
                     name="addressName"
                     value={addressName}
                     required={saveAddressEnabled}
                     onChange={(e) => setAddressName(e.target.value)}
                     placeholder="Name this address (e.g. Home, Office, Studio)"
                     className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:ring-1 focus:ring-[#6B4E2E] outline-none max-w-sm"
                   />
                 </div>
               )}
            </div>

          </section>
        </div>

        {/* RIGHT COLUMN */}
        <section className="space-y-6">

          {/* ITEM OVERVIEW LIST */}
          <div className="bg-white p-6 rounded-2xl border">
            <Title text1="PURCHASE" text2="ITEMS" />
            <div className="mt-4 space-y-4 max-h-[300px] overflow-y-auto pr-2">
               {orderItems.map((item, idx) => (
                 <div key={idx} className="flex gap-3 sm:gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 items-center">
                    <img src={item.image?.[0] || assets.hero_image} className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded shadow-sm" alt="product"/>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">Size: <b>{item.size}</b> | Qty: <b>{item.quantity}</b></p>
                    </div>
                    <div>
                      <p className="font-bold text-[#6B4E2E]">₹{item.price * item.quantity}</p>
                    </div>
                 </div>
               ))}
               {orderItems.length === 0 && <p className="text-gray-400 italic">No items identified.</p>}
            </div>
          </div>

          {/* COUPON */}
          <div className="bg-white p-6 rounded-2xl border">
            <Title text1="APPLY" text2="COUPON" />
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code here..."
                className="w-full sm:flex-1 border bg-gray-50 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[#6B4E2E]"
              />
              <button
                type="button"
                onClick={applyCoupon}
                disabled={couponLoading}
                className="w-full sm:w-auto bg-[#6B4E2E] text-white px-6 py-3 rounded-xl hover:bg-[#5a4225] transition"
              >
                {couponLoading ? "APPLYING..." : "Apply"}
              </button>
            </div>
            {couponError && <p className="text-red-500 text-sm mt-2">{couponError}</p>}
          </div>

          {/* SUMMARY */}
          <div className="bg-white p-6 rounded-2xl border">
             <Title text1="ORDER" text2="SUMMARY" />
            <div className="space-y-3 mt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                {isFreeDelivery
                  ? <span className="text-green-600 font-semibold">FREE 🎉</span>
                  : <span className="font-medium">₹{effectiveDeliveryFee}</span>
                }
              </div>
              {isFreeDelivery && (
                <p className="text-xs text-green-600 -mt-1">Free delivery on orders above ₹{free_delivery_threshold}</p>
              )}
              {!isFreeDelivery && free_delivery_threshold > 0 && (
                <p className="text-xs text-amber-600 -mt-1">Add ₹{free_delivery_threshold - subTotal} more for free delivery</p>
              )}
              
              {method === 'cod' && (
                <div className="flex justify-between text-orange-600 bg-orange-50 p-2 rounded">
                  <span>COD Handling Fee</span>
                  <span className="font-bold">+₹100</span>
                </div>
              )}

              {method === 'razorpay' && razorpayDiscount > 0 && (
                <div className="flex justify-between text-green-600 bg-green-50 p-2 rounded">
                  <span>Razorpay Instant Discount</span>
                  <span className="font-bold">-₹{razorpayDiscount}</span>
                </div>
              )}

              {couponData && (
                <div className="flex justify-between text-green-600 bg-green-50 p-2 rounded">
                  <span>Discount ({couponData.code})</span>
                  <span className="font-bold">-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-xl border-t pt-4 mt-2">
                <span>Total</span>
                <span className="text-[#6B4E2E]">
                  ₹{Math.max(0, subTotal + effectiveDeliveryFee + (method === "cod" ? 100 : 0) - discountAmount - (method === "razorpay" ? razorpayDiscount : 0))}
                </span>
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white p-6 rounded-2xl border">
            <Title text1="PAYMENT" text2="METHOD" />

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div
                onClick={() => setMethod('razorpay')}
                className={`border p-4 rounded-xl cursor-pointer flex items-center justify-center transition
                  ${method === 'razorpay' ? 'bg-[#6B4E2E]/10 border-[#6B4E2E]' : 'hover:bg-gray-50'}`}
              >
                <img src={assets.razorpay_logo} className="h-6" alt="razorpay" />
              </div>

              <div
                onClick={() => isCodEnabled ? setMethod('cod') : toast.error("COD is disabled")}
                className={`border p-4 rounded-xl flex items-center justify-center transition
                  ${method === 'cod' ? 'bg-[#6B4E2E]/10 border-[#6B4E2E]' : 'hover:bg-gray-50'}
                  ${!isCodEnabled ? 'opacity-50 cursor-not-allowed bg-gray-100 block' : 'cursor-pointer'}`}
              >
                <div className="flex flex-col items-center">
                   <p className="font-medium text-gray-800">Cash on Delivery</p>
                   {!isCodEnabled && <span className="text-xs text-red-500 mt-1">Currently Disabled</span>}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="w-full bg-[#6B4E2E] text-white px-8 py-4 rounded-xl font-bold tracking-wide hover:bg-[#5a4225] transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-[#6B4E2E]/20"
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
