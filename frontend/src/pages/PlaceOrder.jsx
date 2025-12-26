
// // // import React, { useContext, useEffect, useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import Title from '../components/Title';
// // // import { assets } from '../assets/assets';
// // // import { ShopContext } from '../context/ShopContext';
// // // import axios from 'axios';
// // // import { toast } from 'react-toastify';

// // // const PlaceOrder = () => {
// // //   const [method, setMethod] = useState("cod");
// // //   const [loading, setLoading] = useState(false);
// // //   const navigateFallback = useNavigate();

// // //   const {
// // //     navigate: contextNavigate,
// // //     backendUrl,
// // //     token,
// // //     cartItems,
// // //     setCartItems,
// // //     getCartAmount,
// // //     delivery_fee,
// // //     products
// // //   } = useContext(ShopContext);

// // //   const goTo = contextNavigate || navigateFallback;

// // //   useEffect(() => {
// // //     if (!token) {
// // //       toast.error("Please login to place an order");
// // //       goTo("/login");
// // //     }
// // //   }, [token, goTo]);

// // //   if (!token) return null;

// // //   const [formData, setFormData] = useState({
// // //     firstName: '',
// // //     lastName: '',
// // //     email: '',
// // //     street: '',
// // //     city: '',
// // //     state: '',
// // //     pincode: '',
// // //     country: '',
// // //     phone: '',
// // //   });

// // //   const [couponCode, setCouponCode] = useState('');
// // //   const [couponData, setCouponData] = useState(null);
// // //   const [discountAmount, setDiscountAmount] = useState(0);
// // //   const [couponError, setCouponError] = useState('');

  
// // //   const COUPONS = [
// // //     {
// // //       code: "VM07",
// // //       discount_type: "flat",
// // //       discount_value: 100,
// // //     },
// // //     {
// // //       code: "KGRH@300",
// // //       discount_type: "flat",
// // //       discount_value: 300,
// // //     },
// // //     {
// // //         code: "SMEC@300",
// // //         discount_type: "flat",
// // //         discount_value: 300,
// // //     }
// // //   ];

// // //   const onChangeHandler = (event) => {
// // //     const { name, value } = event.target;
// // //     setFormData(data => ({ ...data, [name]: value }));
// // //   };

// // //   // const applyCoupon = () => {
// // //   //   const orderAmount = getCartAmount();
// // //   //   if (couponCode.trim().toUpperCase() === DEFAULT_COUPON.code) {
// // //   //     const discount = DEFAULT_COUPON.discount_type === 'percentage'
// // //   //       ? (orderAmount * DEFAULT_COUPON.discount_value) / 100
// // //   //       : DEFAULT_COUPON.discount_value;

// // //   //     setCouponData(DEFAULT_COUPON);
// // //   //     setDiscountAmount(discount);
// // //   //     setCouponError('');
// // //   //     toast.success('Coupon applied successfully!');
// // //   //   } else {
// // //   //     setCouponData(null);
// // //   //     setDiscountAmount(0);
// // //   //     const msg = 'Invalid or expired coupon';
// // //   //     setCouponError(msg);
// // //   //     toast.error(msg);
// // //   //   }
// // //   // };
// // //   const applyCoupon = () => {
// // //     const code = couponCode.trim().toUpperCase();
// // //     const orderAmount = getCartAmount();

// // //     const matchedCoupon = COUPONS.find(c => c.code === code);

// // //     if (matchedCoupon) {
// // //       const discount = matchedCoupon.discount_type === 'percentage'
// // //         ? Math.floor((orderAmount * matchedCoupon.discount_value) / 100)
// // //         : matchedCoupon.discount_value;

// // //       setCouponData(matchedCoupon);
// // //       setDiscountAmount(discount);
// // //       setCouponError('');
// // //       toast.success(`Coupon ${matchedCoupon.code} applied successfully!`);
// // //     } else {
// // //       setCouponData(null);
// // //       setDiscountAmount(0);
// // //       setCouponError('Invalid or expired coupon');
// // //       toast.error('Invalid or expired coupon');
// // //     }
// // //   };

