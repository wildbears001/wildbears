// // // // // // // // // import React from 'react'
// // // // // // // // // import { assets } from '../assets/assets'
// // // // // // // // // import { Link, NavLink } from 'react-router-dom'


   
// // // // // // // // // const Footer = () => {
// // // // // // // // //   function btnClick() {
// // // // // // // // //         window.open("https://www.instagram.com/heven_designs/?hl=en");
// // // // // // // // //     }
// // // // // // // // //   return (
// // // // // // // // //     <div>
// // // // // // // // //       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
// // // // // // // // //              <div>
// // // // // // // // //                 <img src={assets.logo} className='mb-5 w-32 ' alt="" />
// // // // // // // // //                 <p className='w-full md:w-2/3 text-gray-600'>At <b>HEVEN</b>, we redefine fashion with a perfect blend of 
// // // // // // // // //                 trend and comfort. Our collections embrace bold prints, timeless elegance, and sustainable fabrics, ensuring 
// // // // // // // // //                 you look and feel your best. From casual wear to statement pieces, we craft styles that empower confidence 
// // // // // // // // //                 and individuality. Join us in celebrating fashion that speaks to you!</p>
// // // // // // // // //              </div>

// // // // // // // // //              <div>
// // // // // // // // //                 <p className='text-xl font-medium mb-5 '>COMPANY</p>
// // // // // // // // //                 <ul className='flex flex-col gap-1 text-gray-600'>
// // // // // // // // //                     <li className='font-bold hover:text-yellow-600'><Link to='/' >Home</Link></li>
// // // // // // // // //                     <li className='font-bold hover:text-yellow-600'> <Link to='/contact'>About Us</Link></li>
// // // // // // // // //                     <li className='font-bold hover:text-yellow-600'><Link to='/orders'>Delivery</Link></li>
// // // // // // // // //                     <li className='font-bold hover:text-yellow-600'><Link to='/about'>Privacy Policy</Link></li>
// // // // // // // // //  <li className='font-bold hover:text-yellow-600'> <a href="https://www.instagram.com/heven_designs/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a></li>
// // // // // // // // //                 </ul>
// // // // // // // // //              </div>
// // // // // // // // //              <div>
// // // // // // // // //                 <p className='text-xl font-medium mb-5 '>GET IN TOUCH</p>
// // // // // // // // //                 <ul className='flex flex-col gap-1 text-gray-600'>
// // // // // // // // //                     <li>+91 6281874010</li>
// // // // // // // // //                     <li>heven.storess@gmail.com</li>

// // // // // // // // //                 </ul>
// // // // // // // // //              </div>
// // // // // // // // //       </div>
// // // // // // // // //         <div>
// // // // // // // // //             <hr />
// // // // // // // // //             <p className='py-5 text-sm text-center '>Copyright 2025 © heven.in.net - All Rights reserved</p>
// // // // // // // // //         </div>

// // // // // // // // //     </div>
// // // // // // // // //   )
// // // // // // // // // }

// // // // // // // // // export default Footer


// // // // // // // // import React, { useState } from "react";
// // // // // // // // import { assets } from "../assets/assets";
// // // // // // // // import { Link } from "react-router-dom";
// // // // // // // // import { Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";

// // // // // // // // const Footer = () => {
// // // // // // // //   const [open, setOpen] = useState(null);

// // // // // // // //   const toggle = (key) => {
// // // // // // // //     setOpen(open === key ? null : key);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <footer className="bg-[#D8BF91] text-[#6B4E2E] px-5 pt-16">
// // // // // // // //       {/* ================= NEWSLETTER ================= */}
// // // // // // // //       <div className="max-w-xl mx-auto text-center mb-14">
// // // // // // // //         <h2 className="text-2xl font-serif mb-2">
// // // // // // // //           Join HEVEN Club
// // // // // // // //         </h2>
// // // // // // // //         <p className="text-sm mb-5">
// // // // // // // //           Sign up to receive our newsletter and exclusive offers.
// // // // // // // //         </p>
// // // // // // // //         <input
// // // // // // // //           type="email"
// // // // // // // //           placeholder="Your email address"
// // // // // // // //           className="w-full border border-[#6B4E2E] bg-transparent px-4 py-3 mb-4 outline-none"
// // // // // // // //         />
// // // // // // // //         <button className="w-full bg-black text-white py-3 font-semibold">
// // // // // // // //           Subscribe
// // // // // // // //         </button>
// // // // // // // //       </div>

// // // // // // // //       {/* ================= CONTACT ================= */}
// // // // // // // //       <div className="border-t border-[#6B4E2E]/30 pt-8 pb-4">
// // // // // // // //         <div
// // // // // // // //           className="flex justify-between items-center cursor-pointer"
// // // // // // // //           onClick={() => toggle("contact")}
// // // // // // // //         >
// // // // // // // //           <h3 className="text-xl font-serif">Contact Us</h3>
// // // // // // // //           {open === "contact" ? <ChevronUp /> : <ChevronDown />}
// // // // // // // //         </div>

// // // // // // // //         {open === "contact" && (
// // // // // // // //           <div className="mt-4 space-y-3 text-sm">
// // // // // // // //             <p className="flex items-center gap-2">
// // // // // // // //               <Phone size={16} /> +91 62818 74010
// // // // // // // //             </p>
// // // // // // // //             <p className="flex items-center gap-2">
// // // // // // // //               <Mail size={16} /> heven.storess@gmail.com
// // // // // // // //             </p>
// // // // // // // //             <p className="underline cursor-pointer">Store Locator</p>
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </div>

// // // // // // // //       {/* ================= ABOUT ================= */}
// // // // // // // //       <div className="border-t border-[#6B4E2E]/30 py-4">
// // // // // // // //         <div
// // // // // // // //           className="flex justify-between items-center cursor-pointer"
// // // // // // // //           onClick={() => toggle("about")}
// // // // // // // //         >
// // // // // // // //           <h3 className="text-xl font-serif">About HEVEN</h3>
// // // // // // // //           {open === "about" ? <ChevronUp /> : <ChevronDown />}
// // // // // // // //         </div>

