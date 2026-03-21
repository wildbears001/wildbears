// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../App";

// const Dashboard = ({ token }) => {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`${backendUrl}/api/admin/dashboard/stats`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(res => setStats(res.data.stats));
//   }, [token]);

//   if (!stats) return <p>Loading dashboard...</p>;

//   const Card = ({ title, value }) => (
//     <div className="p-4 border rounded shadow bg-white">
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className="text-2xl font-bold mt-1">{value}</p>
//     </div>
//   );

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h2>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         <Card title="Total Revenue" value={`${currency}${stats.totalRevenue}`} />
//         <Card title="Total Orders" value={stats.totalOrders} />
//         <Card title="Paid Orders" value={stats.paidOrders} />
//         <Card title="Pending Orders" value={stats.pendingOrders} />
//         <Card title="Pre Orders" value={stats.preOrders} />
//         <Card title="Products" value={stats.totalProducts} />
//         <Card title="Users" value={stats.totalUsers} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { motion } from "framer-motion";
import {
  IndianRupee,
  ShoppingBag,
  CheckCircle,
  Clock,
  Package,
  Users,
  ShoppingCart,
  Banknote
} from "lucide-react";
import { toast } from 'react-toastify';

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState(null);
  const [isCodEnabled, setIsCodEnabled] = useState(false);
  const [socials, setSocials] = useState({ instagram: '', facebook: '', twitter: '', youtube: '', phone: '', email: '' });
  const [savingSocials, setSavingSocials] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/settings/get`);
        if (res.data?.success) {
           setIsCodEnabled(res.data.settings.isCodEnabled);
           if(res.data.settings.socialLinks) {
              setSocials(prev => ({ ...prev, ...res.data.settings.socialLinks }));
           }
           if(res.data.settings.contactInfo) {
              setSocials(prev => ({ ...prev, phone: res.data.settings.contactInfo.phone || '', email: res.data.settings.contactInfo.email || '' }));
           }
        }
      } catch (err) { console.error(err); }
    };
    fetchSettings();
  }, []);

  const toggleCod = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/settings/update-cod`, { isCodEnabled: !isCodEnabled }, { headers: { token } });
      if (res.data?.success) {
        setIsCodEnabled(!isCodEnabled);
        toast.success(res.data.message);
      }
    } catch (err) { console.error(err); }
  };

  const handleSaveSocials = async () => {
    setSavingSocials(true);
    try {
      const res = await axios.post(`${backendUrl}/api/settings/update-social`, socials, { headers: { token } });
      if (res.data?.success) toast.success(res.data.message);
      else toast.error(res.data.message);
    } catch(err) { toast.error(err.message); }
    finally { setSavingSocials(false); }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/admin/dashboard/stats`,
          { headers: { token } }
        );
        if (res.data?.success) setStats(res.data.stats);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [token]);

  /* ================= LOADING STATE ================= */
  if (!stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  /* ================= CARD ================= */
  const StatCard = ({ title, value, icon: Icon, gradient }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.04 }}
      className={`p-5 rounded-xl shadow-md text-white ${gradient}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <Icon size={36} className="opacity-80" />
      </div>
    </motion.div>
  );

  return (
    <div>
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold tracking-tight">
          📊 Admin Dashboard
        </h2>
        <p className="text-gray-500 mt-1">
          Overview of store performance
        </p>
      </motion.div>

      {/* ================= SETTINGS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* COD Toggle */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Banknote size={20} /></div>
            <div>
              <h3 className="font-bold text-gray-800">Cash on Delivery (COD)</h3>
              <p className="text-sm text-gray-500">Allow customers to pay physical cash</p>
            </div>
          </div>
          <button
            onClick={toggleCod}
            className={`w-full py-3 rounded-lg font-bold tracking-wide transition-colors ${isCodEnabled ? 'bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'}`}
          >
            {isCodEnabled ? 'COD IS ACTIVE' : 'COD IS INACTIVE'}
          </button>
        </motion.div>

        {/* Social Meta Links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><Users size={20} /></div>
               <div>
                  <h3 className="font-bold text-gray-800">Global Configuration</h3>
                  <p className="text-xs text-gray-500">Live Footer URIs & Meta</p>
               </div>
             </div>
             <button onClick={handleSaveSocials} disabled={savingSocials} className="px-4 py-2 bg-black text-white text-xs font-bold rounded hover:bg-gray-800 transition">
               {savingSocials ? 'SYNCING...' : 'SAVE DATA'}
             </button>
           </div>
           
           <div className="grid grid-cols-2 gap-3 mb-4">
              <input placeholder="Store Phone" value={socials.phone} onChange={e => setSocials({...socials, phone: e.target.value})} className="w-full text-xs px-3 py-2 border border-gray-200 rounded outline-none focus:border-purple-500" />
              <input placeholder="Store Email" value={socials.email} onChange={e => setSocials({...socials, email: e.target.value})} className="w-full text-xs px-3 py-2 border border-gray-200 rounded outline-none focus:border-purple-500" />
           </div>

           <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
              <input placeholder="Instagram Link" value={socials.instagram} onChange={e => setSocials({...socials, instagram: e.target.value})} className="w-full text-xs px-3 py-2 border border-gray-200 rounded outline-none focus:border-purple-500" />
              <input placeholder="Facebook Link" value={socials.facebook} onChange={e => setSocials({...socials, facebook: e.target.value})} className="w-full text-xs px-3 py-2 border border-gray-200 rounded outline-none focus:border-purple-500" />
              <input placeholder="Twitter Link" value={socials.twitter} onChange={e => setSocials({...socials, twitter: e.target.value})} className="w-full text-xs px-3 py-2 border border-gray-200 rounded outline-none focus:border-purple-500" />
              <input placeholder="YouTube Link" value={socials.youtube} onChange={e => setSocials({...socials, youtube: e.target.value})} className="w-full text-xs px-3 py-2 border border-gray-200 rounded outline-none focus:border-purple-500" />
           </div>
        </motion.div>

      </div>

      {/* ================= STATS GRID ================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`${currency}${stats.totalRevenue}`}
          icon={IndianRupee}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
        />

        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingBag}
          gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
        />

        <StatCard
          title="Paid Orders"
          value={stats.paidOrders}
          icon={CheckCircle}
          gradient="bg-gradient-to-br from-purple-500 to-fuchsia-600"
        />

        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={Clock}
          gradient="bg-gradient-to-br from-orange-500 to-amber-600"
        />

        <StatCard
          title="COD Orders"
          value={stats.codOrders}
          icon={Banknote}
          gradient="bg-gradient-to-br from-red-500 to-rose-700"
        />

        <StatCard
          title="Pre-Orders"
          value={stats.preOrders}
          icon={ShoppingCart}
          gradient="bg-gradient-to-br from-pink-500 to-rose-600"
        />

        <StatCard
          title="Products"
          value={stats.totalProducts}
          icon={Package}
          gradient="bg-gradient-to-br from-slate-600 to-gray-800"
        />

        <StatCard
          title="Users"
          value={stats.totalUsers}
          icon={Users}
          gradient="bg-gradient-to-br from-cyan-500 to-sky-600"
        />
      </div>
    </div>
  );
};

export default Dashboard;
