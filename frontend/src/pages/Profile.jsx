// // // // // // // // // import React, { useContext, useEffect, useState } from "react";
// // // // // // // // // import { ShopContext } from "../context/ShopContext";
// // // // // // // // // import axios from "axios";
// // // // // // // // // import { toast } from "react-toastify";

// // // // // // // // // const Profile = () => {
// // // // // // // // //   const { token, backendUrl, userBalance, fetchUserProfile } = useContext(ShopContext);

// // // // // // // // //   const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
// // // // // // // // //   const [transactions, setTransactions] = useState({ coins: [], freeCash: [] });
// // // // // // // // //   const [activeTab, setActiveTab] = useState("coins"); // "coins" or "cash"

// // // // // // // // //   // Fetch user profile
// // // // // // // // //   const loadProfile = async () => {
// // // // // // // // //     if (!token) return;
// // // // // // // // //     try {
// // // // // // // // //       const res = await axios.get(`${backendUrl}/api/user/profile`, {
// // // // // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // // // // //       });
// // // // // // // // //       if (res.data.success) {
// // // // // // // // //         setProfile({
// // // // // // // // //           name: res.data.user.name,
// // // // // // // // //           email: res.data.user.email,
// // // // // // // // //           phone: res.data.user.phone || "",
// // // // // // // // //         });

// // // // // // // // //         // Fetch transactions
// // // // // // // // //         const txRes = await axios.get(`${backendUrl}/api/user/transactions`, {
// // // // // // // // //           headers: { Authorization: `Bearer ${token}` },
// // // // // // // // //         });
// // // // // // // // //         if (txRes.data.success) {
// // // // // // // // //           setTransactions({
// // // // // // // // //             coins: txRes.data.coins || [],
// // // // // // // // //             freeCash: txRes.data.freeCash || [],
// // // // // // // // //           });
// // // // // // // // //         }
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       toast.error(error.response?.data?.message || error.message);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     loadProfile();
// // // // // // // // //     fetchUserProfile(token);
// // // // // // // // //   }, [token]);

// // // // // // // // //   const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

// // // // // // // // //   const handleUpdate = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const res = await axios.put(`${backendUrl}/api/user/profile/update`, profile, {
// // // // // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // // // // //       });
// // // // // // // // //       if (res.data.success) {
// // // // // // // // //         toast.success("Profile updated!");
// // // // // // // // //         loadProfile();
// // // // // // // // //       } else toast.error(res.data.message);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       toast.error(error.response?.data?.message || error.message);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="max-w-5xl mx-auto p-6 bg-white text-gray-900">
// // // // // // // // //       <h1 className="text-3xl font-extrabold mb-8 border-b pb-4">My Profile</h1>

// // // // // // // // //       {/* Profile Form */}
// // // // // // // // //       <div className="bg-gray-50 p-6 rounded-xl shadow-lg mb-8">
// // // // // // // // //         <div className="flex flex-col md:flex-row md:gap-6 gap-4">
// // // // // // // // //           <input
// // // // // // // // //             type="text"
// // // // // // // // //             name="name"
// // // // // // // // //             value={profile.name}
// // // // // // // // //             onChange={handleChange}
// // // // // // // // //             placeholder="Name"
// // // // // // // // //             className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
// // // // // // // // //           />
// // // // // // // // //           <input
// // // // // // // // //             type="email"
// // // // // // // // //             name="email"
// // // // // // // // //             value={profile.email}
// // // // // // // // //             onChange={handleChange}
// // // // // // // // //             placeholder="Email"
// // // // // // // // //             className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
// // // // // // // // //           />
// // // // // // // // //           <input
// // // // // // // // //             type="text"
// // // // // // // // //             name="phone"
// // // // // // // // //             value={profile.phone}
// // // // // // // // //             onChange={handleChange}
// // // // // // // // //             placeholder="Phone Number"
// // // // // // // // //             className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
// // // // // // // // //           />
// // // // // // // // //           <button
// // // // // // // // //             onClick={handleUpdate}
// // // // // // // // //             className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200"
// // // // // // // // //           >
// // // // // // // // //             Update
// // // // // // // // //           </button>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* Coins & Free Cash Tabs */}
// // // // // // // // //       <div className="flex gap-6 mb-8">
// // // // // // // // //         <div
// // // // // // // // //           onClick={() => setActiveTab("coins")}
// // // // // // // // //           className={`cursor-pointer border-2 rounded-xl px-6 py-4 flex flex-col items-center justify-center shadow-lg transition-all duration-200 ${
// // // // // // // // //             activeTab === "coins" ? "border-black bg-black text-white" : "border-black bg-white text-black hover:bg-gray-100"
// // // // // // // // //           }`}
// // // // // // // // //         >
// // // // // // // // //           <p className="text-xl font-semibold mb-2">🪙 Heven Coins</p>
// // // // // // // // //           <p className="text-3xl font-extrabold">{userBalance.coins}</p>
// // // // // // // // //         </div>
// // // // // // // // //         <div
// // // // // // // // //           onClick={() => setActiveTab("cash")}
// // // // // // // // //           className={`cursor-pointer border-2 rounded-xl px-6 py-4 flex flex-col items-center justify-center shadow-lg transition-all duration-200 ${
// // // // // // // // //             activeTab === "cash" ? "border-black bg-black text-white" : "border-black bg-white text-black hover:bg-gray-100"
// // // // // // // // //           }`}
// // // // // // // // //         >
// // // // // // // // //           <p className="text-xl font-semibold mb-2">💰 Heven Cash</p>
// // // // // // // // //           <p className="text-3xl font-extrabold">₹{userBalance.freeCash}</p>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* Transaction History */}
// // // // // // // // //       <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-300">
// // // // // // // // //         <h2 className="text-2xl font-bold mb-4 border-b pb-2">
// // // // // // // // //           {activeTab === "coins" ? "🪙 Heven Coins Transactions" : "💰 Heven Cash Transactions"}
// // // // // // // // //         </h2>
// // // // // // // // //         <div className="flex flex-col gap-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
// // // // // // // // //           {activeTab === "coins" ? (
// // // // // // // // //             transactions.coins.length > 0 ? (
// // // // // // // // //               transactions.coins.map((tx, i) => (
// // // // // // // // //                 <div key={i} className="flex justify-between border-b border-gray-300 py-2 text-sm text-black">
// // // // // // // // //                   <span>{tx.reason}</span>
// // // // // // // // //                   <span className={`${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
// // // // // // // // //                     {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
// // // // // // // // //                   </span>
// // // // // // // // //                 </div>
// // // // // // // // //               ))
// // // // // // // // //             ) : (
// // // // // // // // //               <p className="text-gray-500 text-sm">No coin transactions yet.</p>
// // // // // // // // //             )
// // // // // // // // //           ) : transactions.freeCash.length > 0 ? (
// // // // // // // // //             transactions.freeCash.map((tx, i) => (
// // // // // // // // //               <div key={i} className="flex justify-between border-b border-gray-300 py-2 text-sm text-black">
// // // // // // // // //                 <span>{tx.reason}</span>
// // // // // // // // //                 <span className={`${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
// // // // // // // // //                   ₹{tx.amount > 0 ? `+${tx.amount}` : tx.amount}
// // // // // // // // //                 </span>
// // // // // // // // //               </div>
// // // // // // // // //             ))
// // // // // // // // //           ) : (
// // // // // // // // //             <p className="text-gray-500 text-sm">No free cash transactions yet.</p>
// // // // // // // // //           )}
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Profile;



// // // // // // // // import React, { useContext, useEffect, useState } from "react";
// // // // // // // // import { ShopContext } from "../context/ShopContext";
// // // // // // // // import axios from "axios";
// // // // // // // // import { toast } from "react-toastify";
// // // // // // // // import { useNavigate } from "react-router-dom";

// // // // // // // // const Profile = () => {
// // // // // // // //   const { token, backendUrl, userBalance, fetchUserProfile } = useContext(ShopContext);
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   const [profile, setProfile] = useState({ name: "", email: "", phone: "", ordersCount: 0, cartCount: 0 });
// // // // // // // //   const [transactions, setTransactions] = useState({ coins: [], freeCash: [] });
// // // // // // // //   const [activeTab, setActiveTab] = useState("coins"); // "coins" or "cash"

// // // // // // // //   // Fetch user profile
// // // // // // // //   const loadProfile = async () => {
// // // // // // // //     if (!token) return;
// // // // // // // //     try {
// // // // // // // //       const res = await axios.get(`${backendUrl}/api/user/profile`, {
// // // // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // // // //       });
// // // // // // // //       if (res.data.success) {
// // // // // // // //         const user = res.data.user;
// // // // // // // //         setProfile({
// // // // // // // //           name: user.name,
// // // // // // // //           email: user.email,
// // // // // // // //           phone: user.phone || "",
// // // // // // // //           ordersCount: user.ordersCount || 0,
// // // // // // // //           cartCount: user.cartData?.items?.length || 0,
// // // // // // // //         });

