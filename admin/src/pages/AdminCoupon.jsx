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
