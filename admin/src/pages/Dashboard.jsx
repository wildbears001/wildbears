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
  ShoppingCart
} from "lucide-react";

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState(null);

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
