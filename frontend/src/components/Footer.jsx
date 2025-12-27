// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import { Link } from "react-router-dom";
// import { Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";

// const Footer = () => {
//   const [open, setOpen] = useState(null);

//   const toggle = (key) => {
//     setOpen(open === key ? null : key);
//   };

//   return (
//     <>
//       {/* SMALLER SPACE FROM PAGE */}
//       <div className="mt-20" />

//       <footer className="bg-[#D8BF91] text-[#6B4E2E] px-4 py-12">
//         {/* ================= DESKTOP ================= */}
//         <div className="hidden md:grid grid-cols-4 gap-10 max-w-7xl mx-auto text-sm">

//           {/* CONTACT */}
//           <div>
//             <h3 className="text-lg font-serif mb-4">Contact Us</h3>
//             <p className="flex items-center gap-2 mb-3">
//               <Phone size={14} /> +91 62818 74010
//             </p>
//             <p className="flex items-center gap-2 mb-3">
//               <Mail size={14} /> heven.storess@gmail.com
//             </p>
//             <p className="underline cursor-pointer">Store Locator</p>
//           </div>

//           {/* ABOUT */}
//           <div>
//             <h3 className="text-lg font-serif mb-4">About WILDBEARS</h3>
//             <ul className="space-y-2">
//               <li><Link to="/about">About Us</Link></li>
//               <li>Investor Information</li>
//               <li>In the News</li>
//               <li>Blog</li>
//               <li>Site Map</li>
//             </ul>
//           </div>

//           {/* ACCOUNT */}
//           <div>
//             <h3 className="text-lg font-serif mb-4">My Account</h3>
//             <ul className="space-y-2">
//               <li>My Profile</li>
//               <li>Orders</li>
//               <li>Wishlist</li>
//               <li>Track Your Order</li>
//             </ul>
//           </div>

//           {/* SUPPORT */}
//           <div>
//             <h3 className="text-lg font-serif mb-4">Customer Support</h3>
//             <ul className="space-y-2">
//               <li>FAQs</li>
//               <li>Contact</li>
//               <li>Returns & Refunds</li>
//               <li>Terms & Conditions</li>
//             </ul>
//           </div>
//         </div>

//         {/* ================= MOBILE ================= */}
//         <div className="md:hidden space-y-4">
//           {[
//             { key: "contact", title: "Contact Us" },
//             { key: "about", title: "About WILDBEARS" },
//             { key: "account", title: "My Account" },
//             { key: "support", title: "Customer Support" }
//           ].map(({ key, title }) => (
//             <div key={key} className="border-t border-[#6B4E2E]/30 pt-4">
//               <div
//                 className="flex justify-between items-center cursor-pointer"
//                 onClick={() => toggle(key)}
//               >
//                 <h3 className="text-base font-serif">{title}</h3>
//                 {open === key ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//               </div>

//               {open === key && (
//                 <ul className="mt-3 space-y-2 text-sm">
//                   {key === "contact" && (
//                     <>
//                       <li className="flex gap-2 items-center">
//                         <Phone size={14} /> +91 62818 74010
//                       </li>
//                       <li className="flex gap-2 items-center">
//                         <Mail size={14} /> heven.storess@gmail.com
//                       </li>
//                       <li className="underline">Store Locator</li>
//                     </>
//                   )}

//                   {key === "about" && (
//                     <>
//                       <li><Link to="/about">About Us</Link></li>
//                       <li>Investor Information</li>
//                       <li>Blog</li>
//                     </>
//                   )}

//                   {key === "account" && (
//                     <>
//                       <li>My Profile</li>
//                       <li>Orders</li>
//                       <li>Wishlist</li>
//                     </>
//                   )}

//                   {key === "support" && (
//                     <>
//                       <li>FAQs</li>
//                       <li>Returns & Refunds</li>
//                       <li>Terms & Conditions</li>
//                     </>
//                   )}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* ================= POLICY ================= */}
//         <div className="border-t border-[#6B4E2E]/30 mt-10 pt-6">
//           <div className="flex justify-center gap-20 text-center text-xs">
//             <div>
//               <img
//                 src={assets.exchange_icon}
//                 className="w-6 mx-auto mb-2"
//                 alt="Free Delivery"
//               />
//               <p className="font-medium">Free Delivery</p>
//             </div>

