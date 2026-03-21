import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { Users, Search, Coins, ArrowUpRight, FolderOpen, Wallet, KeySquare, Calendar, Zap } from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Data for selected user
  const [coins, setCoins] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [orders, setOrders] = useState([]);
  
  // App States
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Bulk Add States
  const [bulkCoins, setBulkCoins] = useState(0);
  const [bulkWallet, setBulkWallet] = useState(0);
  const [bulkReason, setBulkReason] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/admin/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const usersData = Array.isArray(res.data) ? res.data : Array.isArray(res.data.users) ? res.data.users : [];
      const mappedUsers = usersData.map((user) => ({
        ...user,
        coins: user.coins_balance || 0,
        walletBalance: user.wallet_balance || 0,
      }));
      setUsers(mappedUsers);
      setFilteredUsers(mappedUsers);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user._id.includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleBulkAdd = async () => {
    if (bulkCoins === 0 && bulkWallet === 0) return;
    try {
      await axios.post(`${backendUrl}/api/admin/users/bulk-update`, {
          coins: Number(bulkCoins),
          walletBalance: Number(bulkWallet),
          reason: bulkReason || "Admin Update",
          source: "Admin",
      }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      alert(`Provisioned successfully across cluster!`);
      setBulkCoins(0); setBulkWallet(0); setBulkReason("");
      fetchUsers();
    } catch (err) { alert("Failed operation block."); }
  };

  const handleView = async (userId) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null); return;
    }
    try {
      const res = await axios.get(`${backendUrl}/api/admin/users/${userId}`);
      if (!res.data.user) return;
      const mappedUser = { ...res.data.user, coins: res.data.user.coins_balance || 0, walletBalance: res.data.user.wallet_balance || 0 };
      setSelectedUserId(userId);
      setSelectedUser(mappedUser);
      setCoins(mappedUser.coins);
      setWalletBalance(mappedUser.walletBalance);
      setOrders(res.data.orders || []);
    } catch (err) {}
  };

  const updateBalance = async (userId, coinsChange, walletChange, reason = "Admin Core Manual Sync") => {
    try {
      await axios.put(`${backendUrl}/api/admin/users/${userId}`, { 
        coins_change: coinsChange, wallet_change: walletChange, reason 
      }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      fetchUsers();
      alert("Ledger synced directly.");
    } catch (err) { alert("Ledger block failed."); }
  };

  return (
    <div className="bg-[#faf9f7] rounded-3xl min-h-screen">
      
      {/* ================= HEADER OVERVIEW ================= */}
      <div className="bg-white px-8 py-8 md:py-10 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                 <Users size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-gray-900">User Intelligence</h3>
                <p className="text-gray-500 font-medium">Monitoring {users.length} active registered network identities</p>
              </div>
           </div>

           <div className="relative w-full md:w-[400px]">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
             <input
               type="text"
               placeholder="Search cluster via UID, Auth, or Alias..."
               value={searchQuery}
               onChange={(e) => handleSearch(e.target.value)}
               className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
             />
           </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* ================= MASS ACTIONS BOARD ================= */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
           <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-6">
             <Zap size={18} className="text-yellow-500" /> Macro Inject (Global AirDrop)
           </h4>
           <div className="flex flex-col lg:flex-row gap-4 items-end">
              <div className="w-full">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Heven Coins (+)</label>
                 <div className="relative">
                   <Coins size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   <input type="number" value={bulkCoins} onChange={(e) => setBulkCoins(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#6B4E2E]" />
                 </div>
              </div>
              <div className="w-full">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Free Wallet Cash (+)</label>
                 <div className="relative">
                   <Wallet size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   <input type="number" value={bulkWallet} onChange={(e) => setBulkWallet(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#6B4E2E]" />
                 </div>
              </div>
              <div className="w-full">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Ledger Source Motivation</label>
                 <input type="text" placeholder="Promo code event, delay apology..." value={bulkReason} onChange={(e) => setBulkReason(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#6B4E2E]" />
              </div>
              <button onClick={handleBulkAdd} className="w-full lg:w-auto px-8 py-3 bg-black text-white rounded-xl font-bold tracking-wide hover:bg-gray-800 transition-colors whitespace-nowrap shadow-md shadow-black/20 shrink-0">
                 EXECUTE BLOCK
              </button>
           </div>
        </div>

        {/* ================= CORE DIRECTORY TABLE ================= */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-[#faf9f7] border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-widest">
                 <tr>
                   <th className="p-5 pl-8">Identity Meta</th>
                   <th className="p-5">Economy Ledger</th>
                   <th className="p-5 text-right pr-8">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {loading ? (
                   <tr><td colSpan="3" className="p-8 text-center text-gray-400">Loading neural profiles...</td></tr>
                 ) : filteredUsers.map((user) => (
                   <React.Fragment key={user._id}>
                     <tr className="hover:bg-gray-50/50 transition-colors">
                       <td className="p-5 pl-8">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B4E2E] to-gray-800 text-white flex items-center justify-center font-bold text-sm shadow-md">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                               <p className="font-bold text-gray-900">{user.name}</p>
                               <p className="text-sm font-medium text-gray-500">{user.email}</p>
                            </div>
                         </div>
                       </td>
                       <td className="p-5">
                          <div className="flex flex-col gap-1">
                             <div className="flex items-center gap-2"><Coins size={15} className="text-amber-500"/> <span className="text-sm font-bold text-gray-700">{user.coins} Coins</span></div>
                             <div className="flex items-center gap-2"><Wallet size={15} className="text-green-500"/> <span className="text-sm font-bold text-gray-700">₹{user.walletBalance} Liquid</span></div>
                          </div>
                       </td>
                       <td className="p-5 text-right pr-8">
                         <button onClick={() => handleView(user._id)} className={`px-5 py-2 rounded-xl text-sm font-bold tracking-wide transition-all border ${selectedUserId === user._id ? 'bg-[#6B4E2E] text-white border-[#6B4E2E] shadow-lg shadow-[#6B4E2E]/30' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                           {selectedUserId === user._id ? 'CLOSE PORTAL' : 'INSPECT'}
                         </button>
                       </td>
                     </tr>
                     
                     {/* ================= USER INSPECT ACCORDION MODAL ================= */}
                     {selectedUserId === user._id && selectedUser && (
                       <tr className="bg-gray-50/80 shadow-inner">
                         <td colSpan="3" className="p-0">
                           <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in border-b border-gray-200">
                             
                             {/* Ledger Modification Node */}
                             <div className="bg-white rounded-2xl p-6 border border-gray-200">
                               <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><KeySquare size={18} className="text-indigo-500"/> Financial Sub-Ledger Control</h4>
                               <div className="space-y-4">
                                  <div>
                                     <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Set Coin Value</label>
                                     <input type="number" value={coins} onChange={(e) => setCoins(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 font-mono" />
                                  </div>
                                  <div>
                                     <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Set Cash Value (INR)</label>
                                     <input type="number" value={walletBalance} onChange={(e) => setWalletBalance(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 font-mono" />
                                  </div>
                                  <button onClick={() => updateBalance(selectedUser._id, coins, walletBalance)} className="w-full pt-2">
                                     <div className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg tracking-wide hover:bg-indigo-700 transition shadow-md flex justify-center items-center gap-2"><ArrowUpRight size={18} /> OVERRIDE LEDGER</div>
                                  </button>
                               </div>
                             </div>

                             {/* Purchase Log Matrix */}
                             <div className="bg-white rounded-2xl p-6 border border-gray-200 h-96 overflow-y-auto">
                                <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2 sticky top-0 bg-white z-10 pb-4 border-b border-gray-100"><FolderOpen size={18} className="text-gray-500"/> Transaction Pipeline History</h4>
                                <div className="space-y-4 pt-2">
                                  {orders.length > 0 ? orders.map((order) => (
                                    <div key={order._id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition">
                                      <div className="flex justify-between items-start mb-2">
                                        <p className="font-mono text-xs font-bold text-gray-500">#{order._id}</p>
                                        <p className="font-black text-gray-900">₹{order.amount}</p>
                                      </div>
                                      <div className="flex items-center gap-2 mb-3">
                                        <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded ${order.payment ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{order.payment ? 'PAID' : 'AWAITING AUTH'}</span>
                                        <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-gray-200 text-gray-700">{order.status}</span>
                                      </div>
                                      <p className="text-sm font-medium text-gray-600 truncate">{order.items.join(", ")}</p>
                                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Calendar size={12}/> {new Date(order.createdAt || order.date).toLocaleString()}</p>
                                    </div>
                                  )) : <p className="text-center text-gray-400 py-10 italic">Zero transaction footprints.</p>}
                                </div>
                             </div>

                           </div>
                         </td>
                       </tr>
                     )}
                   </React.Fragment>
                 ))}
                 {filteredUsers.length === 0 && !loading && (
                    <tr><td colSpan="3" className="p-8 text-center text-gray-400">Zero queries matched.</td></tr>
                 )}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default UserManagement;
