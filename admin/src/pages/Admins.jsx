import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { Shield, Plus, Trash2, UserCog } from 'lucide-react';

const Admins = ({ token }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Add Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Manager');

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/admin/list`, { headers: { token } });
      if (res.data?.success) setAdmins(res.data.admins);
    } catch (err) {
      toast.error('Failed to load administrators');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [token]);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) return toast.error("Fill all fields");
    
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/admin/add`, { email, password, role }, { headers: { token } });
      if (res.data?.success) {
        toast.success(res.data.message);
        setEmail('');
        setPassword('');
        fetchAdmins();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if(!window.confirm("Are you sure you want to revoke this admin access?")) return;
    try {
      const res = await axios.post(`${backendUrl}/api/admin/delete`, { id }, { headers: { token } });
      if (res.data?.success) {
        toast.success("Administrator access revoked.");
        fetchAdmins();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
         <div className="w-12 h-12 bg-[#6B4E2E]/10 rounded-xl flex items-center justify-center text-[#6B4E2E]">
            <Shield size={24} />
         </div>
         <div>
           <h2 className="text-2xl font-bold tracking-tight text-gray-800">Admin Control</h2>
           <p className="text-sm text-gray-500 mt-1">Manage privileged roles and backend access</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD ADMIN FORM */}
        <div className="lg:col-span-1 bg-gray-50 rounded-xl p-6 border border-gray-100 h-fit">
           <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-6">
             <Plus size={18} /> Provision Access
           </h3>
           <form onSubmit={handleAddAdmin} className="space-y-4">
             <div>
               <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Email Address</label>
               <input 
                 type="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#6B4E2E]"
                 required
               />
             </div>
             <div>
               <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Secure Password</label>
               <input 
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#6B4E2E]"
                 required
               />
             </div>
             <div>
               <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Privilege Role</label>
               <select 
                 value={role}
                 onChange={(e) => setRole(e.target.value)}
                 className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#6B4E2E]"
               >
                 <option value="Manager">Manager</option>
                 <option value="Super Admin">Super Admin</option>
               </select>
             </div>
             <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 bg-[#6B4E2E] text-white font-bold rounded-lg hover:bg-[#5a422a] transition-colors shadow-lg shadow-[#6B4E2E]/20"
             >
               {loading ? "PROVISIONING..." : "CREATE ADMIN"}
             </button>
           </form>
        </div>

        {/* ADMIN LIST */}
        <div className="lg:col-span-2 space-y-4">
           {admins.length > 0 ? admins.map((admin) => (
             <div key={admin._id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 border border-gray-200">
                     <UserCog size={18} />
                   </div>
                   <div>
                     <p className="font-bold text-gray-800">{admin.email}</p>
                     <p className={`text-xs font-bold mt-1 px-2 py-0.5 rounded inline-block ${
                       admin.role === 'Super Admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                     }`}>{admin.role}</p>
                   </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                     <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Created</p>
                     <p className="text-sm font-medium text-gray-600">{new Date(admin.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteAdmin(admin._id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
             </div>
           )) : (
             <p className="text-gray-500 italic p-4 bg-gray-50 border border-dashed rounded-xl">No MongoDB admins currently initialized. Legacy .env Admin only.</p>
           )}
        </div>

      </div>
    </div>
  );
};

export default Admins;
