import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { TicketPercent, Tag, Filter, CheckCircle2, XCircle, Trash2, Calendar, ShoppingBag } from 'lucide-react';

const AdminCoupons = ({ token }) => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: '', 
    discount_type: 'flat', 
    discount_value: '', 
    min_order: '', 
    expires_at: '', 
    usage_limit: ''
  });

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/coupons/all`, { headers: { token } });
      setCoupons(res.data.coupons);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchCoupons(); }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/coupons/create`, form, { headers: { token } });
      if(res.data?.success) {
         toast.success("Coupon successfully provisioned");
         fetchCoupons();
         setForm({ code: '', discount_type: 'flat', discount_value: '', min_order: '', expires_at: '', usage_limit: '' });
      } else {
         toast.error(res.data.message);
      }
    } catch (err) { toast.error(err.response?.data?.message || err.message); }
  };

  const handleDisable = async (code) => {
    if(!window.confirm(`Are you sure you want to deactivate ${code}?`)) return;
    try {
      const res = await axios.post(`${backendUrl}/api/coupons/disable`, { code }, { headers: { token } });
      toast.success(res.data.message);
      fetchCoupons();
    } catch (err) { toast.error(err.response?.data?.message || err.message); }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
         <div className="w-12 h-12 bg-[#6B4E2E]/10 rounded-xl flex items-center justify-center text-[#6B4E2E]">
            <TicketPercent size={24} />
         </div>
         <div>
           <h2 className="text-2xl font-bold tracking-tight text-gray-800">Coupon Architect</h2>
           <p className="text-sm text-gray-500 mt-1">Design and manage promotional discount codes</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* CREATE COUPON FORM */}
        <div className="lg:col-span-1 bg-gray-50 rounded-xl border border-gray-200 p-6 h-fit">
           <h3 className="font-bold text-gray-800 text-base mb-5 flex items-center gap-2">
             <Filter size={18} /> Provision Code
           </h3>
           <form onSubmit={handleCreate} className="space-y-4">
             <div>
               <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">Promo Code</label>
               <input placeholder="Ex: WINTER50" value={form.code} onChange={e => setForm({...form, code:e.target.value.toUpperCase()})} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#6B4E2E] transition-all font-mono uppercase" required />
             </div>
             
             <div className="grid grid-cols-2 gap-3">
               <div>
                 <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">Type</label>
                 <select value={form.discount_type} onChange={e => setForm({...form, discount_type:e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#6B4E2E]" required>
                   <option value="flat">Flat (₹)</option>
                   <option value="percentage">Percent (%)</option>
                 </select>
               </div>
               <div>
                 <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">Value</label>
                 <input type="number" placeholder="Amt" value={form.discount_value} onChange={e => setForm({...form, discount_value:Number(e.target.value)})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#6B4E2E]" required />
               </div>
             </div>

             <div>
               <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">Cart Minimum</label>
               <input type="number" placeholder="Minimum spend required" value={form.min_order} onChange={e => setForm({...form, min_order:Number(e.target.value)})} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#6B4E2E]" />
             </div>

             <div>
               <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">Expiration Date</label>
               <input type="date" value={form.expires_at} onChange={e => setForm({...form, expires_at:e.target.value})} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#6B4E2E]" required />
             </div>

             <div>
               <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">Uses Limit</label>
               <input type="number" placeholder="Total available claims" value={form.usage_limit} onChange={e => setForm({...form, usage_limit:Number(e.target.value)})} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#6B4E2E]" required />
             </div>

             <button type="submit" className="w-full py-3 mt-2 bg-[#6B4E2E] text-white font-bold tracking-wide rounded-xl hover:bg-[#5a422a] transition-all shadow-md shadow-[#6B4E2E]/20">
               GENERATE COUPON
             </button>
           </form>
        </div>

        {/* LISTINGS DATA TABLE */}
        <div className="lg:col-span-3">
          <div className="overflow-x-auto rounded-xl border border-gray-200">
             <table className="w-full text-left bg-white">
               <thead className="bg-[#faf9f7] border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                 <tr>
                   <th className="px-6 py-4">Promo Code</th>
                   <th className="px-6 py-4">Value</th>
                   <th className="px-6 py-4">Conditions</th>
                   <th className="px-6 py-4">Usages</th>
                   <th className="px-6 py-4 text-center">Status</th>
                   <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {coupons.map(c => (
                   <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                     {/* 1. CODE */}
                     <td className="px-6 py-4">
                       <span className="font-mono font-bold text-[#6B4E2E] bg-amber-50 px-3 py-1.5 rounded-md border border-amber-100 inline-flex items-center gap-2">
                         <Tag size={14} /> {c.code}
                       </span>
                     </td>
                     
                     {/* 2. VALUE */}
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                       {c.discount_type === 'percentage' 
                         ? `${c.discount_value}% OFF` 
                         : `₹${c.discount_value} OFF`}
                     </td>

                     {/* 3. CONDITIONS */}
                     <td className="px-6 py-4 text-sm text-gray-500">
                       <div className="flex items-center gap-1.5 mb-1"><ShoppingBag size={14} /> &gt; ₹{c.min_order}</div>
                       <div className="flex items-center gap-1.5 text-xs"><Calendar size={14} /> {new Date(c.expires_at).toLocaleDateString()}</div>
                     </td>

                     {/* 4. USAGES */}
                     <td className="px-6 py-4">
                       <div className="flex flex-col gap-1">
                         <div className="flex justify-between text-xs font-bold text-gray-600">
                           <span>{c.times_used}</span>
                           <span>{c.usage_limit}</span>
                         </div>
                         <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                           <div className="bg-[#6B4E2E] h-1.5 rounded-full" style={{width: `${Math.min((c.times_used/c.usage_limit)*100, 100)}%`}}></div>
                         </div>
                       </div>
                     </td>

                     {/* 5. STATUS */}
                     <td className="px-6 py-4 text-center">
                       {c.is_active ? (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 border border-green-200 text-xs font-bold rounded-full">
                           <CheckCircle2 size={14} /> ACTIVE
                         </span>
                       ) : (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-full">
                           <XCircle size={14} /> VOID
                         </span>
                       )}
                     </td>

                     {/* 6. ACTION */}
                     <td className="px-6 py-4 text-right">
                       {c.is_active ? (
                         <button onClick={() => handleDisable(c.code)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-block" title="Deactivate Coupon">
                           <Trash2 size={18} />
                         </button>
                       ) : (
                         <span className="text-gray-400 text-xs font-bold italic">Disabled</span>
                       )}
                     </td>
                   </tr>
                 ))}
                 {coupons.length === 0 && (
                   <tr>
                     <td colSpan="6" className="px-6 py-12 text-center text-gray-500 italic">No promotions exist. Provision a new code to get started.</td>
                   </tr>
                 )}
               </tbody>
             </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminCoupons;