// // //   const initPay = (order) => {
// // //     const options = {
// // //       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// // //       amount: order.amount,
// // //       currency: order.currency,
// // //       name: 'Order Payment',
// // //       description: 'Order Payment',
// // //       order_id: order.id,
// // //       receipt: order.receipt,
// // //       handler: async (response) => {
// // //         try {
// // //           const res = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {
// // //             headers: { token }
// // //           });
// // //           if (res.data.success) {
// // //             setCartItems({});
// // //             goTo('/orders');
// // //           } else {
// // //             toast.error("Payment verification failed");
// // //             goTo('/cart');
// // //           }
// // //         } catch (error) {
// // //           console.log(error);
// // //           toast.error(error.message);
// // //         } finally {
// // //           setLoading(false);
// // //         }
// // //       },
// // //       modal: {
// // //         ondismiss: () => {
// // //           setLoading(false);
// // //           toast.info("Payment cancelled");
// // //         }
// // //       }
// // //     };

// // //     const rzp = new window.Razorpay(options);
// // //     rzp.open();
// // //   };

// // //   const onSubmitHandler = async (event) => {
// // //     event.preventDefault();

// // //     const hasItems = Object.keys(cartItems).some(
// // //       productId => Object.values(cartItems[productId]).some(qty => qty > 0)
// // //     );

// // //     if (!hasItems) {
// // //       toast.error("Cart is empty. Add items before placing order.");
// // //       return;
// // //     }

// // //     try {
// // //       let orderItems = [];

// // //       for (const items in cartItems) {
// // //         for (const item in cartItems[items]) {
// // //           if (cartItems[items][item] > 0) {
// // //             const itemInfo = structuredClone(products.find(product => product._id === items));
// // //             if (itemInfo) {
// // //               itemInfo.size = item;
// // //               itemInfo.quantity = cartItems[items][item];
// // //               orderItems.push(itemInfo);
// // //             }
// // //           }
// // //         }
// // //       }

// // //       const userId = localStorage.getItem('userId');
// // //       const totalAmount = Math.max(0, getCartAmount() + delivery_fee - discountAmount);

// // //       let orderData = {
// // //         userId,
// // //         address: formData,
// // //         items: orderItems,
// // //         amount: totalAmount,
// // //         coupon: couponData?.code || null,
// // //         discount: discountAmount
// // //       };

// // //       switch (method) {
// // //         case 'cod':
// // //           const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
// // //           if (response.data.success) {
// // //             setCartItems({});
// // //             goTo('/orders');
// // //             toast.success("Order Placed Successfully");
// // //           } else {
// // //             toast.error(response.data.message);
// // //           }
// // //           break;

// // //         case 'razorpay':
// // //           setLoading(true);
// // //           const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
// // //           if (responseRazorpay.data.success) {
// // //             initPay(responseRazorpay.data.order);
// // //           } else {
// // //             toast.error("Razorpay order failed");
// // //             setLoading(false);
// // //           }
// // //           break;

// // //         default:
// // //           break;
// // //       }

// // //     } catch (error) {
// // //       console.log(error);
// // //       toast.error(error.message);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
// // //       <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
// // //         <div className='text-xl sm:text-2xl my-3'>
// // //           <Title text1={'DELIVERY'} text2={'INFORMATION'} />
// // //         </div>

// // //         <div className='flex gap-3'>
// // //           <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
// // //           <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
// // //         </div>

// // //         <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
// // //         <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

// // //         <div className='flex gap-3'>
// // //           <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
// // //           <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
// // //         </div>

// // //         <div className='flex gap-3'>
// // //           <input required onChange={onChangeHandler} name='pincode' value={formData.pincode} type="number" placeholder='Pin code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
// // //           <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
// // //         </div>

// // //         <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Contact' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
// // //       </div>

// // //       <div className='mt-8'>
// // //         <div className='mt-8 min-w-80 border p-4 rounded shadow'>
// // //           <h2 className='text-lg font-semibold mb-4'>Cart Summary</h2>
// // //           <div className='flex justify-between mb-2'>
// // //             <span>Subtotal</span>
// // //             <span>₹{getCartAmount()}</span>
// // //           </div>
// // //           <div className='flex justify-between mb-2'>
// // //             <span>Delivery Fee</span>
// // //             <span>₹{delivery_fee}</span>
// // //           </div>
// // //           {couponData && (
// // //             <div className='flex justify-between mb-2 text-green-600'>
// // //               <span>Discount ({couponData.code})</span>
// // //               <span>-₹{discountAmount}</span>
// // //             </div>
// // //           )}
// // //           <div className='flex justify-between font-bold text-xl border-t pt-2'>
// // //             <span>Total</span>
// // //             <span>₹{Math.max(0, getCartAmount() + delivery_fee - discountAmount)}</span>
// // //           </div>
// // //         </div>