// // // // // // // //         {open === "about" && (
// // // // // // // //           <ul className="mt-4 space-y-2 text-sm">
// // // // // // // //             <li><Link to="/about">About Us</Link></li>
// // // // // // // //             <li>Investor Information</li>
// // // // // // // //             <li>In the News</li>
// // // // // // // //             <li>Blog</li>
// // // // // // // //             <li>Site Map</li>
// // // // // // // //           </ul>
// // // // // // // //         )}
// // // // // // // //       </div>

// // // // // // // //       {/* ================= ACCOUNT ================= */}
// // // // // // // //       <div className="border-t border-[#6B4E2E]/30 py-4">
// // // // // // // //         <div
// // // // // // // //           className="flex justify-between items-center cursor-pointer"
// // // // // // // //           onClick={() => toggle("account")}
// // // // // // // //         >
// // // // // // // //           <h3 className="text-xl font-serif">My Account</h3>
// // // // // // // //           {open === "account" ? <ChevronUp /> : <ChevronDown />}
// // // // // // // //         </div>

// // // // // // // //         {open === "account" && (
// // // // // // // //           <ul className="mt-4 space-y-2 text-sm">
// // // // // // // //             <li>Login</li>
// // // // // // // //             <li>Orders</li>
// // // // // // // //             <li>Wishlist</li>
// // // // // // // //           </ul>
// // // // // // // //         )}
// // // // // // // //       </div>

// // // // // // // //       {/* ================= SUPPORT ================= */}
// // // // // // // //       <div className="border-t border-[#6B4E2E]/30 py-4">
// // // // // // // //         <div
// // // // // // // //           className="flex justify-between items-center cursor-pointer"
// // // // // // // //           onClick={() => toggle("support")}
// // // // // // // //         >
// // // // // // // //           <h3 className="text-xl font-serif">Customer Support</h3>
// // // // // // // //           {open === "support" ? <ChevronUp /> : <ChevronDown />}
// // // // // // // //         </div>

// // // // // // // //         {open === "support" && (
// // // // // // // //           <ul className="mt-4 space-y-2 text-sm">
// // // // // // // //             <li>FAQs</li>
// // // // // // // //             <li>Shipping & Returns</li>
// // // // // // // //             <li>Privacy Policy</li>
// // // // // // // //             <li>Terms & Conditions</li>
// // // // // // // //           </ul>
// // // // // // // //         )}
// // // // // // // //       </div>

// // // // // // // //       {/* ================= BOTTOM ================= */}
// // // // // // // //       <div className="border-t border-[#6B4E2E]/30 mt-10 pt-6 text-center text-xs">
// // // // // // // //         <img
// // // // // // // //           src={assets.logo}
// // // // // // // //           alt="HEVEN"
// // // // // // // //           className="mx-auto w-24 mb-4"
// // // // // // // //         />
// // // // // // // //         <p>© 2025 HEVEN. All Rights Reserved.</p>
// // // // // // // //       </div>
// // // // // // // //     </footer>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Footer;


// // // // // // // import React, { useState } from "react";
// // // // // // // import { assets } from "../assets/assets";
// // // // // // // import { Link } from "react-router-dom";
// // // // // // // import { Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";

// // // // // // // const Footer = () => {
// // // // // // //   const [open, setOpen] = useState(null);

// // // // // // //   const toggle = (key) => {
// // // // // // //     setOpen(open === key ? null : key);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <footer className="bg-[#4A2F1A] text-[#6B4E2E] px-5 pt-12">
// // // // // // //       {/* ================= CONTACT ================= */}
// // // // // // //       <div className="border-t border-[#6B4E2E]/30 pt-8 pb-4">
// // // // // // //         <div
// // // // // // //           className="flex justify-between items-center cursor-pointer"
// // // // // // //           onClick={() => toggle("contact")}
// // // // // // //         >
// // // // // // //           <h3 className="text-xl font-serif">Contact Us</h3>
// // // // // // //           {open === "contact" ? <ChevronUp /> : <ChevronDown />}
// // // // // // //         </div>

// // // // // // //         {open === "contact" && (
// // // // // // //           <div className="mt-4 space-y-3 text-sm">
// // // // // // //             <p className="flex items-center gap-2">
// // // // // // //               <Phone size={16} /> +91 62818 74010
// // // // // // //             </p>
// // // // // // //             <p className="flex items-center gap-2">
// // // // // // //               <Mail size={16} /> heven.storess@gmail.com
// // // // // // //             </p>
// // // // // // //             <p className="underline cursor-pointer">Store Locator</p>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       {/* ================= ABOUT ================= */}
// // // // // // //       <div className="border-t border-[#6B4E2E]/30 py-4">
// // // // // // //         <div
// // // // // // //           className="flex justify-between items-center cursor-pointer"
// // // // // // //           onClick={() => toggle("about")}
// // // // // // //         >
// // // // // // //           <h3 className="text-xl font-serif">About HEVEN</h3>
// // // // // // //           {open === "about" ? <ChevronUp /> : <ChevronDown />}
// // // // // // //         </div>

// // // // // // //         {open === "about" && (
// // // // // // //           <ul className="mt-4 space-y-2 text-sm">
// // // // // // //             <li><Link to="/about">About Us</Link></li>
// // // // // // //             <li>Investor Information</li>
// // // // // // //             <li>In the News</li>
// // // // // // //             <li>Blog</li>
// // // // // // //             <li>Site Map</li>
// // // // // // //           </ul>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       {/* ================= ACCOUNT ================= */}
// // // // // // //       <div className="border-t border-[#6B4E2E]/30 py-4">
// // // // // // //         <div
// // // // // // //           className="flex justify-between items-center cursor-pointer"
// // // // // // //           onClick={() => toggle("account")}
// // // // // // //         >
// // // // // // //           <h3 className="text-xl font-serif">My Account</h3>
// // // // // // //           {open === "account" ? <ChevronUp /> : <ChevronDown />}
// // // // // // //         </div>