//             <div>
//               <img
//                 src={assets.support_img}
//                 className="w-6 mx-auto mb-2"
//                 alt="Secure Payment"
//               />
//               <p className="font-medium">Secure Payment</p>
//             </div>
//           </div>
//         </div>

//         {/* ================= LOGO ================= */}
//         <div className="border-t border-[#6B4E2E]/30 mt-6 pt-4 text-center text-xs">
//           <img
//             src={assets.logo}
//             alt="WILDBEARS"
//             className="mx-auto w-56 mb-4"
//           />
//           <p>© 2025 WILDBEARS. All Rights Reserved.</p>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;


import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const Footer = () => {
  const [open, setOpen] = useState(null);

  const toggle = (key) => {
    setOpen(open === key ? null : key);
  };

  return (
    <>
      {/* SMALLER SPACE FROM PAGE */}
      <div className="mt-20" />

      <footer className="bg-[#D8BF91] text-[#6B4E2E] px-4 py-12">
        {/* ================= DESKTOP ================= */}
        <div className="hidden md:grid grid-cols-4 gap-10 max-w-7xl mx-auto text-sm">

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-serif mb-4">Contact Us</h3>
            <p className="flex items-center gap-2 mb-3">
              <Phone size={14} /> +91 62818 74010
            </p>
            <p className="flex items-center gap-2 mb-3">
              <Mail size={14} /> heven.storess@gmail.com
            </p>
            <p className="underline cursor-pointer">Store Locator</p>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="text-lg font-serif mb-4">About WILDBEARS</h3>
            <ul className="space-y-2">
              <li><Link to="/about">About Us</Link></li>
              <li>Investor Information</li>
              <li>In the News</li>
              <li>Blog</li>
              <li>Site Map</li>
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <h3 className="text-lg font-serif mb-4">My Account</h3>
            <ul className="space-y-2">
              <li>My Profile</li>
              <li>Orders</li>
              <li>Wishlist</li>
              <li>Track Your Order</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-serif mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li>FAQs</li>
              <li>Contact</li>
              <li>Returns & Refunds</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden space-y-4">
          {[
            { key: "contact", title: "Contact Us" },
            { key: "about", title: "About WILDBEARS" },
            { key: "account", title: "My Account" },
            { key: "support", title: "Customer Support" }
          ].map(({ key, title }) => (
            <div key={key} className="border-t border-[#6B4E2E]/30 pt-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggle(key)}
              >
                <h3 className="text-base font-serif">{title}</h3>
                <span className="text-xl font-medium">
                  {open === key ? "−" : "+"}
                </span>
              </div>

              {open === key && (
                <ul className="mt-3 space-y-2 text-sm">
                  {key === "contact" && (
                    <>
                      <li className="flex gap-2 items-center">
                        <Phone size={14} /> +91 62818 74010
                      </li>
                      <li className="flex gap-2 items-center">
                        <Mail size={14} /> heven.storess@gmail.com
                      </li>
                      <li className="underline">Store Locator</li>
                    </>
                  )}

                  {key === "about" && (
                    <>
                      <li><Link to="/about">About Us</Link></li>
                      <li>Investor Information</li>
                      <li>Blog</li>
                    </>
                  )}

                  {key === "account" && (
                    <>
                      <li>My Profile</li>
                      <li>Orders</li>
                      <li>Wishlist</li>
                    </>
                  )}

                  {key === "support" && (
                    <>
                      <li>FAQs</li>
                      <li>Returns & Refunds</li>
                      <li>Terms & Conditions</li>
                    </>
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* ================= POLICY ================= */}
        <div className="border-t border-[#6B4E2E]/30 mt-10 pt-6">
          <div className="flex justify-center gap-20 text-center text-xs">
            <div>
              <img
                src={assets.exchange_icon}
                className="w-6 mx-auto mb-2"
                alt="Free Delivery"
              />
              <p className="font-medium">Free Delivery</p>
            </div>

            <div>
              <img
                src={assets.support_img}
                className="w-6 mx-auto mb-2"
                alt="Secure Payment"
              />
              <p className="font-medium">Secure Payment</p>
            </div>
          </div>
        </div>

        {/* ================= LOGO ================= */}
        <div className="border-t border-[#6B4E2E]/30 mt-6 pt-4 text-center text-xs">
          <img
            src={assets.logo}
            alt="WILDBEARS"
            className="mx-auto w-56 mb-4"
          />
          <p>© 2025 WILDBEARS. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