// // //         <div className='mt-10'>
// // //           <Title text1={'COUPON'} text2={'CODE'} />
// // //           <div className='flex gap-2 mt-2'>
// // //             <input
// // //               type='text'
// // //               placeholder='Enter coupon code'
// // //               value={couponCode}
// // //               onChange={(e) => setCouponCode(e.target.value)}
// // //               className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
// // //             />
// // //             <button
// // //               type='button'
// // //               onClick={applyCoupon}
// // //               className='bg-black text-white px-6 py-2 text-sm'
// // //             >
// // //               Apply
// // //             </button>
// // //           </div>
// // //           {couponError && <p className='text-red-500 text-sm mt-1'>{couponError}</p>}
// // //           {couponData && (
// // //             <div className="mt-1">
// // //               <p className='text-green-600 text-sm'>
// // //                 Coupon <strong>{couponData.code}</strong> applied: ₹{discountAmount} off
// // //               </p>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => {
// // //                   setCouponCode('');
// // //                   setCouponData(null);
// // //                   setDiscountAmount(0);
// // //                   toast.info('Coupon removed');
// // //                 }}
// // //                 className='text-red-500 underline text-sm mt-1'
// // //               >
// // //                 Remove coupon
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>

// // //         <div className='mt-12'>
// // //           <Title text1={'PAYMENT'} text2={'METHOD'} />
// // //           <div className='flex gap-3 flex-col lg:flex-row'>
// // //             <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
// // //               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`} />
// // //               <img src={assets.stripe_logo} className='h-5 mx-4' alt="stripe" />
// // //             </div>
// // //             <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
// // //               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`} />
// // //               <img src={assets.razorpay_logo} className='h-5 mx-4' alt="razorpay" />
// // //             </div>
// // //             <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
// // //               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`} />
// // //               <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
// // //             </div>
// // //           </div>

// // //           <p className='text-sm text-red-500 mt-5'>
// // //             * For Online Payment <strong>trust</strong>, we are accepting only <strong className='text-black font-bold'>Razorpay</strong> currently.
// // //            <strong>We are Not Accepting COD</strong> 
// // //           </p>

// // //           <div className='w-full text-end mt-8'>
// // //             <button
// // //               type='submit'
// // //               className='bg-black text-white px-16 py-3 text-sm flex items-center justify-center gap-2'
// // //               disabled={loading}
// // //             >
// // //               {loading && (
// // //                 <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
// // //                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
// // //                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
// // //                 </svg>
// // //               )}
// // //               {loading ? 'Processing...' : 'PLACE ORDER'}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </form>
// // //   );
// // // };

// // // export default PlaceOrder;





// // import React, { useContext, useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Title from '../components/Title';
// // import { assets } from '../assets/assets';
// // import { ShopContext } from '../context/ShopContext';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';

// // const PlaceOrder = () => {
// //   const [method, setMethod] = useState("cod");
// //   const [loading, setLoading] = useState(false);
// //   const navigateFallback = useNavigate();

// //   const {
// //     navigate: contextNavigate,
// //     backendUrl,
// //     token,
// //     cartItems,
// //     setCartItems,
// //     getCartAmount,
// //     delivery_fee,
// //     products
// //   } = useContext(ShopContext);

// //   const goTo = contextNavigate || navigateFallback;

// //   useEffect(() => {
// //     if (!token) {
// //       toast.error("Please login to place an order");
// //       goTo("/login");
// //     }
// //   }, [token, goTo]);

// //   if (!token) return null;

// //   const [formData, setFormData] = useState({
// //     firstName: '', lastName: '', email: '',
// //     street: '', city: '', state: '',
// //     pincode: '', country: '', phone: '',
// //   });

// //   const [couponCode, setCouponCode] = useState('');
// //   const [couponData, setCouponData] = useState(null);
// //   const [discountAmount, setDiscountAmount] = useState(0);
// //   const [couponError, setCouponError] = useState('');

// //   const COUPONS = [
// //     { code: "VM07", discount_type: "flat", discount_value: 100 },
// //     { code: "KGRH@300", discount_type: "flat", discount_value: 300 },
// //     { code: "SMEC@300", discount_type: "flat", discount_value: 300 }
// //   ];

// //   const onChangeHandler = (e) => {
// //     setFormData(d => ({ ...d, [e.target.name]: e.target.value }));
// //   };