// // // // // // //         {open === "account" && (
// // // // // // //           <ul className="mt-4 space-y-2 text-sm">
// // // // // // //             <li>Login</li>
// // // // // // //             <li>Orders</li>
// // // // // // //             <li>Wishlist</li>
// // // // // // //           </ul>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       {/* ================= SUPPORT ================= */}
// // // // // // //       <div className="border-t border-[#6B4E2E]/30 py-4">
// // // // // // //         <div
// // // // // // //           className="flex justify-between items-center cursor-pointer"
// // // // // // //           onClick={() => toggle("support")}
// // // // // // //         >
// // // // // // //           <h3 className="text-xl font-serif">Customer Support</h3>
// // // // // // //           {open === "support" ? <ChevronUp /> : <ChevronDown />}
// // // // // // //         </div>

// // // // // // //         {open === "support" && (
// // // // // // //           <ul className="mt-4 space-y-2 text-sm">
// // // // // // //             <li>FAQs</li>
// // // // // // //             <li>Shipping & Returns</li>
// // // // // // //             <li>Privacy Policy</li>
// // // // // // //             <li>Terms & Conditions</li>
// // // // // // //           </ul>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       {/* ================= BOTTOM ================= */}
// // // // // // //       <div className="border-t border-[#6B4E2E]/30 mt-10 pt-8 text-center text-xs">
// // // // // // //         <img
// // // // // // //           src={assets.logo}
// // // // // // //           alt="HEVEN"
// // // // // // //           className="mx-auto w-40 mb-5"
// // // // // // //         />
// // // // // // //         <p>© 2025 HEVEN. All Rights Reserved.</p>
// // // // // // //       </div>
// // // // // // //     </footer>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Footer;


// // // // // // import React, { useState } from "react";
// // // // // // import { assets } from "../assets/assets";
// // // // // // import { Link } from "react-router-dom";
// // // // // // import { Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";

// // // // // // const Footer = () => {
// // // // // //   const [open, setOpen] = useState(null);

// // // // // //   const toggle = (key) => {
// // // // // //     setOpen(open === key ? null : key);
// // // // // //   };

// // // // // //   return (
// // // // // //     <footer className="bg-[#D8BF91] text-[#6B4E2E] px-6 pt-16">
// // // // // //       {/* ================= DESKTOP VIEW ================= */}
// // // // // //       <div className="hidden md:grid grid-cols-4 gap-12 max-w-7xl mx-auto text-sm">
// // // // // //         {/* CONTACT */}
// // // // // //         <div>
// // // // // //           <h3 className="text-xl font-serif mb-4">Contact Us</h3>
// // // // // //           <p className="flex items-center gap-2 mb-3">
// // // // // //             <Phone size={16} /> +91 62818 74010
// // // // // //           </p>
// // // // // //           <p className="flex items-center gap-2 mb-3">
// // // // // //             <Mail size={16} /> heven.storess@gmail.com
// // // // // //           </p>
// // // // // //           <p className="cursor-pointer underline">Store Locator</p>
// // // // // //         </div>

// // // // // //         {/* ABOUT */}
// // // // // //         <div>
// // // // // //           <h3 className="text-xl font-serif mb-4">About HEVEN</h3>
// // // // // //           <ul className="space-y-2">
// // // // // //             <li><Link to="/about">About Us</Link></li>
// // // // // //             <li>Investor Information</li>
// // // // // //             <li>In the News</li>
// // // // // //             <li>Blog</li>
// // // // // //             <li>Site Map</li>
// // // // // //           </ul>
// // // // // //         </div>

// // // // // //         {/* ACCOUNT */}
// // // // // //         <div>
// // // // // //           <h3 className="text-xl font-serif mb-4">My Account</h3>
// // // // // //           <ul className="space-y-2">
// // // // // //             <li>My Profile</li>
// // // // // //             <li>Orders</li>
// // // // // //             <li>Wishlist</li>
// // // // // //             <li>Track Your Order</li>
// // // // // //           </ul>
// // // // // //         </div>

// // // // // //         {/* SUPPORT */}
// // // // // //         <div>
// // // // // //           <h3 className="text-xl font-serif mb-4">Customer Support</h3>
// // // // // //           <ul className="space-y-2">
// // // // // //             <li>FAQs</li>
// // // // // //             <li>Contact</li>
// // // // // //             <li>Cancellation, Returns & Refunds</li>
// // // // // //             <li>Terms & Conditions</li>
// // // // // //           </ul>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* ================= MOBILE VIEW ================= */}
// // // // // //       <div className="md:hidden">
// // // // // //         {/* CONTACT */}
// // // // // //         <div className="border-t border-[#6B4E2E]/30 py-4">
// // // // // //           <div
// // // // // //             className="flex justify-between items-center"
// // // // // //             onClick={() => toggle("contact")}
// // // // // //           >
// // // // // //             <h3 className="text-xl font-serif">Contact Us</h3>
// // // // // //             {open === "contact" ? <ChevronUp /> : <ChevronDown />}
// // // // // //           </div>
// // // // // //           {open === "contact" && (
// // // // // //             <div className="mt-4 space-y-3 text-sm">
// // // // // //               <p className="flex items-center gap-2">
// // // // // //                 <Phone size={16} /> +91 62818 74010
// // // // // //               </p>
// // // // // //               <p className="flex items-center gap-2">
// // // // // //                 <Mail size={16} /> heven.storess@gmail.com
// // // // // //               </p>
// // // // // //               <p className="underline">Store Locator</p>
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* ABOUT */}
// // // // // //         <div className="border-t border-[#6B4E2E]/30 py-4">
// // // // // //           <div
// // // // // //             className="flex justify-between items-center"
// // // // // //             onClick={() => toggle("about")}
// // // // // //           >
// // // // // //             <h3 className="text-xl font-serif">About HEVEN</h3>
// // // // // //             {open === "about" ? <ChevronUp /> : <ChevronDown />}
// // // // // //           </div>
// // // // // //           {open === "about" && (
// // // // // //             <ul className="mt-4 space-y-2 text-sm">
// // // // // //               <li><Link to="/about">About Us</Link></li>
// // // // // //               <li>Investor Information</li>
// // // // // //               <li>In the News</li>
// // // // // //               <li>Blog</li>
// // // // // //               <li>Site Map</li>
// // // // // //             </ul>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* ACCOUNT */}
// // // // // //         <div className="border-t border-[#6B4E2E]/30 py-4">
// // // // // //           <div
// // // // // //             className="flex justify-between items-center"
// // // // // //             onClick={() => toggle("account")}
// // // // // //           >
// // // // // //             <h3 className="text-xl font-serif">My Account</h3>
// // // // // //             {open === "account" ? <ChevronUp /> : <ChevronDown />}
// // // // // //           </div>
// // // // // //           {open === "account" && (
// // // // // //             <ul className="mt-4 space-y-2 text-sm">
// // // // // //               <li>My Profile</li>
// // // // // //               <li>Orders</li>
// // // // // //               <li>Wishlist</li>
// // // // // //               <li>Track Your Order</li>
// // // // // //             </ul>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* SUPPORT */}
// // // // // //         <div className="border-t border-[#6B4E2E]/30 py-4">
// // // // // //           <div
// // // // // //             className="flex justify-between items-center"
// // // // // //             onClick={() => toggle("support")}
// // // // // //           >
// // // // // //             <h3 className="text-xl font-serif">Customer Support</h3>
// // // // // //             {open === "support" ? <ChevronUp /> : <ChevronDown />}
// // // // // //           </div>
// // // // // //           {open === "support" && (
// // // // // //             <ul className="mt-4 space-y-2 text-sm">
// // // // // //               <li>FAQs</li>
// // // // // //               <li>Contact</li>
// // // // // //               <li>Cancellation, Returns & Refunds</li>
// // // // // //               <li>Terms & Conditions</li>
// // // // // //             </ul>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* ================= BOTTOM ================= */}
// // // // // //       <div className="border-t border-[#6B4E2E]/30 mt-12 pt-8 text-center text-xs">
// // // // // //         <img
// // // // // //           src={assets.logo}
// // // // // //           alt="HEVEN"
// // // // // //           className="mx-auto w-44 mb-5"
// // // // // //         />
// // // // // //         <p>© 2025 HEVEN. All Rights Reserved.</p>
// // // // // //       </div>
// // // // // //     </footer>
// // // // // //   );
// // // // // // };

