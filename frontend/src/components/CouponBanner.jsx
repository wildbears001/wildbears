import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { backendUrl } from '../context/ShopContext';

const CouponBanner = () => {
  const [coupons, setCoupons] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/coupons/all`);
        if (res.data?.success) {
          let active = res.data.coupons.filter(c => c.is_active);
          for (let i = active.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [active[i], active[j]] = [active[j], active[i]];
          }
          setCoupons(active);
        }
      } catch (err) {
        console.error("Error fetching coupons:", err);
      }
    };
    fetchCoupons();
  }, []);

  if (!coupons || coupons.length === 0) return null;

  return (
    <div className="bg-amber-100 text-[#6B4E2E] py-2 overflow-hidden border-b border-amber-200">
      <div className="whitespace-nowrap flex animate-marquee w-max">
        {[...coupons, ...coupons, ...coupons].map((coupon, idx) => (
          <span key={idx} className="font-medium uppercase flex items-center gap-2 mx-6">
            🏷️ Use Code <span className="bg-[#6B4E2E] text-white px-2 py-0.5 rounded shadow-sm tracking-wide">{coupon.code}</span>
            <span>
              for {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `₹${coupon.discount_value}`} OFF
            </span>
            {coupon.min_order > 0 && <span className="text-xs font-normal opacity-80">(Min Order: ₹{coupon.min_order})</span>}
            <span className="opacity-30 pl-6 text-xl">•</span>
          </span>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333333%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
};

export default CouponBanner;