// //   const applyCoupon = () => {
// //     const code = couponCode.trim().toUpperCase();
// //     const matched = COUPONS.find(c => c.code === code);
// //     if (matched) {
// //       setCouponData(matched);
// //       setDiscountAmount(matched.discount_value);
// //       setCouponError('');
// //       toast.success(`Coupon ${matched.code} applied`);
// //     } else {
// //       setCouponData(null);
// //       setDiscountAmount(0);
// //       setCouponError('Invalid or expired coupon');
// //       toast.error('Invalid or expired coupon');
// //     }
// //   };

// //   return (
// //     <form className="min-h-screen pt-10 border-t border-[#6B4E2E]/30 bg-[#faf9f7]">
// //       <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10">

// //         {/* LEFT – DELIVERY */}
// //         <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#6B4E2E]/20">
// //           <Title text1="DELIVERY" text2="DETAILS" />

// //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
// //             {[
// //               ['firstName','First name'], ['lastName','Last name'],
// //               ['email','Email'], ['phone','Phone'],
// //               ['street','Street'], ['city','City'],
// //               ['state','State'], ['pincode','Pin code'],
// //               ['country','Country']
// //             ].map(([name, label]) => (
// //               <input
// //                 key={name}
// //                 name={name}
// //                 required
// //                 value={formData[name]}
// //                 onChange={onChangeHandler}
// //                 placeholder={label}
// //                 className="border border-[#6B4E2E]/30 rounded-xl px-4 py-3 text-sm
// //                            focus:outline-none focus:ring-2 focus:ring-[#6B4E2E]/40
// //                            transition"
// //               />
// //             ))}
// //           </div>
// //         </section>

// //         {/* RIGHT – SUMMARY */}
// //         <section className="space-y-8">

// //           {/* SUMMARY CARD */}
// //           <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#6B4E2E]/20">
// //             <h3 className="text-lg font-semibold text-[#6B4E2E] mb-6">
// //               Order Summary
// //             </h3>

// //             <div className="space-y-3 text-sm">
// //               <div className="flex justify-between">
// //                 <span>Subtotal</span>
// //                 <span>₹{getCartAmount()}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span>Delivery</span>
// //                 <span>₹{delivery_fee}</span>
// //               </div>

// //               {couponData && (
// //                 <div className="flex justify-between text-green-600">
// //                   <span>Discount ({couponData.code})</span>
// //                   <span>-₹{discountAmount}</span>
// //                 </div>
// //               )}

// //               <div className="flex justify-between text-xl font-semibold border-t pt-4 mt-4">
// //                 <span>Total</span>
// //                 <span>
// //                   ₹{Math.max(0, getCartAmount() + delivery_fee - discountAmount)}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* COUPON */}
// //           <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#6B4E2E]/20">
// //             <Title text1="APPLY" text2="COUPON" />
// //             <div className="flex gap-3 mt-5">
// //               <input
// //                 value={couponCode}
// //                 onChange={(e) => setCouponCode(e.target.value)}
// //                 placeholder="Enter coupon"
// //                 className="flex-1 border border-[#6B4E2E]/30 rounded-xl px-4 py-3"
// //               />
// //               <button
// //                 type="button"
// //                 onClick={applyCoupon}
// //                 className="bg-[#6B4E2E] text-white px-6 py-3 rounded-xl
// //                            hover:bg-[#5a4125] transition"
// //               >
// //                 Apply
// //               </button>
// //             </div>
// //             {couponError && <p className="text-red-500 text-sm mt-2">{couponError}</p>}
// //           </div>

// //           {/* PAYMENT */}
// //           <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#6B4E2E]/20">
// //             <Title text1="PAYMENT" text2="METHOD" />

// //             <div className="grid sm:grid-cols-3 gap-4 mt-6">
// //               {['stripe','razorpay','cod'].map((m) => (
// //                 <div
// //                   key={m}
// //                   onClick={() => setMethod(m)}
// //                   className={`rounded-xl border p-4 cursor-pointer flex items-center justify-center
// //                               transition
// //                     ${method === m
// //                       ? 'border-[#6B4E2E] bg-[#6B4E2E]/10'
// //                       : 'border-[#6B4E2E]/30 hover:bg-[#6B4E2E]/5'}`}
// //                 >
// //                   {m === 'cod'
// //                     ? <span className="text-sm font-medium text-gray-600">Cash on Delivery</span>
// //                     : <img src={m === 'stripe' ? assets.stripe_logo : assets.razorpay_logo} className="h-6" alt={m} />
// //                   }
// //                 </div>
// //               ))}
// //             </div>