// // // // // // export default Footer;



// // // // // import React, { useState } from "react";
// // // // // import { assets } from "../assets/assets";
// // // // // import { Link } from "react-router-dom";
// // // // // import { Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";

// // // // // const Footer = () => {
// // // // //   const [open, setOpen] = useState(null);

// // // // //   const toggle = (key) => {
// // // // //     setOpen(open === key ? null : key);
// // // // //   };

// // // // //   return (
// // // // //     <footer className="bg-[#D8BF91] text-[#6B4E2E] px-6 pt-16">

// // // // //       {/* ================= POLICY ROW ================= */}
// // // // //       <div className="max-w-7xl mx-auto border-b border-[#6B4E2E]/30 pb-10 mb-12">
// // // // //         <div className="flex flex-col sm:flex-row justify-around gap-10 text-center">
          
// // // // //           <div>
// // // // //             <img
// // // // //               src={assets.exchange_icon}
// // // // //               className="w-12 mx-auto mb-3"
// // // // //               alt="Free Delivery"
// // // // //             />
// // // // //             <p className="font-semibold">Free Delivery</p>
// // // // //             <p className="text-sm opacity-80">On all eligible orders</p>
// // // // //           </div>

// // // // //           <div>
// // // // //             <img
// // // // //               src={assets.quality_icon}
// // // // //               className="w-12 mx-auto mb-3"
// // // // //               alt="Easy Returns"
// // // // //             />
// // // // //             <p className="font-semibold">Easy Returns</p>
// // // // //             <p className="text-sm opacity-80">Hassle-free returns</p>
// // // // //           </div>

// // // // //           <div>
// // // // //             <img
// // // // //               src={assets.support_img}
// // // // //               className="w-12 mx-auto mb-3"
// // // // //               alt="Secure Payment"
// // // // //             />
// // // // //             <p className="font-semibold">Secure Payment</p>
// // // // //             <p className="text-sm opacity-80">100% safe checkout</p>
// // // // //           </div>

// // // // //         </div>
// // // // //       </div>

// // // // //       {/* ================= DESKTOP FOOTER ================= */}
// // // // //       <div className="hidden md:grid grid-cols-4 gap-12 max-w-7xl mx-auto text-sm">

// // // // //         {/* CONTACT */}
// // // // //         <div>
// // // // //           <h3 className="text-xl font-serif mb-4">Contact Us</h3>
// // // // //           <p className="flex items-center gap-2 mb-3">
// // // // //             <Phone size={16} /> +91 62818 74010
// // // // //           </p>
// // // // //           <p className="flex items-center gap-2 mb-3">
// // // // //             <Mail size={16} /> heven.storess@gmail.com
// // // // //           </p>
// // // // //           <p className="cursor-pointer underline">Store Locator</p>
// // // // //         </div>

// // // // //         {/* ABOUT */}
// // // // //         <div>
// // // // //           <h3 className="text-xl font-serif mb-4">About HEVEN</h3>
// // // // //           <ul className="space-y-2">
// // // // //             <li><Link to="/about">About Us</Link></li>
// // // // //             <li>Investor Information</li>
// // // // //             <li>In the News</li>
// // // // //             <li>Blog</li>
// // // // //             <li>Site Map</li>
// // // // //           </ul>
// // // // //         </div>

// // // // //         {/* ACCOUNT */}
// // // // //         <div>
// // // // //           <h3 className="text-xl font-serif mb-4">My Account</h3>
// // // // //           <ul className="space-y-2">
// // // // //             <li>My Profile</li>
// // // // //             <li>Orders</li>
// // // // //             <li>Wishlist</li>
// // // // //             <li>Track Your Order</li>
// // // // //           </ul>
// // // // //         </div>

// // // // //         {/* SUPPORT */}
// // // // //         <div>
// // // // //           <h3 className="text-xl font-serif mb-4">Customer Support</h3>
// // // // //           <ul className="space-y-2">
// // // // //             <li>FAQs</li>
// // // // //             <li>Contact</li>
// // // // //             <li>Cancellation, Returns & Refunds</li>
// // // // //             <li>Terms & Conditions</li>
// // // // //           </ul>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* ================= MOBILE FOOTER ================= */}
// // // // //       <div className="md:hidden">

