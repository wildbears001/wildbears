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