// // // // // // // //         // Fetch transactions
// // // // // // // //         const txRes = await axios.get(`${backendUrl}/api/user/transactions`, {
// // // // // // // //           headers: { Authorization: `Bearer ${token}` },
// // // // // // // //         });
// // // // // // // //         if (txRes.data.success) {
// // // // // // // //           setTransactions({
// // // // // // // //             coins: txRes.data.coins || [],
// // // // // // // //             freeCash: txRes.data.freeCash || [],
// // // // // // // //           });
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       toast.error(error.response?.data?.message || error.message);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     loadProfile();
// // // // // // // //     fetchUserProfile(token);
// // // // // // // //   }, [token]);

// // // // // // // //   const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

// // // // // // // //   const handleUpdate = async () => {
// // // // // // // //     try {
// // // // // // // //       const res = await axios.put(`${backendUrl}/api/user/profile/update`, profile, {
// // // // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // // // //       });
// // // // // // // //       if (res.data.success) {
// // // // // // // //         toast.success("Profile updated!");
// // // // // // // //         loadProfile();
// // // // // // // //       } else toast.error(res.data.message);
// // // // // // // //     } catch (error) {
// // // // // // // //       toast.error(error.response?.data?.message || error.message);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="max-w-5xl mx-auto p-6 bg-white text-gray-900">
// // // // // // // //       <h1 className="text-3xl font-extrabold mb-8 border-b pb-4">My Profile</h1>

// // // // // // // //       {/* Profile Form */}
// // // // // // // //       <div className="bg-gray-50 p-6 rounded-xl shadow-lg mb-8">
// // // // // // // //         <div className="flex flex-col md:flex-row md:gap-6 gap-4">
// // // // // // // //           <input
// // // // // // // //             type="text"
// // // // // // // //             name="name"
// // // // // // // //             value={profile.name}
// // // // // // // //             onChange={handleChange}
// // // // // // // //             placeholder="Name"
// // // // // // // //             className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
// // // // // // // //           />
// // // // // // // //           <input
// // // // // // // //             type="email"
// // // // // // // //             name="email"
// // // // // // // //             value={profile.email}
// // // // // // // //             onChange={handleChange}
// // // // // // // //             placeholder="Email"
// // // // // // // //             className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
// // // // // // // //           />
// // // // // // // //           <input
// // // // // // // //             type="text"
// // // // // // // //             name="phone"
// // // // // // // //             value={profile.phone}
// // // // // // // //             onChange={handleChange}
// // // // // // // //             placeholder="Phone Number"
// // // // // // // //             className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
// // // // // // // //           />
// // // // // // // //           <button
// // // // // // // //             onClick={handleUpdate}
// // // // // // // //             className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200"
// // // // // // // //           >
// // // // // // // //             Update
// // // // // // // //           </button>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Coins, Free Cash, Orders & Cart Tabs */}
// // // // // // // //       <div className="flex gap-6 mb-8 flex-wrap">
// // // // // // // //         {/* Heven Coins */}
// // // // // // // //         <div
// // // // // // // //           onClick={() => setActiveTab("coins")}
// // // // // // // //           className={`cursor-pointer border-2 rounded-xl px-6 py-4 flex flex-col items-center justify-center shadow-lg transition-all duration-200 ${
// // // // // // // //             activeTab === "coins" ? "border-black bg-black text-white" : "border-black bg-white text-black hover:bg-gray-100"
// // // // // // // //           }`}
// // // // // // // //         >
// // // // // // // //           <p className="text-xl font-semibold mb-2">🪙 Heven Coins</p>
// // // // // // // //           <p className="text-3xl font-extrabold">{userBalance.coins}</p>
// // // // // // // //         </div>

// // // // // // // //         {/* Heven Cash */}
// // // // // // // //         <div
// // // // // // // //           onClick={() => setActiveTab("cash")}
// // // // // // // //           className={`cursor-pointer border-2 rounded-xl px-6 py-4 flex flex-col items-center justify-center shadow-lg transition-all duration-200 ${
// // // // // // // //             activeTab === "cash" ? "border-black bg-black text-white" : "border-black bg-white text-black hover:bg-gray-100"
// // // // // // // //           }`}
// // // // // // // //         >
// // // // // // // //           <p className="text-xl font-semibold mb-2">💰 Heven Cash</p>
// // // // // // // //           <p className="text-3xl font-extrabold">₹{userBalance.freeCash}</p>
// // // // // // // //         </div>

// // // // // // // //         {/* Orders */}
// // // // // // // //         <div
// // // // // // // //           onClick={() => navigate("/orders")}
// // // // // // // //           className="cursor-pointer border-2 rounded-xl px-6 py-4 flex flex-col items-center justify-center shadow-lg bg-white text-black hover:bg-gray-100 transition-all duration-200"
// // // // // // // //         >
// // // // // // // //           <p className="text-xl font-semibold mb-2">📦 Orders</p>
// // // // // // // //           <p className="text-3xl font-extrabold">{profile.ordersCount}</p>
// // // // // // // //         </div>

// // // // // // // //         {/* Cart */}
// // // // // // // //         <div
// // // // // // // //           onClick={() => navigate("/cart")}
// // // // // // // //           className="cursor-pointer border-2 rounded-xl px-6 py-4 flex flex-col items-center justify-center shadow-lg bg-white text-black hover:bg-gray-100 transition-all duration-200"
// // // // // // // //         >
// // // // // // // //           <p className="text-xl font-semibold mb-2">🛒 Cart</p>
// // // // // // // //           <p className="text-3xl font-extrabold">{profile.cartCount}</p>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Transaction History */}
// // // // // // // //       <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-300">
// // // // // // // //         <h2 className="text-2xl font-bold mb-4 border-b pb-2">
// // // // // // // //           {activeTab === "coins" ? "🪙 Heven Coins Transactions" : "💰 Heven Cash Transactions"}
// // // // // // // //         </h2>
// // // // // // // //         <div className="flex flex-col gap-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
// // // // // // // //           {activeTab === "coins" ? (
// // // // // // // //             transactions.coins.length > 0 ? (
// // // // // // // //               transactions.coins.map((tx, i) => (
// // // // // // // //                 <div key={i} className="flex justify-between border-b border-gray-300 py-2 text-sm text-black">
// // // // // // // //                   <span>{tx.reason}</span>
// // // // // // // //                   <span className={`${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
// // // // // // // //                     {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
// // // // // // // //                   </span>
// // // // // // // //                 </div>
// // // // // // // //               ))
// // // // // // // //             ) : (
// // // // // // // //               <p className="text-gray-500 text-sm">No coin transactions yet.</p>
// // // // // // // //             )
// // // // // // // //           ) : transactions.freeCash.length > 0 ? (
// // // // // // // //             transactions.freeCash.map((tx, i) => (
// // // // // // // //               <div key={i} className="flex justify-between border-b border-gray-300 py-2 text-sm text-black">
// // // // // // // //                 <span>{tx.reason}</span>
// // // // // // // //                 <span className={`${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
// // // // // // // //                   ₹{tx.amount > 0 ? `+${tx.amount}` : tx.amount}
// // // // // // // //                 </span>
// // // // // // // //               </div>
// // // // // // // //             ))
// // // // // // // //           ) : (
// // // // // // // //             <p className="text-gray-500 text-sm">No free cash transactions yet.</p>
// // // // // // // //           )}
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Profile;

// // // // // // // //frontend/src/pages/Profile.jsx
// // // // // // // import React, { useContext, useEffect, useState } from "react";
// // // // // // // import { ShopContext } from "../context/ShopContext";
// // // // // // // import axios from "axios";
// // // // // // // import { toast } from "react-toastify";
// // // // // // // import { useNavigate } from "react-router-dom";

// // // // // // // const Profile = () => {
// // // // // // //   const { token, backendUrl, userBalance, fetchUserProfile } = useContext(ShopContext);
// // // // // // //   const navigate = useNavigate();

// // // // // // //   const [profile, setProfile] = useState({ name: "", email: "", phone: "", ordersCount: 0, cartCount: 0 });
// // // // // // //   const [transactions, setTransactions] = useState({ coins: [], freeCash: [] });
// // // // // // //   const [activeTab, setActiveTab] = useState("coins"); // "coins" or "cash"