// // // // //         {[
// // // // //           { key: "contact", title: "Contact Us", content: (
// // // // //             <>
// // // // //               <p className="flex items-center gap-2">
// // // // //                 <Phone size={16} /> +91 62818 74010
// // // // //               </p>
// // // // //               <p className="flex items-center gap-2">
// // // // //                 <Mail size={16} /> heven.storess@gmail.com
// // // // //               </p>
// // // // //               <p className="underline">Store Locator</p>
// // // // //             </>
// // // // //           )},
// // // // //           { key: "about", title: "About HEVEN", content: (
// // // // //             <>
// // // // //               <Link to="/about">About Us</Link>
// // // // //               <p>Investor Information</p>
// // // // //               <p>In the News</p>
// // // // //               <p>Blog</p>
// // // // //               <p>Site Map</p>
// // // // //             </>
// // // // //           )},
// // // // //           { key: "account", title: "My Account", content: (
// // // // //             <>
// // // // //               <p>My Profile</p>
// // // // //               <p>Orders</p>
// // // // //               <p>Wishlist</p>
// // // // //               <p>Track Your Order</p>
// // // // //             </>
// // // // //           )},
// // // // //           { key: "support", title: "Customer Support", content: (
// // // // //             <>
// // // // //               <p>FAQs</p>
// // // // //               <p>Contact</p>
// // // // //               <p>Cancellation, Returns & Refunds</p>
// // // // //               <p>Terms & Conditions</p>
// // // // //             </>
// // // // //           )}
// // // // //         ].map(({ key, title, content }) => (
// // // // //           <div key={key} className="border-t border-[#6B4E2E]/30 py-4">
// // // // //             <div
// // // // //               className="flex justify-between items-center"
// // // // //               onClick={() => toggle(key)}
// // // // //             >
// // // // //               <h3 className="text-xl font-serif">{title}</h3>
// // // // //               {open === key ? <ChevronUp /> : <ChevronDown />}
// // // // //             </div>
// // // // //             {open === key && (
// // // // //               <div className="mt-4 space-y-2 text-sm">{content}</div>
// // // // //             )}
// // // // //           </div>
// // // // //         ))}

// // // // //       </div>

// // // // //       {/* ================= BOTTOM ================= */}
// // // // //       <div className="border-t border-[#6B4E2E]/30 mt-12 pt-8 text-center text-xs">
// // // // //         <img
// // // // //           src={assets.logo}
// // // // //           alt="HEVEN"
// // // // //           className="mx-auto w-44 mb-5"
// // // // //         />
// // // // //         <p>© 2025 HEVEN. All Rights Reserved.</p>
// // // // //       </div>

// // // // //     </footer>
// // // // //   );
// // // // // };

// // // // // export default Footer;


// // // // import React, { useState } from "react";
// // // // import { assets } from "../assets/assets";
// // // // import { Link } from "react-router-dom";
// // // // import { Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";

// // // // const Footer = () => {
// // // //   const [open, setOpen] = useState(null);

// // // //   const toggle = (key) => {
// // // //     setOpen(open === key ? null : key);
// // // //   };

// // // //   return (
// // // //     <footer className="bg-[#D8BF91] text-[#6B4E2E] px-6 pt-16">
// // // //       {/* ================= DESKTOP VIEW ================= */}
// // // //       <div className="hidden md:grid grid-cols-4 gap-12 max-w-7xl mx-auto text-sm">
// // // //         {/* CONTACT */}
// // // //         <div>
// // // //           <h3 className="text-xl font-serif mb-4">Contact Us</h3>
// // // //           <p className="flex items-center gap-2 mb-3">
// // // //             <Phone size={16} /> +91 62818 74010
// // // //           </p>
// // // //           <p className="flex items-center gap-2 mb-3">
// // // //             <Mail size={16} /> heven.storess@gmail.com
// // // //           </p>
// // // //           <p className="cursor-pointer underline">Store Locator</p>
// // // //         </div>

// // // //         {/* ABOUT */}
// // // //         <div>
// // // //           <h3 className="text-xl font-serif mb-4">About WILDBEARS</h3>
// // // //           <ul className="space-y-2">
// // // //             <li><Link to="/about">About Us</Link></li>
// // // //             <li>Investor Information</li>
// // // //             <li>In the News</li>
// // // //             <li>Blog</li>
// // // //             <li>Site Map</li>
// // // //           </ul>
// // // //         </div>

// // // //         {/* ACCOUNT */}
// // // //         <div>
// // // //           <h3 className="text-xl font-serif mb-4">My Account</h3>
// // // //           <ul className="space-y-2">
// // // //             <li>My Profile</li>
// // // //             <li>Orders</li>
// // // //             <li>Wishlist</li>
// // // //             <li>Track Your Order</li>
// // // //           </ul>
// // // //         </div>

// // // //         {/* SUPPORT */}
// // // //         <div>
// // // //           <h3 className="text-xl font-serif mb-4">Customer Support</h3>
// // // //           <ul className="space-y-2">
// // // //             <li>FAQs</li>
// // // //             <li>Contact</li>
// // // //             <li>Cancellation, Returns & Refunds</li>
// // // //             <li>Terms & Conditions</li>
// // // //           </ul>
// // // //         </div>
// // // //       </div>

// // // //       {/* ================= MOBILE VIEW ================= */}
// // // //       <div className="md:hidden">
// // // //         {["contact", "about", "account", "support"].map((section) => (
// // // //           <div key={section} className="border-t border-[#6B4E2E]/30 py-4">
// // // //             <div
// // // //               className="flex justify-between items-center"
// // // //               onClick={() => toggle(section)}
// // // //             >
// // // //               <h3 className="text-xl font-serif capitalize">
// // // //                 {section === "contact" && "Contact Us"}
// // // //                 {section === "about" && "About WILDBEARS"}
// // // //                 {section === "account" && "My Account"}
// // // //                 {section === "support" && "Customer Support"}
// // // //               </h3>
// // // //               {open === section ? <ChevronUp /> : <ChevronDown />}
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       {/* ================= POLICY ROW ================= */}
// // // //       <div className="border-t border-[#6B4E2E]/30 mt-12 pt-6">
// // // //         <div className="flex justify-center gap-16 text-center text-xs">
// // // //           <div>
// // // //             <img
// // // //               src={assets.exchange_icon}
// // // //               className="w-9 mx-auto mb-2"
// // // //               alt="Free Delivery"
// // // //             />
// // // //             <p className="font-medium">Free Delivery</p>
// // // //           </div>