// //             {/* 🔴 COD ALERT LINE (ADDED) */}
// //             <p className="text-sm text-red-500 mt-6">
// //               * For online payment <strong>trust</strong>, we are currently accepting only
// //               <strong className="text-black font-bold"> Razorpay</strong>.
// //               <strong> Cash on Delivery is not available.</strong>
// //             </p>

// //             <div className="mt-10 text-right">
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="bg-[#6B4E2E] text-white px-20 py-4 rounded-2xl
// //                            tracking-widest text-sm font-medium
// //                            hover:bg-[#5a4125] transition"
// //               >
// //                 {loading ? 'PROCESSING...' : 'PLACE ORDER'}
// //               </button>
// //             </div>
// //           </div>

// //         </section>
// //       </div>
// //     </form>
// //   );
// // };

// // export default PlaceOrder;


// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const PlaceOrder = () => {
//   const [method, setMethod] = useState("cod");
//   const [loading, setLoading] = useState(false);
//   const navigateFallback = useNavigate();

//   const {
//     navigate: contextNavigate,
//     backendUrl,
//     token,
//     cartItems,
//     setCartItems,
//     getCartAmount,
//     delivery_fee,
//     products
//   } = useContext(ShopContext);

//   const goTo = contextNavigate || navigateFallback;

//   useEffect(() => {
//     if (!token) {
//       toast.error("Please login to place an order");
//       goTo("/login");
//     }
//   }, [token, goTo]);

//   if (!token) return null;

//   const [formData, setFormData] = useState({
//     firstName: '', lastName: '', email: '',
//     street: '', city: '', state: '',
//     pincode: '', country: '', phone: '',
//   });

//   const [couponCode, setCouponCode] = useState('');
//   const [couponData, setCouponData] = useState(null);
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [couponError, setCouponError] = useState('');

//   const COUPONS = [
//     { code: "VM07", discount_type: "flat", discount_value: 100 },
//     { code: "KGRH@300", discount_type: "flat", discount_value: 300 },
//     { code: "SMEC@300", discount_type: "flat", discount_value: 300 }
//   ];

//   const onChangeHandler = (e) => {
//     setFormData(d => ({ ...d, [e.target.name]: e.target.value }));
//   };

//   const applyCoupon = () => {
//     const code = couponCode.trim().toUpperCase();
//     const matched = COUPONS.find(c => c.code === code);
//     if (matched) {
//       setCouponData(matched);
//       setDiscountAmount(matched.discount_value);
//       setCouponError('');
//       toast.success(`Coupon ${matched.code} applied`);
//     } else {
//       setCouponData(null);
//       setDiscountAmount(0);
//       setCouponError('Invalid or expired coupon');
//       toast.error('Invalid or expired coupon');
//     }
//   };