// // // // // // //   const loadProfile = async () => {
// // // // // // //     if (!token) return;
// // // // // // //     try {
// // // // // // //       const res = await axios.get(`${backendUrl}/api/user/profile`, {
// // // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // // //       });
// // // // // // //       if (res.data.success) {
// // // // // // //         const user = res.data.user;
// // // // // // //         setProfile({
// // // // // // //           name: user.name,
// // // // // // //           email: user.email,
// // // // // // //           phone: user.phone || "",
// // // // // // //           ordersCount: user.ordersCount || 0,
// // // // // // //           cartCount: user.cartData?.items?.length || 0,
// // // // // // //         });

// // // // // // //         const txRes = await axios.get(`${backendUrl}/api/user/transactions`, {
// // // // // // //           headers: { Authorization: `Bearer ${token}` },
// // // // // // //         });
// // // // // // //         if (txRes.data.success) {
// // // // // // //           setTransactions({
// // // // // // //             coins: txRes.data.coins || [],
// // // // // // //             freeCash: txRes.data.freeCash || [],
// // // // // // //           });
// // // // // // //         }
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       toast.error(error.response?.data?.message || error.message);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     loadProfile();
// // // // // // //     fetchUserProfile(token);
// // // // // // //   }, [token]);

// // // // // // //   const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

// // // // // // //   const handleUpdate = async () => {
// // // // // // //     try {
// // // // // // //       const res = await axios.put(`${backendUrl}/api/user/profile/update`, profile, {
// // // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // // //       });
// // // // // // //       if (res.data.success) {
// // // // // // //         toast.success("Profile updated!");
// // // // // // //         loadProfile();
// // // // // // //       } else toast.error(res.data.message);
// // // // // // //     } catch (error) {
// // // // // // //       toast.error(error.response?.data?.message || error.message);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white text-gray-900">
// // // // // // //       <h1 className="text-3xl font-extrabold mb-6 border-b pb-4 text-center sm:text-left">My Profile</h1>

// // // // // // //       {/* Profile Form */}
// // // // // // //       <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-lg mb-6">
// // // // // // //         <div className="flex flex-col md:flex-row md:gap-4 gap-3">
// // // // // // //           <input
// // // // // // //             type="text"
// // // // // // //             name="name"
// // // // // // //             value={profile.name}
// // // // // // //             onChange={handleChange}
// // // // // // //             placeholder="Name"
// // // // // // //             className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
// // // // // // //           />
// // // // // // //           <input
// // // // // // //             type="email"
// // // // // // //             name="email"
// // // // // // //             value={profile.email}
// // // // // // //             onChange={handleChange}
// // // // // // //             placeholder="Email"
// // // // // // //             className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
// // // // // // //           />
// // // // // // //           <input
// // // // // // //             type="text"
// // // // // // //             name="phone"
// // // // // // //             value={profile.phone}
// // // // // // //             onChange={handleChange}
// // // // // // //             placeholder="Phone Number"
// // // // // // //             className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-black focus:outline-none bg-white text-black"
// // // // // // //           />
// // // // // // //           <button
// // // // // // //             onClick={handleUpdate}
// // // // // // //             className="bg-black text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 mt-2 md:mt-0"
// // // // // // //           >
// // // // // // //             Update
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Coins, Free Cash, Orders & Cart Boxes */}
// // // // // // //       <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
// // // // // // //         {/* Heven Coins */}
// // // // // // //         <div
// // // // // // //           onClick={() => setActiveTab("coins")}
// // // // // // //           className={`cursor-pointer flex-1 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] border-2 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg transition-all duration-200 ${
// // // // // // //             activeTab === "coins" ? "border-black bg-black text-white" : "border-black bg-white text-black hover:bg-gray-100"
// // // // // // //           }`}
// // // // // // //         >
// // // // // // //           <p className="text-lg font-semibold mb-1 sm:mb-2 text-center">🪙 Heven Coins</p>
// // // // // // //           <p className="text-2xl sm:text-3xl font-extrabold">{userBalance.coins}</p>
// // // // // // //         </div>

// // // // // // //         {/* Heven Cash */}
// // // // // // //         <div
// // // // // // //           onClick={() => setActiveTab("cash")}
// // // // // // //           className={`cursor-pointer flex-1 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] border-2 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg transition-all duration-200 ${
// // // // // // //             activeTab === "cash" ? "border-black bg-black text-white" : "border-black bg-white text-black hover:bg-gray-100"
// // // // // // //           }`}
// // // // // // //         >
// // // // // // //           <p className="text-lg font-semibold mb-1 sm:mb-2 text-center">💰 Heven Cash</p>
// // // // // // //           <p className="text-2xl sm:text-3xl font-extrabold">₹{userBalance.freeCash}</p>
// // // // // // //         </div>

// // // // // // //         {/* Orders */}
// // // // // // //         <div
// // // // // // //           onClick={() => navigate("/orders")}
// // // // // // //           className="cursor-pointer flex-1 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] border-2 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg bg-white text-black hover:bg-gray-100 transition-all duration-200"
// // // // // // //         >
// // // // // // //           <p className="text-lg font-semibold mb-1 sm:mb-2 text-center">📦 Orders</p>
// // // // // // //           <p className="text-2xl sm:text-3xl font-extrabold">{profile.ordersCount}</p>
// // // // // // //         </div>

// // // // // // //         {/* Cart */}
// // // // // // //         <div
// // // // // // //           onClick={() => navigate("/cart")}
// // // // // // //           className="cursor-pointer flex-1 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] border-2 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg bg-white text-black hover:bg-gray-100 transition-all duration-200"
// // // // // // //         >
// // // // // // //           <p className="text-lg font-semibold mb-1 sm:mb-2 text-center">🛒 Cart</p>
// // // // // // //           <p className="text-2xl sm:text-3xl font-extrabold">{profile.cartCount}</p>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Transaction History */}
// // // // // // //       <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-300">
// // // // // // //         <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 border-b pb-2">
// // // // // // //           {activeTab === "coins" ? "🪙 Heven Coins Transactions" : "💰 Heven Cash Transactions"}
// // // // // // //         </h2>
// // // // // // //         <div className="flex flex-col gap-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
// // // // // // //           {activeTab === "coins" ? (
// // // // // // //             transactions.coins.length > 0 ? (
// // // // // // //               transactions.coins.map((tx, i) => (
// // // // // // //                 <div key={i} className="flex justify-between border-b border-gray-300 py-2 text-sm sm:text-base text-black">
// // // // // // //                   <span className="truncate max-w-[70%]">{tx.reason}</span>
// // // // // // //                   <span className={`${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
// // // // // // //                     {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
// // // // // // //                   </span>
// // // // // // //                 </div>
// // // // // // //               ))
// // // // // // //             ) : (
// // // // // // //               <p className="text-gray-500 text-sm">No coin transactions yet.</p>
// // // // // // //             )
// // // // // // //           ) : transactions.freeCash.length > 0 ? (
// // // // // // //             transactions.freeCash.map((tx, i) => (
// // // // // // //               <div key={i} className="flex justify-between border-b border-gray-300 py-2 text-sm sm:text-base text-black">
// // // // // // //                 <span className="truncate max-w-[70%]">{tx.reason}</span>
// // // // // // //                 <span className={`${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
// // // // // // //                   ₹{tx.amount > 0 ? `+${tx.amount}` : tx.amount}
// // // // // // //                 </span>
// // // // // // //               </div>
// // // // // // //             ))
// // // // // // //           ) : (
// // // // // // //             <p className="text-gray-500 text-sm">No free cash transactions yet.</p>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Profile;


// // // // // // // frontend/src/pages/Profile.jsx
// // // // // // import React, { useContext, useEffect, useState } from "react";
// // // // // // import { ShopContext } from "../context/ShopContext";
// // // // // // import axios from "axios";
// // // // // // import { toast } from "react-toastify";
// // // // // // import { useNavigate } from "react-router-dom";

// // // // // // const BRAND = "#6B4E2E";

// // // // // // const Profile = () => {
// // // // // //   const { token, backendUrl, userBalance, fetchUserProfile } = useContext(ShopContext);
// // // // // //   const navigate = useNavigate();

// // // // // //   const [profile, setProfile] = useState({
// // // // // //     name: "",
// // // // // //     email: "",
// // // // // //     phone: "",
// // // // // //     ordersCount: 0,
// // // // // //     cartCount: 0,
// // // // // //   });

// // // // // //   const [transactions, setTransactions] = useState({ coins: [], freeCash: [] });
// // // // // //   const [activeTab, setActiveTab] = useState("coins");

// // // // // //   const loadProfile = async () => {
// // // // // //     if (!token) return;
// // // // // //     try {
// // // // // //       const res = await axios.get(`${backendUrl}/api/user/profile`, {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //       });