// // // //           <div>
// // // //             <img
// // // //               src={assets.support_img}
// // // //               className="w-9 mx-auto mb-2"
// // // //               alt="Secure Payment"
// // // //             />
// // // //             <p className="font-medium">Secure Payment</p>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* ================= LOGO & COPYRIGHT ================= */}
// // // //       <div className="border-t border-[#6B4E2E]/30 mt-8 pt-8 text-center text-xs">
// // // //         <img
// // // //           src={assets.logo}
// // // //           alt="WILDBEARS"
// // // //           className="mx-auto w-88 mb-8"
// // // //         />
// // // //         <p>© 2025 WILDBEARS. All Rights Reserved.</p>
// // // //       </div>
// // // //     </footer>
// // // //   );
// // // // };

// // // // export default Footer;


// // // import React, { useState } from "react";
// // // import { assets } from "../assets/assets";
// // // import { Link } from "react-router-dom";
// // // import { Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";

// // // const Footer = () => {
// // //   const [open, setOpen] = useState(null);

// // //   const toggle = (key) => {
// // //     setOpen(open === key ? null : key);
// // //   };

// // //   return (
// // //     <footer className="bg-[#D8BF91] text-[#6B4E2E] px-6 pt-16">
// // //       {/* ================= DESKTOP VIEW ================= */}
// // //       <div className="hidden md:grid grid-cols-4 gap-12 max-w-7xl mx-auto text-sm">
// // //         {/* CONTACT */}
// // //         <div>
// // //           <h3 className="text-xl font-serif mb-4">Contact Us</h3>
// // //           <p className="flex items-center gap-2 mb-3">
// // //             <Phone size={16} /> +91 62818 74010
// // //           </p>
// // //           <p className="flex items-center gap-2 mb-3">
// // //             <Mail size={16} /> heven.storess@gmail.com
// // //           </p>
// // //           <p className="cursor-pointer underline">Store Locator</p>
// // //         </div>

// // //         {/* ABOUT */}
// // //         <div>
// // //           <h3 className="text-xl font-serif mb-4">About WILDBEARS</h3>
// // //           <ul className="space-y-2">
// // //             <li><Link to="/about">About Us</Link></li>
// // //             <li>Investor Information</li>
// // //             <li>In the News</li>
// // //             <li>Blog</li>
// // //             <li>Site Map</li>
// // //           </ul>
// // //         </div>

// // //         {/* ACCOUNT */}
// // //         <div>
// // //           <h3 className="text-xl font-serif mb-4">My Account</h3>
// // //           <ul className="space-y-2">
// // //             <li>My Profile</li>
// // //             <li>Orders</li>
// // //             <li>Wishlist</li>
// // //             <li>Track Your Order</li>
// // //           </ul>
// // //         </div>

// // //         {/* SUPPORT */}
// // //         <div>
// // //           <h3 className="text-xl font-serif mb-4">Customer Support</h3>
// // //           <ul className="space-y-2">
// // //             <li>FAQs</li>
// // //             <li>Contact</li>
// // //             <li>Cancellation, Returns & Refunds</li>
// // //             <li>Terms & Conditions</li>
// // //           </ul>
// // //         </div>
// // //       </div>

// // //       {/* ================= MOBILE VIEW ================= */}
// // //       <div className="md:hidden">
// // //         {/* CONTACT */}
// // //         <div className="border-t border-[#6B4E2E]/30 py-4">
// // //           <div
// // //             className="flex justify-between items-center"
// // //             onClick={() => toggle("contact")}
// // //           >
// // //             <h3 className="text-xl font-serif">Contact Us</h3>
// // //             {open === "contact" ? <ChevronUp /> : <ChevronDown />}
// // //           </div>

// // //           {open === "contact" && (
// // //             <div className="mt-4 space-y-3 text-sm">
// // //               <p className="flex items-center gap-2">
// // //                 <Phone size={16} /> +91 62818 74010
// // //               </p>
// // //               <p className="flex items-center gap-2">
// // //                 <Mail size={16} /> heven.storess@gmail.com
// // //               </p>
// // //               <p className="underline cursor-pointer">Store Locator</p>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* ABOUT */}
// // //         <div className="border-t border-[#6B4E2E]/30 py-4">
// // //           <div
// // //             className="flex justify-between items-center"
// // //             onClick={() => toggle("about")}
// // //           >
// // //             <h3 className="text-xl font-serif">About WILDBEARS</h3>
// // //             {open === "about" ? <ChevronUp /> : <ChevronDown />}
// // //           </div>

// // //           {open === "about" && (
// // //             <ul className="mt-4 space-y-2 text-sm">
// // //               <li><Link to="/about">About Us</Link></li>
// // //               <li>Investor Information</li>
// // //               <li>In the News</li>
// // //               <li>Blog</li>
// // //               <li>Site Map</li>
// // //             </ul>
// // //           )}
// // //         </div>

// // //         {/* ACCOUNT */}
// // //         <div className="border-t border-[#6B4E2E]/30 py-4">
// // //           <div
// // //             className="flex justify-between items-center"
// // //             onClick={() => toggle("account")}
// // //           >
// // //             <h3 className="text-xl font-serif">My Account</h3>
// // //             {open === "account" ? <ChevronUp /> : <ChevronDown />}
// // //           </div>

// // //           {open === "account" && (
// // //             <ul className="mt-4 space-y-2 text-sm">
// // //               <li>My Profile</li>
// // //               <li>Orders</li>
// // //               <li>Wishlist</li>
// // //               <li>Track Your Order</li>
// // //             </ul>
// // //           )}
// // //         </div>