//   /* ================= RAZORPAY INIT ================= */
//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Order Payment",
//       description: "Secure Payment",
//       order_id: order.id,
//       handler: async (response) => {
//         try {
//           const res = await axios.post(
//             backendUrl + "/api/order/verifyRazorpay",
//             response,
//             { headers: { token } }
//           );
//           if (res.data.success) {
//             setCartItems({});
//             toast.success("Payment successful");
//             goTo("/orders");
//           } else {
//             toast.error("Payment verification failed");
//             goTo("/cart");
//           }
//         } catch (err) {
//           toast.error(err.message);
//         } finally {
//           setLoading(false);
//         }
//       },
//       modal: {
//         ondismiss: () => {
//           setLoading(false);
//           toast.info("Payment cancelled");
//         }
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   /* ================= SUBMIT ================= */
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     const hasItems = Object.keys(cartItems).some(id =>
//       Object.values(cartItems[id]).some(qty => qty > 0)
//     );

//     if (!hasItems) {
//       toast.error("Cart is empty");
//       return;
//     }

//     try {
//       let orderItems = [];

//       for (const id in cartItems) {
//         for (const size in cartItems[id]) {
//           if (cartItems[id][size] > 0) {
//             const product = structuredClone(
//               products.find(p => p._id === id)
//             );
//             if (product) {
//               product.size = size;
//               product.quantity = cartItems[id][size];
//               orderItems.push(product);
//             }
//           }
//         }
//       }

//       const totalAmount = Math.max(
//         0,
//         getCartAmount() + delivery_fee - discountAmount
//       );

//       const orderData = {
//         userId: localStorage.getItem("userId"),
//         address: formData,
//         items: orderItems,
//         amount: totalAmount,
//         coupon: couponData?.code || null,
//         discount: discountAmount
//       };

//       if (method === "cod") {
//         toast.error("Cash on Delivery is not available");
//         return;
//       }

//       if (method === "razorpay") {
//         setLoading(true);
//         const res = await axios.post(
//           backendUrl + "/api/order/razorpay",
//           orderData,
//           { headers: { token } }
//         );
//         if (res.data.success) {
//           initPay(res.data.order);
//         } else {
//           toast.error("Razorpay order failed");
//           setLoading(false);
//         }
//       }

//     } catch (err) {
//       toast.error(err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="min-h-screen pt-10 border-t border-[#6B4E2E]/30 bg-[#faf9f7]"
//     >
//       <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10">

//         {/* LEFT – DELIVERY */}
//         <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#6B4E2E]/20">
//           <Title text1="DELIVERY" text2="DETAILS" />
//           <div className="grid sm:grid-cols-2 gap-5 mt-8">
//             {[
//               ['firstName','First name'],['lastName','Last name'],
//               ['email','Email'],['phone','Phone'],
//               ['street','Street'],['city','City'],
//               ['state','State'],['pincode','Pin code'],
//               ['country','Country']
//             ].map(([k,l]) => (
//               <input
//                 key={k}
//                 name={k}
//                 required
//                 value={formData[k]}
//                 onChange={onChangeHandler}
//                 placeholder={l}
//                 className="border border-[#6B4E2E]/30 rounded-xl px-4 py-3"
//               />
//             ))}
//           </div>
//         </section>

//         {/* RIGHT */}
//         <section className="space-y-8">

//           {/* ORDER SUMMARY */}
//           <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#6B4E2E]/20">
//             <h3 className="text-lg font-semibold text-[#6B4E2E] mb-6">
//               Order Summary
//             </h3>

//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>₹{getCartAmount()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery</span>
//                 <span>₹{delivery_fee}</span>
//               </div>

//               {couponData && (
//                 <div className="flex justify-between text-green-600">
//                   <span>Discount ({couponData.code})</span>
//                   <span>-₹{discountAmount}</span>
//                 </div>
//               )}

//               <div className="flex justify-between text-xl font-semibold border-t pt-4 mt-4">
//                 <span>Total</span>
//                 <span>
//                   ₹{Math.max(0, getCartAmount() + delivery_fee - discountAmount)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* APPLY COUPON */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#6B4E2E]/20">
//             <Title text1="APPLY" text2="COUPON" />
//             <div className="flex gap-3 mt-5">
//               <input
//                 value={couponCode}
//                 onChange={(e) => setCouponCode(e.target.value)}
//                 placeholder="Enter coupon"
//                 className="flex-1 border border-[#6B4E2E]/30 rounded-xl px-4 py-3"
//               />
//               <button
//                 type="button"
//                 onClick={applyCoupon}
//                 className="bg-[#6B4E2E] text-white px-6 py-3 rounded-xl
//                            hover:bg-[#5a4125] transition"
//               >
//                 Apply
//               </button>
//             </div>
//             {couponError && (
//               <p className="text-red-500 text-sm mt-2">{couponError}</p>
//             )}
//           </div>

//           {/* PAYMENT */}
//           <div className="bg-white rounded-2xl p-6 border border-[#6B4E2E]/20">
//             <Title text1="PAYMENT" text2="METHOD" />
//             <div className="grid sm:grid-cols-3 gap-4 mt-6">
//               {['stripe','razorpay','cod'].map(m => (
//                 <div
//                   key={m}
//                   onClick={() => setMethod(m)}
//                   className={`rounded-xl border p-4 cursor-pointer
//                     ${method === m
//                       ? 'border-[#6B4E2E] bg-[#6B4E2E]/10'
//                       : 'border-[#6B4E2E]/30'}`}
//                 >
//                   {m === 'cod'
//                     ? "Cash on Delivery"
//                     : <img src={m === 'stripe'
//                       ? assets.stripe_logo
//                       : assets.razorpay_logo} className="h-6" />}
//                 </div>
//               ))}
//             </div>

//             <p className="text-sm text-red-500 mt-6">
//               * Only <strong>Razorpay</strong> is accepted. COD is disabled.
//             </p>

//             <div className="text-right mt-8">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-[#6B4E2E] text-white px-20 py-4 rounded-2xl tracking-widest"
//               >
//                 {loading ? "PROCESSING..." : "PLACE ORDER"}
//               </button>
//             </div>
//           </div>

//         </section>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;



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