// // // // // //       if (res.data.success) {
// // // // // //         const user = res.data.user;
// // // // // //         setProfile({
// // // // // //           name: user.name,
// // // // // //           email: user.email,
// // // // // //           phone: user.phone || "",
// // // // // //           ordersCount: user.ordersCount || 0,
// // // // // //           cartCount: user.cartData?.items?.length || 0,
// // // // // //         });

// // // // // //         const txRes = await axios.get(`${backendUrl}/api/user/transactions`, {
// // // // // //           headers: { Authorization: `Bearer ${token}` },
// // // // // //         });

// // // // // //         if (txRes.data.success) {
// // // // // //           setTransactions({
// // // // // //             coins: txRes.data.coins || [],
// // // // // //             freeCash: txRes.data.freeCash || [],
// // // // // //           });
// // // // // //         }
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       toast.error(err.response?.data?.message || err.message);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     loadProfile();
// // // // // //     fetchUserProfile(token);
// // // // // //   }, [token]);

// // // // // //   const handleChange = (e) =>
// // // // // //     setProfile({ ...profile, [e.target.name]: e.target.value });

// // // // // //   const handleUpdate = async () => {
// // // // // //     try {
// // // // // //       const res = await axios.put(
// // // // // //         `${backendUrl}/api/user/profile/update`,
// // // // // //         profile,
// // // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // // //       );
// // // // // //       if (res.data.success) {
// // // // // //         toast.success("Profile updated successfully");
// // // // // //         loadProfile();
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       toast.error(err.response?.data?.message || err.message);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-[#faf9f7]">
// // // // // //       <h1
// // // // // //         className="text-3xl font-extrabold mb-8 border-b pb-4"
// // // // // //         style={{ color: BRAND }}
// // // // // //       >
// // // // // //         My Profile
// // // // // //       </h1>

// // // // // //       {/* PROFILE FORM */}
// // // // // //       <div className="bg-white rounded-2xl p-6 shadow-md border border-[#6B4E2E]/20 mb-8">
// // // // // //         <div className="flex flex-col md:flex-row gap-4">
// // // // // //           {["name", "email", "phone"].map((field) => (
// // // // // //             <input
// // // // // //               key={field}
// // // // // //               name={field}
// // // // // //               value={profile[field]}
// // // // // //               onChange={handleChange}
// // // // // //               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
// // // // // //               className="w-full px-4 py-3 rounded-xl border border-[#6B4E2E]/30
// // // // // //                          focus:ring-2 focus:ring-[#6B4E2E]/40 outline-none"
// // // // // //             />
// // // // // //           ))}
// // // // // //           <button
// // // // // //             onClick={handleUpdate}
// // // // // //             className="px-6 py-3 rounded-xl text-white font-medium
// // // // // //                        hover:opacity-90 transition"
// // // // // //             style={{ backgroundColor: BRAND }}
// // // // // //           >
// // // // // //             Update
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* STATS */}
// // // // // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// // // // // //         {[
// // // // // //           { key: "coins", label: "🪙 Heven Coins", value: userBalance.coins },
// // // // // //           { key: "cash", label: "💰 Heven Cash", value: `₹${userBalance.freeCash}` },
// // // // // //           { key: "orders", label: "📦 Orders", value: profile.ordersCount, link: "/orders" },
// // // // // //           { key: "cart", label: "🛒 Cart", value: profile.cartCount, link: "/cart" },
// // // // // //         ].map((box) => (
// // // // // //           <div
// // // // // //             key={box.key}
// // // // // //             onClick={() =>
// // // // // //               box.link ? navigate(box.link) : setActiveTab(box.key)
// // // // // //             }
// // // // // //             className={`cursor-pointer rounded-2xl p-5 text-center border
// // // // // //               transition shadow-sm
// // // // // //               ${
// // // // // //                 activeTab === box.key
// // // // // //                   ? "bg-[#6B4E2E] text-white"
// // // // // //                   : "bg-white text-gray-800 hover:bg-[#6B4E2E]/5"
// // // // // //               }`}
// // // // // //             style={{ borderColor: BRAND }}
// // // // // //           >
// // // // // //             <p className="font-medium mb-1">{box.label}</p>
// // // // // //             <p className="text-2xl font-extrabold">{box.value}</p>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* TRANSACTIONS */}
// // // // // //       <div className="bg-white rounded-2xl p-6 shadow-md border border-[#6B4E2E]/20">
// // // // // //         <h2
// // // // // //           className="text-xl font-bold mb-4 border-b pb-2"
// // // // // //           style={{ color: BRAND }}
// // // // // //         >
// // // // // //           {activeTab === "coins"
// // // // // //             ? "Heven Coins Transactions"
// // // // // //             : "Heven Cash Transactions"}
// // // // // //         </h2>

// // // // // //         <div className="max-h-64 overflow-y-auto space-y-3">
// // // // // //           {(activeTab === "coins"
// // // // // //             ? transactions.coins
// // // // // //             : transactions.freeCash
// // // // // //           ).length > 0 ? (
// // // // // //             (activeTab === "coins"
// // // // // //               ? transactions.coins
// // // // // //               : transactions.freeCash
// // // // // //             ).map((tx, i) => (
// // // // // //               <div
// // // // // //                 key={i}
// // // // // //                 className="flex justify-between text-sm border-b pb-2"
// // // // // //               >
// // // // // //                 <span className="truncate">{tx.reason}</span>
// // // // // //                 <span
// // // // // //                   className={`font-semibold ${
// // // // // //                     tx.amount > 0 ? "text-green-600" : "text-red-600"
// // // // // //                   }`}
// // // // // //                 >
// // // // // //                   {tx.amount > 0 ? "+" : ""}
// // // // // //                   {activeTab === "cash" && "₹"}
// // // // // //                   {tx.amount}
// // // // // //                 </span>
// // // // // //               </div>
// // // // // //             ))
// // // // // //           ) : (
// // // // // //             <p className="text-gray-500 text-sm">
// // // // // //               No transactions available.
// // // // // //             </p>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Profile;


// // // // // // frontend/src/pages/Profile.jsx
// // // // // import React, { useContext, useEffect, useState } from "react";
// // // // // import { ShopContext } from "../context/ShopContext";
// // // // // import axios from "axios";
// // // // // import { toast } from "react-toastify";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // const Profile = () => {
// // // // //   const { token, backendUrl } = useContext(ShopContext);
// // // // //   const navigate = useNavigate();

// // // // //   const [profile, setProfile] = useState({
// // // // //     name: "",
// // // // //     email: "",
// // // // //     phone: "",
// // // // //     ordersCount: 0,
// // // // //     cartCount: 0
// // // // //   });

// // // // //   // ✅ LOCAL balance state (NO context dependency)
// // // // //   const [balance, setBalance] = useState({
// // // // //     coins: 0,
// // // // //     freeCash: 0
// // // // //   });

// // // // //   const [transactions, setTransactions] = useState({
// // // // //     coins: [],
// // // // //     freeCash: []
// // // // //   });

// // // // //   const [activeTab, setActiveTab] = useState("coins");

// // // // //   /* ================= LOAD PROFILE ================= */
// // // // //   const loadProfile = async () => {
// // // // //     if (!token) return;

// // // // //     try {
// // // // //       const res = await axios.get(`${backendUrl}/api/user/profile`, {
// // // // //         headers: { Authorization: `Bearer ${token}` }
// // // // //       });

// // // // //       if (res.data.success) {
// // // // //         const user = res.data.user;

// // // // //         setProfile({
// // // // //           name: user.name || "",
// // // // //           email: user.email || "",
// // // // //           phone: user.phone || "",
// // // // //           ordersCount: user.ordersCount || 0,
// // // // //           cartCount: user.cartData?.items?.length || 0
// // // // //         });

// // // // //         // ✅ set balances safely
// // // // //         setBalance({
// // // // //           coins: user.coins ?? 0,
// // // // //           freeCash: user.freeCash ?? 0
// // // // //         });

// // // // //         const txRes = await axios.get(`${backendUrl}/api/user/transactions`, {
// // // // //           headers: { Authorization: `Bearer ${token}` }
// // // // //         });

// // // // //         if (txRes.data.success) {
// // // // //           setTransactions({
// // // // //             coins: txRes.data.coins || [],
// // // // //             freeCash: txRes.data.freeCash || []
// // // // //           });
// // // // //         }
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error(error.response?.data?.message || error.message);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     loadProfile();
// // // // //   }, [token]);

// // // // //   /* ================= UPDATE ================= */
// // // // //   const handleChange = (e) =>
// // // // //     setProfile({ ...profile, [e.target.name]: e.target.value });

// // // // //   const handleUpdate = async () => {
// // // // //     try {
// // // // //       const res = await axios.put(
// // // // //         `${backendUrl}/api/user/profile/update`,
// // // // //         profile,
// // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // //       );