// // //         {/* SUPPORT */}
// // //         <div className="border-t border-[#6B4E2E]/30 py-4">
// // //           <div
// // //             className="flex justify-between items-center"
// // //             onClick={() => toggle("support")}
// // //           >
// // //             <h3 className="text-xl font-serif">Customer Support</h3>
// // //             {open === "support" ? <ChevronUp /> : <ChevronDown />}
// // //           </div>

// // //           {open === "support" && (
// // //             <ul className="mt-4 space-y-2 text-sm">
// // //               <li>FAQs</li>
// // //               <li>Contact</li>
// // //               <li>Cancellation, Returns & Refunds</li>
// // //               <li>Terms & Conditions</li>
// // //             </ul>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* ================= POLICY ROW ================= */}
// // //       <div className="border-t border-[#6B4E2E]/30 mt-12 pt-6">
// // //         <div className="flex justify-center gap-20 text-center text-xs">
// // //           <div>
// // //             <img
// // //               src={assets.exchange_icon}
// // //               className="w-9 mx-auto mb-2"
// // //               alt="Free Delivery"
// // //             />
// // //             <p className="font-medium">Free Delivery</p>
// // //           </div>

// // //           <div>
// // //             <img
// // //               src={assets.support_img}
// // //               className="w-9 mx-auto mb-2"
// // //               alt="Secure Payment"
// // //             />
// // //             <p className="font-medium">Secure Payment</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* ================= LOGO & COPYRIGHT ================= */}
// // //       <div className="border-t border-[#6B4E2E]/30 mt-8 pt-8 text-center text-xs">
// // //         <img
// // //           src={assets.logo}
// // //           alt="WILDBEARS"
// // //           className="mx-auto w-80 mb-8"
// // //         />
// // //         <p>© 2025 WILDBEARS. All Rights Reserved.</p>
// // //       </div>
// // //     </footer>
// // //   );
// // // };

// // // export default Footer;



// // import React, { useState } from "react";
// // import { assets } from "../assets/assets";
// // import { Link } from "react-router-dom";
// // import { Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";

// // const Footer = () => {
// //   const [open, setOpen] = useState(null);

// //   const toggle = (key) => {
// //     setOpen(open === key ? null : key);
// //   };

// //   return (
// //     <footer className="bg-[#D8BF91] text-[#6B4E2E] px-6 pt-16">
// //       {/* ================= DESKTOP VIEW ================= */}
// //       <div className="hidden md:grid grid-cols-4 gap-12 max-w-7xl mx-auto text-sm">
// //         {/* CONTACT */}
// //         <div>
// //           <h3 className="text-xl font-serif mb-4">Contact Us</h3>
// //           <p className="flex items-center gap-2 mb-3">
// //             <Phone size={16} /> +91 62818 74010
// //           </p>
// //           <p className="flex items-center gap-2 mb-3">
// //             <Mail size={16} /> heven.storess@gmail.com
// //           </p>
// //           <p className="cursor-pointer underline">Store Locator</p>
// //         </div>

// //         {/* ABOUT */}
// //         <div>
// //           <h3 className="text-xl font-serif mb-4">About WILDBEARS</h3>
// //           <ul className="space-y-2">
// //             <li><Link to="/about">About Us</Link></li>
// //             <li>Investor Information</li>
// //             <li>In the News</li>
// //             <li>Blog</li>
// //             <li>Site Map</li>
// //           </ul>
// //         </div>

// //         {/* ACCOUNT */}
// //         <div>
// //           <h3 className="text-xl font-serif mb-4">My Account</h3>
// //           <ul className="space-y-2">
// //             <li>My Profile</li>
// //             <li>Orders</li>
// //             <li>Wishlist</li>
// //             <li>Track Your Order</li>
// //           </ul>
// //         </div>

// //         {/* SUPPORT */}
// //         <div>
// //           <h3 className="text-xl font-serif mb-4">Customer Support</h3>
// //           <ul className="space-y-2">
// //             <li>FAQs</li>
// //             <li>Contact</li>
// //             <li>Cancellation, Returns & Refunds</li>
// //             <li>Terms & Conditions</li>
// //           </ul>
// //         </div>
// //       </div>

// //       {/* ================= MOBILE VIEW ================= */}
// //       <div className="md:hidden">
// //         {/* CONTACT */}
// //         <div className="border-t border-[#6B4E2E]/30 py-4">
// //           <div
// //             className="flex justify-between items-center"
// //             onClick={() => toggle("contact")}
// //           >
// //             <h3 className="text-xl font-serif">Contact Us</h3>
// //             {open === "contact" ? <ChevronUp /> : <ChevronDown />}
// //           </div>
// //           {open === "contact" && (
// //             <div className="mt-4 space-y-3 text-sm">
// //               <p className="flex items-center gap-2">
// //                 <Phone size={16} /> +91 62818 74010
// //               </p>
// //               <p className="flex items-center gap-2">
// //                 <Mail size={16} /> heven.storess@gmail.com
// //               </p>
// //               <p className="underline">Store Locator</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* ABOUT */}
// //         <div className="border-t border-[#6B4E2E]/30 py-4">
// //           <div
// //             className="flex justify-between items-center"
// //             onClick={() => toggle("about")}
// //           >
// //             <h3 className="text-xl font-serif">About WILDBEARS</h3>
// //             {open === "about" ? <ChevronUp /> : <ChevronDown />}
// //           </div>
// //           {open === "about" && (
// //             <ul className="mt-4 space-y-2 text-sm">
// //               <li><Link to="/about">About Us</Link></li>
// //               <li>Investor Information</li>
// //               <li>In the News</li>
// //               <li>Blog</li>
// //               <li>Site Map</li>
// //             </ul>
// //           )}
// //         </div>

// //         {/* ACCOUNT */}
// //         <div className="border-t border-[#6B4E2E]/30 py-4">
// //           <div
// //             className="flex justify-between items-center"
// //             onClick={() => toggle("account")}
// //           >
// //             <h3 className="text-xl font-serif">My Account</h3>
// //             {open === "account" ? <ChevronUp /> : <ChevronDown />}
// //           </div>
// //           {open === "account" && (
// //             <ul className="mt-4 space-y-2 text-sm">
// //               <li>My Profile</li>
// //               <li>Orders</li>
// //               <li>Wishlist</li>
// //               <li>Track Your Order</li>
// //             </ul>
// //           )}
// //         </div>

