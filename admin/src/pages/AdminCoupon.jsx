// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { backendUrl } from '../App';

// const AdminCouponPanel = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [newCoupon, setNewCoupon] = useState({
//     code: '',
//     discount_type: 'flat',
//     discount_value: '',
//     min_order_amount: '',
//     expiry_date: ''
//   });

//   const token = localStorage.getItem('token');

//   const fetchCoupons = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/api/coupon`, {
//         headers: { token },
//       });
//       setCoupons(res.data);
//     } catch (error) {
//       toast.error('Failed to fetch coupons');
//     }
//   };

//   const createCoupon = async () => {
//     try {
//       await axios.post(`${backendUrl}/api/coupon`, newCoupon);
//       toast.success('Coupon created successfully!');
//       fetchCoupons();
//       setNewCoupon({
//         code: '',
//         discount_type: 'flat',
//         discount_value: '',
//         min_order_amount: '',
//         expiry_date: ''
//       });
//     } catch (error) {
//       toast.error(error.response?.data?.error || 'Failed to create coupon');
//     }
//   };

//   const deleteCoupon = async (id) => {
//     try {
//       await axios.delete(`${backendUrl}/api/coupon/${id}`);
//       toast.success('Coupon deleted');
//       fetchCoupons();
//     } catch (error) {
//       toast.error('Failed to delete coupon');
//     }
//   };

//   useEffect(() => {
//     fetchCoupons();
//   }, []);

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Create New Coupon</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <input
//           placeholder="Code"
//           className="border p-2"
//           value={newCoupon.code}
//           onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
//         />
//         <select
//           className="border p-2"
//           value={newCoupon.discount_type}
//           onChange={(e) =>
//             setNewCoupon({ ...newCoupon, discount_type: e.target.value })
//           }
//         >
//           <option value="flat">Flat</option>
//           <option value="percentage">Percentage</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Discount Value"
//           className="border p-2"
//           value={newCoupon.discount_value}
//           onChange={(e) =>
//             setNewCoupon({ ...newCoupon, discount_value: e.target.value })
//           }
//         />
//         <input
//           type="number"
//           placeholder="Min Order Amount"
//           className="border p-2"
//           value={newCoupon.min_order_amount}
//           onChange={(e) =>
//             setNewCoupon({ ...newCoupon, min_order_amount: e.target.value })
//           }
//         />
//         <input
//           type="date"
//           className="border p-2"
//           value={newCoupon.expiry_date}
//           onChange={(e) =>
//             setNewCoupon({ ...newCoupon, expiry_date: e.target.value })
//           }
//         />
//         <button className="bg-black text-white p-2" onClick={createCoupon}>
//           Create Coupon
//         </button>
//       </div>

//       <h3 className="text-lg font-semibold mt-8 mb-4">Existing Coupons</h3>
//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr className="border-b">
//             <th className="p-2">Code</th>
//             <th className="p-2">Type</th>
//             <th className="p-2">Value</th>
//             <th className="p-2">Min</th>
//             <th className="p-2">Expires</th>
//             <th className="p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {coupons.map((coupon) => (
//             <tr key={coupon._id} className="border-b">
//               <td className="p-2">{coupon.code}</td>
//               <td className="p-2">{coupon.discount_type}</td>
//               <td className="p-2">{coupon.discount_value}</td>
//               <td className="p-2">{coupon.min_order_amount}</td>
//               <td className="p-2">
//                 {new Date(coupon.expiry_date).toLocaleDateString()}
//               </td>
//               <td className="p-2">
//                 <button
//                   onClick={() => deleteCoupon(coupon._id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminCouponPanel;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: '', 
    discount_type: 'flat', 
    discount_value: 0, 
    min_order: 0, 
    expires_at: '', 
    usage_limit: 1
  });

  const token = localStorage.getItem('adminToken'); // simple token storage

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/coupons/all`, { headers: { Authorization: `Bearer ${token}` } });
      setCoupons(res.data.coupons);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleCreate = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/coupons/create`, form, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(res.data.message);
      fetchCoupons();
    } catch (err) { toast.error(err.response?.data?.message || err.message); }
  };

  const handleDisable = async (code) => {
    try {
      const res = await axios.post(`${backendUrl}/api/coupons/disable`, { code }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(res.data.message);
      fetchCoupons();
    } catch (err) { toast.error(err.response?.data?.message || err.message); }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Coupon Management</h1>

      {/* Coupon Form */}
      <div className="mb-6 flex flex-wrap gap-2">
        <input
          name="code"
          placeholder="Code"
          value={form.code}
          onChange={e => setForm({...form, code:e.target.value})}
          className="border p-1"
        />

        <select
          name="discount_type"
          value={form.discount_type}
          onChange={e => setForm({...form, discount_type:e.target.value})}
          className="border p-1"
        >
          <option value="flat">Flat</option>
          <option value="percentage">Percentage</option>
        </select>

        <input
          name="discount_value"
          type="number"
          placeholder="Discount"
          value={form.discount_value}
          onChange={e => setForm({...form, discount_value:Number(e.target.value)})}
          className="border p-1"
        />

        <input
          name="min_order"
          type="number"
          placeholder="Min Order"
          value={form.min_order}
          onChange={e => setForm({...form, min_order:Number(e.target.value)})}
          className="border p-1"
        />

        <input
          name="expires_at"
          type="date"
          value={form.expires_at}
          onChange={e => setForm({...form, expires_at:e.target.value})}
          className="border p-1"
        />

        <input
          name="usage_limit"
          type="number"
          placeholder="Usage Limit"
          value={form.usage_limit}
          onChange={e => setForm({...form, usage_limit:Number(e.target.value)})}
          className="border p-1"
        />

        <button onClick={handleCreate} className="bg-black text-white px-3 py-1">Create</button>
      </div>

      {/* Coupons Table */}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Code</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Discount</th>
            <th className="border p-2">Min Order</th>
            <th className="border p-2">Expires</th>
            <th className="border p-2">Used</th>
            <th className="border p-2">Active</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map(c => (
            <tr key={c._id}>
              <td className="border p-2">{c.code}</td>
              <td className="border p-2">{c.discount_type}</td>
              <td className="border p-2">{c.discount_value}</td>
              <td className="border p-2">{c.min_order}</td>
              <td className="border p-2">{new Date(c.expires_at).toLocaleDateString()}</td>
              <td className="border p-2">{c.times_used}/{c.usage_limit}</td>
              <td className="border p-2">{c.is_active ? 'Yes' : 'No'}</td>
              <td className="border p-2">
                {c.is_active && <button onClick={() => handleDisable(c.code)} className="bg-red-500 text-white px-2 py-1">Disable</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCoupons;