// // // // //       if (res.data.success) {
// // // // //         toast.success("Profile updated!");
// // // // //         loadProfile();
// // // // //       } else {
// // // // //         toast.error(res.data.message);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error(error.response?.data?.message || error.message);
// // // // //     }
// // // // //   };

// // // // //   /* ================= UI ================= */
// // // // //   return (
// // // // //     <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white text-gray-900">
// // // // //       <h1 className="text-3xl font-extrabold mb-6 border-b pb-4">
// // // // //         My Profile
// // // // //       </h1>

// // // // //       {/* PROFILE FORM */}
// // // // //       <div className="bg-[#faf9f7] p-6 rounded-xl shadow border border-[#6B4E2E]/20 mb-6">
// // // // //         <div className="flex flex-col md:flex-row gap-4">
// // // // //           <input
// // // // //             name="name"
// // // // //             value={profile.name}
// // // // //             onChange={handleChange}
// // // // //             placeholder="Name"
// // // // //             className="border border-[#6B4E2E]/30 p-3 rounded-lg w-full"
// // // // //           />
// // // // //           <input
// // // // //             name="email"
// // // // //             value={profile.email}
// // // // //             onChange={handleChange}
// // // // //             placeholder="Email"
// // // // //             className="border border-[#6B4E2E]/30 p-3 rounded-lg w-full"
// // // // //           />
// // // // //           <input
// // // // //             name="phone"
// // // // //             value={profile.phone}
// // // // //             onChange={handleChange}
// // // // //             placeholder="Phone"
// // // // //             className="border border-[#6B4E2E]/30 p-3 rounded-lg w-full"
// // // // //           />
// // // // //           <button
// // // // //             onClick={handleUpdate}
// // // // //             className="bg-[#6B4E2E] text-white px-6 py-3 rounded-lg
// // // // //                        hover:bg-[#5a4125] transition"
// // // // //           >
// // // // //             Update
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* STATS */}
// // // // //       <div className="flex flex-wrap gap-4 mb-6">
// // // // //         <div
// // // // //           onClick={() => setActiveTab("coins")}
// // // // //           className={`cursor-pointer flex-1 min-w-[160px] p-4 rounded-xl border
// // // // //             ${
// // // // //               activeTab === "coins"
// // // // //                 ? "bg-[#6B4E2E] text-white"
// // // // //                 : "bg-white border-[#6B4E2E]/30 hover:bg-[#6B4E2E]/5"
// // // // //             }`}
// // // // //         >
// // // // //           <p className="font-semibold">🪙 Heven Coins</p>
// // // // //           <p className="text-3xl font-extrabold">{balance.coins}</p>
// // // // //         </div>

// // // // //         <div
// // // // //           onClick={() => setActiveTab("cash")}
// // // // //           className={`cursor-pointer flex-1 min-w-[160px] p-4 rounded-xl border
// // // // //             ${
// // // // //               activeTab === "cash"
// // // // //                 ? "bg-[#6B4E2E] text-white"
// // // // //                 : "bg-white border-[#6B4E2E]/30 hover:bg-[#6B4E2E]/5"
// // // // //             }`}
// // // // //         >
// // // // //           <p className="font-semibold">💰 Heven Cash</p>
// // // // //           <p className="text-3xl font-extrabold">₹{balance.freeCash}</p>
// // // // //         </div>

// // // // //         <div
// // // // //           onClick={() => navigate("/orders")}
// // // // //           className="cursor-pointer flex-1 min-w-[160px] p-4 rounded-xl
// // // // //                      border border-[#6B4E2E]/30 bg-white hover:bg-[#6B4E2E]/5"
// // // // //         >
// // // // //           <p className="font-semibold">📦 Orders</p>
// // // // //           <p className="text-3xl font-extrabold">{profile.ordersCount}</p>
// // // // //         </div>

// // // // //         <div
// // // // //           onClick={() => navigate("/cart")}
// // // // //           className="cursor-pointer flex-1 min-w-[160px] p-4 rounded-xl
// // // // //                      border border-[#6B4E2E]/30 bg-white hover:bg-[#6B4E2E]/5"
// // // // //         >
// // // // //           <p className="font-semibold">🛒 Cart</p>
// // // // //           <p className="text-3xl font-extrabold">{profile.cartCount}</p>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* TRANSACTIONS */}
// // // // //       <div className="bg-[#faf9f7] p-6 rounded-xl border border-[#6B4E2E]/20 shadow">
// // // // //         <h2 className="text-xl font-bold mb-4">
// // // // //           {activeTab === "coins"
// // // // //             ? "🪙 Coin Transactions"
// // // // //             : "💰 Cash Transactions"}
// // // // //         </h2>

// // // // //         <div className="space-y-2 max-h-64 overflow-y-auto">
// // // // //           {(activeTab === "coins"
// // // // //             ? transactions.coins
// // // // //             : transactions.freeCash
// // // // //           ).length > 0 ? (
// // // // //             (activeTab === "coins"
// // // // //               ? transactions.coins
// // // // //               : transactions.freeCash
// // // // //             ).map((tx, i) => (
// // // // //               <div
// // // // //                 key={i}
// // // // //                 className="flex justify-between border-b border-[#6B4E2E]/20 py-2"
// // // // //               >
// // // // //                 <span className="truncate">{tx.reason}</span>
// // // // //                 <span
// // // // //                   className={
// // // // //                     tx.amount > 0 ? "text-green-600" : "text-red-600"
// // // // //                   }
// // // // //                 >
// // // // //                   {tx.amount > 0 ? "+" : ""}
// // // // //                   {tx.amount}
// // // // //                 </span>
// // // // //               </div>
// // // // //             ))
// // // // //           ) : (
// // // // //             <p className="text-gray-500 text-sm">No transactions yet.</p>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Profile;



// // // // // frontend/src/pages/Profile.jsx
// // // // import React, { useContext, useEffect, useState } from "react";
// // // // import { ShopContext } from "../context/ShopContext";
// // // // import axios from "axios";
// // // // import { toast } from "react-toastify";
// // // // import { useNavigate } from "react-router-dom";

// // // // const Profile = () => {
// // // //   const { token, backendUrl } = useContext(ShopContext);
// // // //   const navigate = useNavigate();

// // // //   const [profile, setProfile] = useState({
// // // //     name: "",
// // // //     email: "",
// // // //     phone: "",
// // // //     ordersCount: 0,
// // // //     cartCount: 0,
// // // //   });

// // // //   /* ================= LOAD PROFILE ================= */
// // // //   const loadProfile = async () => {
// // // //     if (!token) return;

// // // //     try {
// // // //       const res = await axios.get(`${backendUrl}/api/user/profile`, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       if (res.data.success) {
// // // //         const user = res.data.user;

// // // //         setProfile({
// // // //           name: user.name || "",
// // // //           email: user.email || "",
// // // //           phone: user.phone || "",
// // // //           ordersCount: user.ordersCount || 0,
// // // //           cartCount: user.cartData?.items?.length || 0,
// // // //         });
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error(error.response?.data?.message || error.message);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     loadProfile();
// // // //   }, [token]);

// // // //   /* ================= UPDATE ================= */
// // // //   const handleChange = (e) =>
// // // //     setProfile({ ...profile, [e.target.name]: e.target.value });

// // // //   const handleUpdate = async () => {
// // // //     try {
// // // //       const res = await axios.put(
// // // //         `${backendUrl}/api/user/profile/update`,
// // // //         {
// // // //           name: profile.name,
// // // //           phone: profile.phone,
// // // //         },
// // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // //       );

// // // //       if (res.data.success) {
// // // //         toast.success("Profile updated successfully!");
// // // //         loadProfile();
// // // //       } else {
// // // //         toast.error(res.data.message);
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error(error.response?.data?.message || error.message);
// // // //     }
// // // //   };

// // // //   /* ================= UI ================= */
// // // //   return (
// // // //     <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white text-gray-900">
// // // //       <h1 className="text-3xl font-extrabold mb-6 border-b pb-4">
// // // //         My Profile
// // // //       </h1>

// // // //       {/* USER DETAILS */}
// // // //       <div className="bg-[#faf9f7] p-6 rounded-xl shadow border border-[#6B4E2E]/20 mb-6">
// // // //         <h2 className="text-xl font-semibold mb-4 text-[#6B4E2E]">
// // // //           Account Details
// // // //         </h2>

// // // //         <div className="flex flex-col md:flex-row gap-4">
// // // //           <input
// // // //             name="name"
// // // //             value={profile.name}
// // // //             onChange={handleChange}
// // // //             placeholder="Full Name"
// // // //             className="border border-[#6B4E2E]/30 p-3 rounded-lg w-full"
// // // //           />