// //         {/* SUPPORT */}
// //         <div className="border-t border-[#6B4E2E]/30 py-4">
// //           <div
// //             className="flex justify-between items-center"
// //             onClick={() => toggle("support")}
// //           >
// //             <h3 className="text-xl font-serif">Customer Support</h3>
// //             {open === "support" ? <ChevronUp /> : <ChevronDown />}
// //           </div>
// //           {open === "support" && (
// //             <ul className="mt-4 space-y-2 text-sm">
// //               <li>FAQs</li>
// //               <li>Contact</li>
// //               <li>Cancellation, Returns & Refunds</li>
// //               <li>Terms & Conditions</li>
// //             </ul>
// //           )}
// //         </div>
// //       </div>

// //       {/* ================= POLICY ROW ================= */}
// //       <div className="border-t border-[#6B4E2E]/30 mt-12 pt-6">
// //         <div className="flex justify-center gap-24 text-center text-xs">
// //           <div>
// //             <img
// //               src={assets.exchange_icon}
// //               className="w-9 mx-auto mb-2"
// //               alt="Free Delivery"
// //             />
// //             <p className="font-medium">Free Delivery</p>
// //           </div>

// //           <div>
// //             <img
// //               src={assets.support_img}
// //               className="w-9 mx-auto mb-2"
// //               alt="Secure Payment"
// //             />
// //             <p className="font-medium">Secure Payment</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ================= LOGO & COPYRIGHT ================= */}
// //       <div className="border-t border-[#6B4E2E]/30 mt-10 pt-10 text-center text-xs">
// //         <img
// //           src={assets.logo}
// //           alt="WILDBEARS"
// //           className="mx-auto w-88 mb-12"
// //         />
// //         <p>© 2025 WILDBEARS. All Rights Reserved.</p>
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;




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
//       {/* EXTRA SPACE FROM PAGE CONTENT */}
//       <div className="mt-32" />

//       <footer className="bg-[#D8BF91] text-[#6B4E2E] px-6 py-20">
//         {/* ================= DESKTOP VIEW ================= */}
//         <div className="hidden md:grid grid-cols-4 gap-16 max-w-7xl mx-auto text-sm">
//           {/* CONTACT */}
//           <div>
//             <h3 className="text-xl font-serif mb-6">Contact Us</h3>
//             <p className="flex items-center gap-3 mb-4">
//               <Phone size={16} /> +91 62818 74010
//             </p>
//             <p className="flex items-center gap-3 mb-4">
//               <Mail size={16} /> heven.storess@gmail.com
//             </p>
//             <p className="underline cursor-pointer">Store Locator</p>
//           </div>

//           {/* ABOUT */}
//           <div>
//             <h3 className="text-xl font-serif mb-6">About WILDBEARS</h3>
//             <ul className="space-y-3">
//               <li><Link to="/about">About Us</Link></li>
//               <li>Investor Information</li>
//               <li>In the News</li>
//               <li>Blog</li>
//               <li>Site Map</li>
//             </ul>
//           </div>

//           {/* ACCOUNT */}
//           <div>
//             <h3 className="text-xl font-serif mb-6">My Account</h3>
//             <ul className="space-y-3">
//               <li>My Profile</li>
//               <li>Orders</li>
//               <li>Wishlist</li>
//               <li>Track Your Order</li>
//             </ul>
//           </div>

//           {/* SUPPORT */}
//           <div>
//             <h3 className="text-xl font-serif mb-6">Customer Support</h3>
//             <ul className="space-y-3">
//               <li>FAQs</li>
//               <li>Contact</li>
//               <li>Returns & Refunds</li>
//               <li>Terms & Conditions</li>
//             </ul>
//           </div>
//         </div>

//         {/* ================= MOBILE VIEW ================= */}
//         <div className="md:hidden space-y-6">
//           {[
//             { key: "contact", title: "Contact Us" },
//             { key: "about", title: "About WILDBEARS" },
//             { key: "account", title: "My Account" },
//             { key: "support", title: "Customer Support" }
//           ].map(({ key, title }) => (
//             <div key={key} className="border-t border-[#6B4E2E]/30 pt-6">
//               <div
//                 className="flex justify-between items-center"
//                 onClick={() => toggle(key)}
//               >
//                 <h3 className="text-lg font-serif">{title}</h3>
//                 {open === key ? <ChevronUp /> : <ChevronDown />}
//               </div>

//               {open === key && (
//                 <ul className="mt-5 space-y-3 text-sm">
//                   {key === "contact" && (
//                     <>
//                       <li className="flex gap-2 items-center">
//                         <Phone size={15} /> +91 62818 74010
//                       </li>
//                       <li className="flex gap-2 items-center">
//                         <Mail size={15} /> heven.storess@gmail.com
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

//         {/* ================= POLICY ROW ================= */}
//         <div className="border-t border-[#6B4E2E]/30 mt-16 pt-10">
//           <div className="flex justify-center gap-28 text-center text-xs">
//             <div>
//               <img
//                 src={assets.exchange_icon}
//                 className="w-8 mx-auto mb-3"
//                 alt="Free Delivery"
//               />
//               <p className="font-medium">Free Delivery</p>
//             </div>

//             <div>
//               <img
//                 src={assets.support_img}
//                 className="w-8 mx-auto mb-3"
//                 alt="Secure Payment"
//               />
//               <p className="font-medium">Secure Payment</p>
//             </div>
//           </div>
//         </div>

//         {/* ================= LOGO & COPYRIGHT ================= */}
        
//         <div className="border-t border-[#6B4E2E]/30 mt-8 pt-4 text-center text-xs">
//   <img
//     src={assets.logo}
//     alt="WILDBEARS"
//     className="mx-auto w-72 mb-6"
//   />
//   <p>© 2025 WILDBEARS. All Rights Reserved.</p>
// </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;


import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";

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
                {open === key ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
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