// // // //           <input
// // // //             value={profile.email}
// // // //             disabled
// // // //             className="border border-[#6B4E2E]/20 p-3 rounded-lg w-full bg-gray-100 cursor-not-allowed"
// // // //           />

// // // //           <input
// // // //             name="phone"
// // // //             value={profile.phone}
// // // //             onChange={handleChange}
// // // //             placeholder="Phone Number"
// // // //             className="border border-[#6B4E2E]/30 p-3 rounded-lg w-full"
// // // //           />

// // // //           <button
// // // //             onClick={handleUpdate}
// // // //             className="bg-[#6B4E2E] text-white px-6 py-3 rounded-lg
// // // //                        hover:bg-[#5a4125] transition"
// // // //           >
// // // //             Save
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* QUICK ACTIONS */}
// // // //       <div className="flex flex-wrap gap-4 mb-6">
// // // //         {/* ORDERS */}
// // // //         <div
// // // //           onClick={() => navigate("/orders")}
// // // //           className="cursor-pointer flex-1 min-w-[160px] p-5 rounded-xl
// // // //                      border border-[#6B4E2E]/30 bg-white
// // // //                      hover:bg-[#6B4E2E]/5 transition"
// // // //         >
// // // //           <p className="font-semibold">📦 Orders</p>
// // // //           <p className="text-3xl font-extrabold">{profile.ordersCount}</p>
// // // //         </div>

// // // //         {/* CART */}
// // // //         <div
// // // //           onClick={() => navigate("/cart")}
// // // //           className="cursor-pointer flex-1 min-w-[160px] p-5 rounded-xl
// // // //                      border border-[#6B4E2E]/30 bg-white
// // // //                      hover:bg-[#6B4E2E]/5 transition"
// // // //         >
// // // //           <p className="font-semibold">🛒 Cart</p>
// // // //           <p className="text-3xl font-extrabold">{profile.cartCount}</p>
// // // //         </div>

// // // //         {/* ADDRESS (Future Ready) */}
// // // //         <div
// // // //           className="flex-1 min-w-[160px] p-5 rounded-xl
// // // //                      border border-[#6B4E2E]/30 bg-white"
// // // //         >
// // // //           <p className="font-semibold">🏠 Address</p>
// // // //           <p className="text-sm text-gray-500 mt-1">
// // // //             Add shipping address at checkout
// // // //           </p>
// // // //         </div>
// // // //       </div>

// // // //       {/* SECURITY INFO */}
// // // //       <div className="bg-[#faf9f7] p-6 rounded-xl border border-[#6B4E2E]/20 shadow">
// // // //         <h2 className="text-xl font-semibold mb-3 text-[#6B4E2E]">
// // // //           Account Security
// // // //         </h2>
// // // //         <p className="text-sm text-gray-600">
// // // //           ✔ Email verified  
// // // //           <br />
// // // //           ✔ Password protected  
// // // //           <br />
// // // //           🔒 Change password option coming soon
// // // //         </p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Profile;


// // // // frontend/src/pages/Profile.jsx
// // // import React, { useContext, useEffect, useState } from "react";
// // // import { ShopContext } from "../context/ShopContext";
// // // import axios from "axios";
// // // import { toast } from "react-toastify";
// // // import { useNavigate } from "react-router-dom";

// // // const Profile = () => {
// // //   const { token, backendUrl } = useContext(ShopContext);
// // //   const navigate = useNavigate();

// // //   const [profile, setProfile] = useState({
// // //     name: "",
// // //     email: "",
// // //     phone: "",
// // //   });

// // //   const [ordersCount, setOrdersCount] = useState(0);
// // //   const [cartCount, setCartCount] = useState(0);

// // //   /* ================= LOAD PROFILE ================= */
// // //   const loadProfile = async () => {
// // //     if (!token) return;

// // //     try {
// // //       /* -------- USER PROFILE -------- */
// // //       const profileRes = await axios.get(`${backendUrl}/api/user/profile`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });

// // //       if (profileRes.data.success) {
// // //         const user = profileRes.data.user;

// // //         setProfile({
// // //           name: user.name || "",
// // //           email: user.email || "",
// // //           phone: user.phone || "",
// // //         });

// // //         /* -------- CART COUNT (TOTAL QTY) -------- */
// // //         let totalCartQty = 0;
// // //         const cartData = user.cartData || {};

// // //         Object.values(cartData).forEach((sizes) => {
// // //           Object.values(sizes).forEach((qty) => {
// // //             totalCartQty += qty;
// // //           });
// // //         });

// // //         setCartCount(totalCartQty);
// // //       }

// // //       /* -------- PAID ORDERS COUNT -------- */
// // //       const ordersRes = await axios.post(
// // //         `${backendUrl}/api/order/userorders`,
// // //         {},
// // //         { headers: { token } }
// // //       );

// // //       if (ordersRes.data.success) {
// // //         const paidOrders = ordersRes.data.orders.filter(
// // //           (order) => order.payment === true
// // //         );
// // //         setOrdersCount(paidOrders.length);
// // //       }
// // //     } catch (error) {
// // //       toast.error(error.response?.data?.message || error.message);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     loadProfile();
// // //   }, [token]);

// // //   /* ================= UPDATE ================= */
// // //   const handleChange = (e) =>
// // //     setProfile({ ...profile, [e.target.name]: e.target.value });

// // //   const handleUpdate = async () => {
// // //     try {
// // //       const res = await axios.put(
// // //         `${backendUrl}/api/user/profile/update`,
// // //         {
// // //           name: profile.name,
// // //           phone: profile.phone,
// // //         },
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );

// // //       if (res.data.success) {
// // //         toast.success("Profile updated successfully!");
// // //         loadProfile();
// // //       } else {
// // //         toast.error(res.data.message);
// // //       }
// // //     } catch (error) {
// // //       toast.error(error.response?.data?.message || error.message);
// // //     }
// // //   };

// // //   /* ================= UI ================= */
// // //   return (
// // //     <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white text-gray-900">
// // //       <h1 className="text-3xl font-extrabold mb-6 border-b pb-4">
// // //         My Profile
// // //       </h1>

// // //       {/* ACCOUNT DETAILS */}
// // //       <div className="bg-[#faf9f7] p-6 rounded-xl shadow border border-[#6B4E2E]/20 mb-6">
// // //         <h2 className="text-xl font-semibold mb-4 text-[#6B4E2E]">
// // //           Account Details
// // //         </h2>

// // //         <div className="flex flex-col md:flex-row gap-4">
// // //           <input
// // //             name="name"
// // //             value={profile.name}
// // //             onChange={handleChange}
// // //             placeholder="Full Name"
// // //             className="border border-[#6B4E2E]/30 p-3 rounded-lg w-full"
// // //           />

// // //           <input
// // //             value={profile.email}
// // //             disabled
// // //             className="border border-[#6B4E2E]/20 p-3 rounded-lg w-full bg-gray-100 cursor-not-allowed"
// // //           />

// // //           <input
// // //             name="phone"
// // //             value={profile.phone}
// // //             onChange={handleChange}
// // //             placeholder="Phone Number"
// // //             className="border border-[#6B4E2E]/30 p-3 rounded-lg w-full"
// // //           />

// // //           <button
// // //             onClick={handleUpdate}
// // //             className="bg-[#6B4E2E] text-white px-6 py-3 rounded-lg
// // //                        hover:bg-[#5a4125] transition"
// // //           >
// // //             Save
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* QUICK STATS */}
// // //       <div className="flex flex-wrap gap-4 mb-6">
// // //         {/* PAID ORDERS */}
// // //         <div
// // //           onClick={() => navigate("/orders")}
// // //           className="cursor-pointer flex-1 min-w-[160px] p-5 rounded-xl
// // //                      border border-[#6B4E2E]/30 bg-white
// // //                      hover:bg-[#6B4E2E]/5 transition"
// // //         >
// // //           <p className="font-semibold">📦 Paid Orders</p>
// // //           <p className="text-3xl font-extrabold">{ordersCount}</p>
// // //         </div>

// // //         {/* CART */}
// // //         <div
// // //           onClick={() => navigate("/cart")}
// // //           className="cursor-pointer flex-1 min-w-[160px] p-5 rounded-xl
// // //                      border border-[#6B4E2E]/30 bg-white
// // //                      hover:bg-[#6B4E2E]/5 transition"
// // //         >
// // //           <p className="font-semibold">🛒 Cart Items</p>
// // //           <p className="text-3xl font-extrabold">{cartCount}</p>
// // //         </div>

// // //         {/* ADDRESS */}
// // //         <div
// // //           className="flex-1 min-w-[160px] p-5 rounded-xl
// // //                      border border-[#6B4E2E]/30 bg-white"
// // //         >
// // //           <p className="font-semibold">🏠 Address</p>
// // //           <p className="text-sm text-gray-500 mt-1">
// // //             Add shipping address at checkout
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* SECURITY */}
// // //       <div className="bg-[#faf9f7] p-6 rounded-xl border border-[#6B4E2E]/20 shadow">
// // //         <h2 className="text-xl font-semibold mb-3 text-[#6B4E2E]">
// // //           Account Security
// // //         </h2>
// // //         <p className="text-sm text-gray-600">
// // //           ✔ Email verified <br />
// // //           ✔ Secure login enabled <br />
// // //           🔒 Password change coming soon
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Profile;



// // // frontend/src/pages/Profile.jsx
// // import React, { useContext, useEffect, useState } from "react";
// // import { ShopContext } from "../context/ShopContext";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { useNavigate } from "react-router-dom";

// // const Profile = () => {
// //   const { token, backendUrl, setToken } = useContext(ShopContext);
// //   const navigate = useNavigate();

// //   const [profile, setProfile] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //   });

// //   const [ordersCount, setOrdersCount] = useState(0);
// //   const [cartCount, setCartCount] = useState(0);
// //   const [loading, setLoading] = useState(true);

// //   /* ================= LOAD PROFILE ================= */
// //   const loadProfile = async () => {
// //     if (!token) return;

// //     try {
// //       setLoading(true);

// //       const profileRes = await axios.get(`${backendUrl}/api/user/profile`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       if (profileRes.data.success) {
// //         const user = profileRes.data.user;

// //         setProfile({
// //           name: user.name || "",
// //           email: user.email || "",
// //           phone: user.phone || "",
// //         });

// //         let totalCartQty = 0;
// //         const cartData = user.cartData || {};

// //         Object.values(cartData).forEach((sizes) => {
// //           Object.values(sizes).forEach((qty) => {
// //             totalCartQty += qty;
// //           });
// //         });

// //         setCartCount(totalCartQty);
// //       }

// //       const ordersRes = await axios.post(
// //         `${backendUrl}/api/order/userorders`,
// //         {},
// //         { headers: { token } }
// //       );

// //       if (ordersRes.data.success) {
// //         const paidOrders = ordersRes.data.orders.filter(
// //           (order) => order.payment === true
// //         );
// //         setOrdersCount(paidOrders.length);
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadProfile();
// //   }, [token]);

// //   /* ================= UPDATE ================= */
// //   const handleChange = (e) =>
// //     setProfile({ ...profile, [e.target.name]: e.target.value });

// //   const handleUpdate = async () => {
// //     try {
// //       const res = await axios.put(
// //         `${backendUrl}/api/user/profile/update`,
// //         {
// //           name: profile.name,
// //           phone: profile.phone,
// //         },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       if (res.data.success) {
// //         toast.success("Profile updated successfully!");
// //         loadProfile();
// //       } else {
// //         toast.error(res.data.message);
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || error.message);
// //     }
// //   };

// //   /* ================= LOGOUT ================= */
// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     setToken(null);
// //     toast.success("Logged out successfully");
// //     navigate("/login");
// //   };

// //   /* ================= UI ================= */
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] to-white">
// //       <div className="max-w-5xl mx-auto p-4 sm:p-6 text-gray-900 animate-fadeIn">

// //         {/* HEADER */}
// //         <div className="mb-8">
// //   <p className="text-sm text-gray-500 tracking-wide uppercase">
// //     WILDBEARS ACCOUNT
// //   </p>

// //   <h1 className="text-4xl font-extrabold tracking-tight mt-1">
// //     Hi, <span className="text-[#6B4E2E]">{profile.name || "User"}</span> 👋
// //   </h1>

// //   <p className="text-sm text-gray-600 mt-1">
// //     Welcome back to <span className="font-semibold">WILDBEARS</span>
// //   </p>
// // </div>


// //         {/* ACCOUNT CARD */}
// //         <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-[#6B4E2E]/20 mb-8 transition hover:shadow-xl">
// //           <h2 className="text-xl font-semibold mb-5 text-[#6B4E2E]">
// //             Account Details
// //           </h2>

// //           <div className="grid md:grid-cols-4 gap-4">
// //             <input
// //               name="name"
// //               value={profile.name}
// //               onChange={handleChange}
// //               placeholder="Full Name"
// //               className="border border-[#6B4E2E]/30 p-3 rounded-xl focus:ring-2 focus:ring-[#6B4E2E]/40 outline-none"
// //             />

// //             <input
// //               value={profile.email}
// //               disabled
// //               className="border border-[#6B4E2E]/20 p-3 rounded-xl bg-gray-100 cursor-not-allowed"
// //             />

// //             <input
// //               name="phone"
// //               value={profile.phone}
// //               onChange={handleChange}
// //               placeholder="Phone Number"
// //               className="border border-[#6B4E2E]/30 p-3 rounded-xl focus:ring-2 focus:ring-[#6B4E2E]/40 outline-none"
// //             />

// //             <button
// //               onClick={handleUpdate}
// //               className="bg-[#6B4E2E] text-white rounded-xl font-semibold
// //                          hover:bg-[#5a4125] transition-all active:scale-95"
// //             >
// //               Save
// //             </button>
// //           </div>
// //         </div>

// //         {/* STATS GRID */}
// //         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
// //           <div
// //             onClick={() => navigate("/orders")}
// //             className="group cursor-pointer p-6 rounded-2xl bg-white shadow-md border border-[#6B4E2E]/20
// //                        hover:shadow-xl hover:-translate-y-1 transition-all"
// //           >
// //             <p className="text-sm text-gray-500">Paid Orders</p>
// //             <p className="text-4xl font-extrabold mt-2 group-hover:text-[#6B4E2E] transition">
// //               {ordersCount}
// //             </p>
// //           </div>

// //           <div
// //             onClick={() => navigate("/cart")}
// //             className="group cursor-pointer p-6 rounded-2xl bg-white shadow-md border border-[#6B4E2E]/20
// //                        hover:shadow-xl hover:-translate-y-1 transition-all"
// //           >
// //             <p className="text-sm text-gray-500">Cart Items</p>
// //             <p className="text-4xl font-extrabold mt-2 group-hover:text-[#6B4E2E] transition">
// //               {cartCount}
// //             </p>
// //           </div>

// //           <div className="p-6 rounded-2xl bg-white shadow-md border border-[#6B4E2E]/20">
// //             <p className="text-sm text-gray-500">Shipping</p>
// //             <p className="text-sm mt-2 text-gray-600">
// //               Address added at checkout
// //             </p>
// //           </div>
// //         </div>

// //         {/* SECURITY */}
// //         <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow border border-[#6B4E2E]/20 mb-10">
// //           <h2 className="text-lg font-semibold mb-2 text-[#6B4E2E]">
// //             Account Security
// //           </h2>
// //           <p className="text-sm text-gray-600 leading-relaxed">
// //             ✔ Email verified <br />
// //             ✔ Secure login enabled <br />
// //             🔒 Password reset coming soon
// //           </p>
// //         </div>

// //         {/* LOGOUT */}
// //         <div className="flex justify-center">
// //           <button
// //             onClick={handleLogout}
// //             className="px-12 py-3 rounded-full font-semibold
// //                        border border-red-500 text-red-600
// //                        hover:bg-red-500 hover:text-white
// //                        transition-all active:scale-95"
// //           >
// //             Logout
// //           </button>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;



// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const { token, backendUrl, setToken } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     profileImage: ""
//   });

//   const [ordersCount, setOrdersCount] = useState(0);
//   const [cartCount, setCartCount] = useState(0);
//   const [uploading, setUploading] = useState(false);

//   /* ================= LOAD PROFILE ================= */
//   const loadProfile = async () => {
//     if (!token) return;

//     try {
//       const profileRes = await axios.get(`${backendUrl}/api/user/profile`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (profileRes.data.success) {
//         const user = profileRes.data.user;

//         setProfile({
//           name: user.name || "",
//           email: user.email || "",
//           phone: user.phone || "",
//           profileImage: user.profileImage || ""
//         });

//         // Cart count
//         let totalCartQty = 0;
//         const cartData = user.cartData || {};
//         Object.values(cartData).forEach(sizes =>
//           Object.values(sizes).forEach(qty => (totalCartQty += qty))
//         );
//         setCartCount(totalCartQty);
//       }

//       // Paid orders count
//       const ordersRes = await axios.post(
//         `${backendUrl}/api/order/userorders`,
//         {},
//         { headers: { token } }
//       );

//       if (ordersRes.data.success) {
//         setOrdersCount(
//           ordersRes.data.orders.filter(o => o.payment === true).length
//         );
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   useEffect(() => {
//     loadProfile();
//   }, [token]);

//   /* ================= IMAGE UPLOAD ================= */
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setUploading(true);
//       const res = await axios.post(
//         `${backendUrl}/api/user/profile/upload`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data"
//           }
//         }
//       );

//       if (res.data.success) {
//         setProfile(p => ({ ...p, profileImage: res.data.image }));
//         toast.success("Profile photo updated");
//       }
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ================= UPDATE DETAILS ================= */
//   const handleChange = (e) =>
//     setProfile({ ...profile, [e.target.name]: e.target.value });

//   const handleUpdate = async () => {
//     try {
//       const res = await axios.put(
//         `${backendUrl}/api/user/profile/update`,
//         { name: profile.name, phone: profile.phone },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success) {
//         toast.success("Profile updated");
//         loadProfile();
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   /* ================= LOGOUT ================= */
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     toast.success("Logged out");
//     navigate("/login");
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] to-white">
//       <div className="max-w-5xl mx-auto p-6">

//         {/* HEADER */}
//         <div className="mb-10">
//           <p className="text-xs tracking-widest text-gray-500 uppercase">
//             WILDBEARS ACCOUNT
//           </p>
//           <h1 className="text-4xl font-extrabold mt-1">
//             Hi, <span className="text-[#6B4E2E]">{profile.name || "User"}</span> 👋
//           </h1>
//           <p className="text-sm text-gray-600">
//             Welcome back to <b>WILDBEARS</b>
//           </p>
//         </div>

//         {/* PROFILE IMAGE */}
//         <div className="flex justify-center mb-10">
//           <label className="relative group cursor-pointer">
//             <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#6B4E2E]">
//               {profile.profileImage ? (
//                 <img
//                   src={profile.profileImage}
//                   alt="profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center
//                                 bg-[#6B4E2E] text-white text-4xl font-bold">
//                   {profile.name?.charAt(0)}
//                 </div>
//               )}
//             </div>

//             <input
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={handleImageUpload}
//             />

//             <span className="absolute bottom-2 right-2 bg-black text-white
//                              text-xs px-3 py-1 rounded-full opacity-0
//                              group-hover:opacity-100 transition">
//               {uploading ? "Uploading..." : "Change"}
//             </span>
//           </label>
//         </div>

//         {/* ACCOUNT DETAILS */}
//         <div className="bg-white p-6 rounded-2xl shadow border border-[#6B4E2E]/20 mb-8">
//           <h2 className="text-xl font-semibold text-[#6B4E2E] mb-4">
//             Account Details
//           </h2>

//           <div className="grid md:grid-cols-4 gap-4">
//             <input
//               name="name"
//               value={profile.name}
//               onChange={handleChange}
//               placeholder="Name"
//               className="border p-3 rounded-xl"
//             />

//             <input
//               value={profile.email}
//               disabled
//               className="border p-3 rounded-xl bg-gray-100 cursor-not-allowed"
//             />

//             <input
//               name="phone"
//               value={profile.phone}
//               onChange={handleChange}
//               placeholder="Phone"
//               className="border p-3 rounded-xl"
//             />

//             <button
//               onClick={handleUpdate}
//               className="bg-[#6B4E2E] text-white rounded-xl
//                          hover:bg-[#5a4125] transition"
//             >
//               Save
//             </button>
//           </div>
//         </div>

//         {/* STATS */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//           <div
//             onClick={() => navigate("/orders")}
//             className="cursor-pointer p-6 bg-white rounded-2xl shadow
//                        border hover:-translate-y-1 transition"
//           >
//             <p className="text-sm text-gray-500">Paid Orders</p>
//             <p className="text-4xl font-extrabold mt-2">{ordersCount}</p>
//           </div>

//           <div
//             onClick={() => navigate("/cart")}
//             className="cursor-pointer p-6 bg-white rounded-2xl shadow
//                        border hover:-translate-y-1 transition"
//           >
//             <p className="text-sm text-gray-500">Cart Items</p>
//             <p className="text-4xl font-extrabold mt-2">{cartCount}</p>
//           </div>

//           <div className="p-6 bg-white rounded-2xl shadow border">
//             <p className="text-sm text-gray-500">Shipping</p>
//             <p className="text-sm mt-2 text-gray-600">
//               Address added during checkout
//             </p>
//           </div>
//         </div>

//         {/* LOGOUT */}
//         <div className="flex justify-center">
//           <button
//             onClick={handleLogout}
//             className="px-12 py-3 rounded-full font-semibold
//                        border border-red-500 text-red-600
//                        hover:bg-red-500 hover:text-white transition"
//           >
//             Logout
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Profile;



// frontend/src/pages/Profile.jsx
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { token, backendUrl, setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: ""
  });

  const [ordersCount, setOrdersCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [uploading, setUploading] = useState(false);

  /* ================= LOAD PROFILE ================= */
  const loadProfile = async () => {
    if (!token) return;

    try {
      const profileRes = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (profileRes.data.success) {
        const user = profileRes.data.user;

        setProfile({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          profileImage: user.profileImage || ""
        });

        let totalCartQty = 0;
        const cartData = user.cartData || {};
        Object.values(cartData).forEach(sizes =>
          Object.values(sizes).forEach(qty => (totalCartQty += qty))
        );
        setCartCount(totalCartQty);
      }

      const ordersRes = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (ordersRes.data.success) {
        setOrdersCount(
          ordersRes.data.orders.filter(o => o.payment === true).length
        );
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [token]);

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post(
        `${backendUrl}/api/user/profile/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (res.data.success) {
        setProfile(p => ({ ...p, profileImage: res.data.image }));
        toast.success("Profile photo updated");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  /* ================= UPDATE ================= */
  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${backendUrl}/api/user/profile/update`,
        { name: profile.name, phone: profile.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Profile updated");
        loadProfile();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out");
    navigate("/login");
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-white to-[#f3eee9]">
      <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">

        {/* HERO */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase">
            WILDBEARS
          </p>

          <h1 className="text-4xl sm:text-5xl font-extrabold mt-3">
            Hi,{" "}
            <span className="text-[#6B4E2E]">
              {profile.name || "User"}
            </span>{" "}
            👋
          </h1>

          <p className="text-sm text-gray-600 mt-2">
            Your personal space at <b>WILDBEARS</b>
          </p>
        </div>

        {/* AVATAR */}
        <div className="flex justify-center mb-12">
          <label className="relative cursor-pointer group">
            <div className="w-32 h-32 rounded-full overflow-hidden
                            border-4 border-[#6B4E2E]
                            shadow-xl transition-transform
                            active:scale-95 group-hover:scale-105">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center
                                bg-[#6B4E2E] text-white text-4xl font-bold">
                  {profile.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />

            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2
                             bg-black text-white text-xs px-4 py-1 rounded-full
                             opacity-90">
              {uploading ? "Uploading…" : "Edit Avatar"}
            </span>
          </label>
        </div>

        {/* ACCOUNT CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl
                        shadow-xl border border-[#6B4E2E]/20
                        p-6 mb-10 animate-slideUp">
          <h2 className="text-lg font-semibold text-[#6B4E2E] mb-5">
            Account Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border border-[#6B4E2E]/30 p-3 rounded-xl"
            />

            <input
              value={profile.email}
              disabled
              className="border border-[#6B4E2E]/20 p-3 rounded-xl
                         bg-gray-100 cursor-not-allowed"
            />

            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border border-[#6B4E2E]/30 p-3 rounded-xl"
            />

            <button
              onClick={handleUpdate}
              className="bg-[#6B4E2E] text-white rounded-xl
                         font-semibold py-3
                         active:scale-95 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Paid Orders", value: ordersCount, action: () => navigate("/orders") },
            { label: "Cart Items", value: cartCount, action: () => navigate("/cart") },
            { label: "Shipping", value: "Checkout", action: null }
          ].map((item, i) => (
            <div
              key={i}
              onClick={item.action || undefined}
              className={`p-6 rounded-3xl bg-white shadow-lg
                          border border-[#6B4E2E]/20
                          transition-all active:scale-[0.97]
                          ${item.action ? "cursor-pointer" : ""}`}
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-4xl font-extrabold mt-2">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* LOGOUT */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="px-14 py-3 rounded-full font-semibold
                       border-2 border-red-500 text-red-600
                       active:bg-red-500 active:text-white
                       transition-all"
          >
            Logout
          </button>
        </div>

      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px) }
            to { opacity: 1; transform: translateY(0) }
          }
          .animate-fadeIn { animation: fadeIn 0.6s ease-out }
          .animate-slideUp { animation: slideUp 0.6s ease-out }
        `}
      </style>
    </div>
  );
};

export default Profile;
