// // // // // import React, { useContext, useState } from 'react'
// // // // // import { assets } from '../assets/assets'
// // // // // import { Link, NavLink } from 'react-router-dom'
// // // // // import { ShopContext } from '../context/ShopContext';

// // // // // const Navbar = () => {
// // // // //   const [visible, setVisible] = useState(false);
// // // // //   const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

// // // // //   const logout = () => {
// // // // //     navigate('/login');
// // // // //     localStorage.removeItem('token');
// // // // //     setToken('');
// // // // //     setCartItems({});
// // // // //     setVisible(false); // Close mobile menu on logout
// // // // //   };

// // // // //   return (
// // // // //     <div className='flex items-center justify-between py-5 px-4 sm:px-10 font-medium relative z-50 bg-white'>
// // // // //       <Link to='/'>
// // // // //         <img src={assets.logo} className='w-36' alt="logo" />
// // // // //       </Link>

// // // // //       {/* Desktop Menu */}
// // // // //       <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
// // // // //         {['/', '/collections', '/about', '/contact'].map((path, i) => {
// // // // //           const labels = ['Home', 'Collection', 'About', 'Contact'];
// // // // //           return (
// // // // //             <NavLink key={path} to={path} className="flex flex-col items-center gap-1">
// // // // //               <p className='font-bold hover:text-yellow-600'>{labels[i]}</p>
// // // // //               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
// // // // //             </NavLink>
// // // // //           );
// // // // //         })}
// // // // //       </ul>

// // // // //       {/* Right Icons */}
// // // // //       <div className='flex items-center gap-6'>
// // // // //         <img
// // // // //           onClick={() => {
// // // // //             setShowSearch(true);
// // // // //             navigate('/collections');
// // // // //           }}
// // // // //           src={assets.search_icon}
// // // // //           alt="search"
// // // // //           className='w-5 cursor-pointer'
// // // // //         />

// // // // //         <div className='group relative'>
// // // // //           <img
// // // // //             onClick={() => token ? null : navigate('/login')}
// // // // //             src={assets.profile_icon}
// // // // //             alt="profile"
// // // // //             className='w-5 cursor-pointer'
// // // // //           />
// // // // //           {token &&
// // // // //             <div className='group-hover:block hidden absolute right-0 top-full pt-2'>
// // // // //               <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
// // // // //                 <p className='cursor-pointer hover:text-black'>My Profile</p>
// // // // //                 <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
// // // // //                 <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
// // // // //               </div>
// // // // //             </div>}
// // // // //         </div>

// // // // //         <Link to='/Cart' className='relative'>
// // // // //           <img src={assets.cart_icon} alt="cart" className='w-5 min-w-5' />
// // // // //           <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]'>
// // // // //             {getCartCount()}
// // // // //           </p>
// // // // //         </Link>

// // // // //         {/* Hamburger menu icon */}
// // // // //         <img
// // // // //           onClick={() => setVisible(true)}
// // // // //           src={assets.menu_icon}
// // // // //           className='w-5 cursor-pointer sm:hidden'
// // // // //           alt="menu"
// // // // //         />
// // // // //       </div>

// // // // //       {/* Mobile Sidebar */}
// // // // //       <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white overflow-hidden transition-all duration-300 ease-in-out ${visible ? 'w-3/4 shadow-lg' : 'w-0'} sm:hidden`}>
// // // // //         <div className='flex flex-col text-gray-600 h-full px-6 pt-6'>
// // // // //           {/* Back button */}
// // // // //           <div onClick={() => setVisible(false)} className='flex items-center gap-4 mb-6 cursor-pointer'>
// // // // //             <img src={assets.dropdown_icon} alt="back" className='h-4 rotate-180' />
// // // // //             <p className='text-base'>Back</p>
// // // // //           </div>

// // // // //           {/* Mobile Nav Links */}
// // // // //           {[
// // // // //             { label: 'Home', to: '/' },
// // // // //             { label: 'Collections', to: '/collections' },
// // // // //             { label: 'Orders', to: '/orders' },
// // // // //             { label: 'About', to: '/about' },
// // // // //             { label: 'Contact', to: '/contact' }
// // // // //           ].map(({ label, to }) => (
// // // // //             <NavLink key={to} onClick={() => setVisible(false)} className='py-4 border-b text-lg font-medium' to={to}>
// // // // //               {label}
// // // // //             </NavLink>
// // // // //           ))}

// // // // //           {token &&
// // // // //             <p onClick={logout} className='mt-6 text-lg font-bold cursor-pointer text-red-600 hover:text-red-800'>
// // // // //               Logout
// // // // //             </p>
// // // // //           }
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Navbar;


// // // // import React, { useContext, useState } from 'react'
// // // // import { Link, NavLink } from 'react-router-dom'
// // // // import { assets } from '../assets/assets'
// // // // import { ShopContext } from '../context/ShopContext'

// // // // const Navbar = () => {
// // // //   const [visible, setVisible] = useState(false)

// // // //   const {
// // // //     setShowSearch,
// // // //     getCartCount,
// // // //     navigate,
// // // //     token,
// // // //     setToken,
// // // //     setCartItems
// // // //   } = useContext(ShopContext)

// // // //   const logout = () => {
// // // //     navigate('/login')
// // // //     localStorage.removeItem('token')
// // // //     setToken('')
// // // //     setCartItems({})
// // // //     setVisible(false)
// // // //   }

// // // //   return (
// // // //     <>
// // // //       {/* ================= NAVBAR ================= */}
// // // //       <header className="bg-white border-b relative z-50">
// // // //         <div className="flex items-center px-4 sm:px-10 py-5">

// // // //           {/* 🔹 LEFT SECTION (1/3) */}
// // // //           <div className="flex items-center gap-6 w-1/3">
// // // //             {/* Mobile menu */}
// // // //             <img
// // // //               src={assets.menu_icon}
// // // //               alt="menu"
// // // //               className="w-5 cursor-pointer sm:hidden"
// // // //               onClick={() => setVisible(true)}
// // // //             />

// // // //             {/* Desktop menu */}
// // // //             <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
// // // //               {['/', '/collections', '/about', '/contact'].map((path, i) => {
// // // //                 const labels = ['Home', 'Collection', 'About', 'Contact']
// // // //                 return (
// // // //                   <NavLink
// // // //                     key={path}
// // // //                     to={path}
// // // //                     className={({ isActive }) =>
// // // //                       `font-bold transition-colors ${
// // // //                         isActive
// // // //                           ? 'text-yellow-600'
// // // //                           : 'hover:text-yellow-600'
// // // //                       }`
// // // //                     }
// // // //                   >
// // // //                     {labels[i]}
// // // //                   </NavLink>
// // // //                 )
// // // //               })}
// // // //             </ul>
// // // //           </div>

// // // //           {/* 🔹 CENTER LOGO (1/3 — TRUE CENTER) */}
// // // //           <div className="flex justify-center w-1/3">
// // // //             <Link to="/">
// // // //               <img
// // // //                 src={assets.logo}
// // // //                 alt="logo"
// // // //                 className="w-72 sm:w-80"
// // // //               />
// // // //             </Link>
// // // //           </div>

// // // //           {/* 🔹 RIGHT SECTION (1/3) */}
// // // //           <div className="flex items-center justify-end gap-6 w-1/3">
// // // //             <img
// // // //               src={assets.search_icon}
// // // //               alt="search"
// // // //               className="w-5 cursor-pointer"
// // // //               onClick={() => {
// // // //                 setShowSearch(true)
// // // //                 navigate('/collections')
// // // //               }}
// // // //             />

// // // //             {/* Profile */}
// // // //             <div className="relative group">
// // // //               <img
// // // //                 src={assets.profile_icon}
// // // //                 alt="profile"
// // // //                 className="w-5 cursor-pointer"
// // // //                 onClick={() => (token ? null : navigate('/login'))}
// // // //               />

// // // //               {token && (
// // // //                 <div className="absolute right-0 top-full hidden group-hover:block pt-2">
// // // //                   <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
// // // //                     <p className="cursor-pointer hover:text-black">
// // // //                       My Profile
// // // //                     </p>
// // // //                     <p
// // // //                       onClick={() => navigate('/orders')}
// // // //                       className="cursor-pointer hover:text-black"
// // // //                     >
// // // //                       Orders
// // // //                     </p>
// // // //                     <p
// // // //                       onClick={logout}
// // // //                       className="cursor-pointer hover:text-black"
// // // //                     >
// // // //                       Logout
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* Cart */}
// // // //             <Link to="/Cart" className="relative">
// // // //               <img src={assets.cart_icon} alt="cart" className="w-5" />
// // // //               <span className="absolute -right-2 -bottom-2 w-4 h-4 text-[8px] flex items-center justify-center bg-black text-white rounded-full">
// // // //                 {getCartCount()}
// // // //               </span>
// // // //             </Link>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       {/* ================= MOBILE SIDEBAR ================= */}
// // // //       <div
// // // //         className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ${
// // // //           visible ? 'w-3/4 shadow-lg' : 'w-0'
// // // //         } sm:hidden`}
// // // //       >
// // // //         <div className="flex flex-col h-full px-6 pt-6 text-gray-600">
// // // //           {/* Back */}
// // // //           <div
// // // //             onClick={() => setVisible(false)}
// // // //             className="flex items-center gap-4 mb-6 cursor-pointer"
// // // //           >
// // // //             <img
// // // //               src={assets.dropdown_icon}
// // // //               alt="back"
// // // //               className="h-4 rotate-180"
// // // //             />
// // // //             <p>Back</p>
// // // //           </div>

// // // //           {[
// // // //             { label: 'Home', to: '/' },
// // // //             { label: 'Collections', to: '/collections' },
// // // //             { label: 'Orders', to: '/orders' },
// // // //             { label: 'About', to: '/about' },
// // // //             { label: 'Contact', to: '/contact' }
// // // //           ].map(({ label, to }) => (
// // // //             <NavLink
// // // //               key={to}
// // // //               to={to}
// // // //               onClick={() => setVisible(false)}
// // // //               className="py-4 border-b text-lg font-medium"
// // // //             >
// // // //               {label}
// // // //             </NavLink>
// // // //           ))}

// // // //           {token && (
// // // //             <p
// // // //               onClick={logout}
// // // //               className="mt-6 text-lg font-bold text-red-600 cursor-pointer"
// // // //             >
// // // //               Logout
// // // //             </p>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </>
// // // //   )
// // // // }

// // // // export default Navbar


// // // import React, { useContext, useState } from 'react'
// // // import { Link, NavLink } from 'react-router-dom'
// // // import { assets } from '../assets/assets'
// // // import { ShopContext } from '../context/ShopContext'

// // // const Navbar = () => {
// // //   const [visible, setVisible] = useState(false)

// // //   const {
// // //     setShowSearch,
// // //     getCartCount,
// // //     navigate,
// // //     token,
// // //     setToken,
// // //     setCartItems
// // //   } = useContext(ShopContext)

// // //   const logout = () => {
// // //     navigate('/login')
// // //     localStorage.removeItem('token')
// // //     setToken('')
// // //     setCartItems({})
// // //     setVisible(false)
// // //   }

// // //   return (
// // //     <>
// // //       {/* ================= NAVBAR ================= */}
// // //       <header className="bg-white border-b z-50 relative m-0 p-0">
// // //         <div className="flex items-center px-4 sm:px-10 min-h-[72px]">

// // //           {/* 🔹 LEFT SECTION (1/3) */}
// // //           <div className="flex items-center gap-6 w-1/3">
// // //             {/* Mobile menu */}
// // //             <img
// // //               src={assets.menu_icon}
// // //               alt="menu"
// // //               className="w-5 cursor-pointer sm:hidden"
// // //               onClick={() => setVisible(true)}
// // //             />

// // //             {/* Desktop menu */}
// // //             <ul className="hidden sm:flex gap-6 text-sm text-gray-700 m-0 p-0">
// // //               {['/', '/collections', '/about', '/contact'].map((path, i) => {
// // //                 const labels = ['Home', 'Collection', 'About', 'Contact']
// // //                 return (
// // //                   <NavLink
// // //                     key={path}
// // //                     to={path}
// // //                     className={({ isActive }) =>
// // //                       `font-bold transition-colors ${
// // //                         isActive
// // //                           ? 'text-yellow-600'
// // //                           : 'hover:text-yellow-600'
// // //                       }`
// // //                     }
// // //                   >
// // //                     {labels[i]}
// // //                   </NavLink>
// // //                 )
// // //               })}
// // //             </ul>
// // //           </div>

// // //           {/* 🔹 CENTER LOGO */}
// // //           <div className="flex justify-center w-1/3">
// // //             <Link to="/" className="flex items-center">
// // //               <img
// // //                 src={assets.logo}
// // //                 alt="logo"
// // //                 className="w-[44rem] sm:w-72 md:w-80 block"
// // //               />
// // //             </Link>
// // //           </div>

// // //           {/* 🔹 RIGHT SECTION (1/3) */}
// // //           <div className="flex items-center justify-end gap-6 w-1/3">
// // //             <img
// // //               src={assets.search_icon}
// // //               alt="search"
// // //               className="w-5 cursor-pointer"
// // //               onClick={() => {
// // //                 setShowSearch(true)
// // //                 navigate('/collections')
// // //               }}
// // //             />

// // //             {/* Profile */}
// // //             <div className="relative group">
// // //               <img
// // //                 src={assets.profile_icon}
// // //                 alt="profile"
// // //                 className="w-5 cursor-pointer"
// // //                 onClick={() => (token ? null : navigate('/login'))}
// // //               />

// // //               {token && (
// // //                 <div className="absolute right-0 top-full hidden group-hover:block pt-2">
// // //                   <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
// // //                     <p className="cursor-pointer hover:text-black">
// // //                       My Profile
// // //                     </p>
// // //                     <p
// // //                       onClick={() => navigate('/orders')}
// // //                       className="cursor-pointer hover:text-black"
// // //                     >
// // //                       Orders
// // //                     </p>
// // //                     <p
// // //                       onClick={logout}
// // //                       className="cursor-pointer hover:text-black"
// // //                     >
// // //                       Logout
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Cart */}
// // //             <Link to="/Cart" className="relative">
// // //               <img src={assets.cart_icon} alt="cart" className="w-5" />
// // //               <span className="absolute -right-2 -bottom-2 w-4 h-4 text-[8px] flex items-center justify-center bg-black text-white rounded-full">
// // //                 {getCartCount()}
// // //               </span>
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* ================= MOBILE SIDEBAR ================= */}
// // //       <div
// // //         className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ${
// // //           visible ? 'w-3/4 shadow-lg' : 'w-0'
// // //         } sm:hidden`}
// // //       >
// // //         <div className="flex flex-col h-full px-6 pt-6 text-gray-600">
// // //           {/* Back */}
// // //           <div
// // //             onClick={() => setVisible(false)}
// // //             className="flex items-center gap-4 mb-6 cursor-pointer"
// // //           >
// // //             <img
// // //               src={assets.dropdown_icon}
// // //               alt="back"
// // //               className="h-4 rotate-180"
// // //             />
// // //             <p>Back</p>
// // //           </div>

// // //           {[
// // //             { label: 'Home', to: '/' },
// // //             { label: 'Collections', to: '/collections' },
// // //             { label: 'Orders', to: '/orders' },
// // //             { label: 'About', to: '/about' },
// // //             { label: 'Contact', to: '/contact' }
// // //           ].map(({ label, to }) => (
// // //             <NavLink
// // //               key={to}
// // //               to={to}
// // //               onClick={() => setVisible(false)}
// // //               className="py-4 border-b text-lg font-medium"
// // //             >
// // //               {label}
// // //             </NavLink>
// // //           ))}

// // //           {token && (
// // //             <p
// // //               onClick={logout}
// // //               className="mt-6 text-lg font-bold text-red-600 cursor-pointer"
// // //             >
// // //               Logout
// // //             </p>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </>
// // //   )
// // // }

// // // export default Navbar


// // import React, { useContext, useState } from 'react'
// // import { Link, NavLink } from 'react-router-dom'
// // import { assets } from '../assets/assets'
// // import { ShopContext } from '../context/ShopContext'

// // const Navbar = () => {
// //   const [visible, setVisible] = useState(false)

// //   const {
// //     setShowSearch,
// //     getCartCount,
// //     navigate,
// //     token,
// //     setToken,
// //     setCartItems
// //   } = useContext(ShopContext)

// //   const logout = () => {
// //     navigate('/login')
// //     localStorage.removeItem('token')
// //     setToken('')
// //     setCartItems({})
// //     setVisible(false)
// //   }

// //   return (
// //     <>
// //       {/* ================= NAVBAR ================= */}
// //       <header className="bg-white border-b z-50 relative m-0 p-0">

// //         {/* 🔹 TOP ROW — LOGO */}
// //         <div className="flex justify-center items-center min-h-[120px]">
// //           <Link to="/" className="flex items-center justify-center">
// //             <img
// //               src={assets.logo}
// //               alt="logo"
// //               className="w-[44rem] sm:w-72 md:w-80"
// //             />
// //           </Link>
// //         </div>

// //         {/* 🔹 BOTTOM ROW — MENU (LEFT) + ICONS (RIGHT) */}
// //         <div className="flex items-center justify-between px-4 sm:px-10 h-[64px] border-t">

// //           {/* LEFT — MENU */}
// //           <div className="flex items-center gap-6">
// //             {/* Mobile menu icon */}
// //             <img
// //               src={assets.menu_icon}
// //               alt="menu"
// //               className="w-5 cursor-pointer sm:hidden"
// //               onClick={() => setVisible(true)}
// //             />

// //             {/* Desktop menu */}
// //             <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
// //               {['/', '/collections', '/about', '/contact'].map((path, i) => {
// //                 const labels = ['Home', 'Collection', 'About', 'Contact']
// //                 return (
// //                   <NavLink
// //                     key={path}
// //                     to={path}
// //                     className={({ isActive }) =>
// //                       `font-bold transition-colors ${
// //                         isActive
// //                           ? 'text-yellow-600'
// //                           : 'hover:text-yellow-600'
// //                       }`
// //                     }
// //                   >
// //                     {labels[i]}
// //                   </NavLink>
// //                 )
// //               })}
// //             </ul>
// //           </div>

// //           {/* RIGHT — ICONS */}
// //           <div className="flex items-center gap-6">
// //             <img
// //               src={assets.search_icon}
// //               alt="search"
// //               className="w-5 cursor-pointer"
// //               onClick={() => {
// //                 setShowSearch(true)
// //                 navigate('/collections')
// //               }}
// //             />

// //             {/* Profile */}
// //             <div className="relative group">
// //               <img
// //                 src={assets.profile_icon}
// //                 alt="profile"
// //                 className="w-5 cursor-pointer"
// //                 onClick={() => (token ? null : navigate('/login'))}
// //               />

// //               {token && (
// //                 <div className="absolute right-0 top-full hidden group-hover:block pt-2">
// //                   <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
// //                     <p className="cursor-pointer hover:text-black">My Profile</p>
// //                     <p
// //                       onClick={() => navigate('/orders')}
// //                       className="cursor-pointer hover:text-black"
// //                     >
// //                       Orders
// //                     </p>
// //                     <p
// //                       onClick={logout}
// //                       className="cursor-pointer hover:text-black"
// //                     >
// //                       Logout
// //                     </p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Cart */}
// //             <Link to="/Cart" className="relative">
// //               <img src={assets.cart_icon} alt="cart" className="w-5" />
// //               <span className="absolute -right-2 -bottom-2 w-4 h-4 text-[8px] flex items-center justify-center bg-black text-white rounded-full">
// //                 {getCartCount()}
// //               </span>
// //             </Link>
// //           </div>
// //         </div>
// //       </header>

// //       {/* ================= MOBILE SIDEBAR ================= */}
// //       <div
// //         className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ${
// //           visible ? 'w-3/4 shadow-lg' : 'w-0'
// //         } sm:hidden`}
// //        >
// //         <div className="flex flex-col h-full px-6 pt-6 text-gray-600">
// //           {/* Back */}
// //           <div
// //             onClick={() => setVisible(false)}
// //             className="flex items-center gap-4 mb-6 cursor-pointer"
// //           >
// //             <img
// //               src={assets.dropdown_icon}
// //               alt="back"
// //               className="h-4 rotate-180"
// //             />
// //             <p>Back</p>
// //           </div>

// //           {[
// //             { label: 'Home', to: '/' },
// //             { label: 'Collections', to: '/collections' },
// //             { label: 'Orders', to: '/orders' },
// //             { label: 'About', to: '/about' },
// //             { label: 'Contact', to: '/contact' }
// //           ].map(({ label, to }) => (
// //             <NavLink
// //               key={to}
// //               to={to}
// //               onClick={() => setVisible(false)}
// //               className="py-4 border-b text-lg font-medium"
// //             >
// //               {label}
// //             </NavLink>
// //           ))}

// //           {token && (
// //             <p
// //               onClick={logout}
// //               className="mt-6 text-lg font-bold text-red-600 cursor-pointer"
// //             >
// //               Logout
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   )
// // }

// // export default Navbar


// import React, { useContext, useState } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { assets } from '../assets/assets'
// import { ShopContext } from '../context/ShopContext'

// const Navbar = () => {
//   const [visible, setVisible] = useState(false)

//   const {
//     setShowSearch,
//     getCartCount,
//     navigate,
//     token,
//     setToken,
//     setCartItems
//   } = useContext(ShopContext)

//   const logout = () => {
//     navigate('/login')
//     localStorage.removeItem('token')
//     setToken('')
//     setCartItems({})
//     setVisible(false)
//   }

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       <header className="bg-white border-b z-50 relative m-0 p-0">

//         {/* 🔹 TOP — LOGO */}
//         <div className="flex justify-center items-center min-h-[120px]">
//           <Link to="/" className="flex items-center justify-center">
//             <img
//               src={assets.logo}
//               alt="logo"
//               className="w-[44rem] sm:w-72 md:w-80"
//             />
//           </Link>
//         </div>

//         {/* 🔹 BOTTOM — MENU (LEFT) + ICONS (RIGHT) */}
//         <div className="flex items-center justify-between px-4 sm:px-10 h-[64px] border-t">

//           {/* LEFT — MENU */}
//           <div className="flex items-center gap-6">
//             {/* Mobile menu button */}
//             <img
//               src={assets.menu_icon}
//               alt="menu"
//               className="w-5 cursor-pointer sm:hidden"
//               onClick={() => setVisible(true)}
//             />

//             {/* Desktop menu */}
//             <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
//               {['/', '/collections', '/about', '/contact'].map((path, i) => {
//                 const labels = ['Home', 'Collection', 'About', 'Contact']
//                 return (
//                   <NavLink
//                     key={path}
//                     to={path}
//                     className={({ isActive }) =>
//                       `font-bold transition-colors ${
//                         isActive
//                           ? 'text-[#4A2F1A]'
//                           : 'hover:text-[#4A2F1A]'
//                       }`
//                     }
//                   >
//                     {labels[i]}
//                   </NavLink>
//                 )
//               })}
//             </ul>
//           </div>

//           {/* RIGHT — ICONS */}
//           <div className="flex items-center gap-6">
//             <img
//               src={assets.search_icon}
//               alt="search"
//               className="w-5 cursor-pointer"
//               onClick={() => {
//                 setShowSearch(true)
//                 navigate('/collections')
//               }}
//             />

//             {/* Profile */}
//             <div className="relative group">
//               <img
//                 src={assets.profile_icon}
//                 alt="profile"
//                 className="w-5 cursor-pointer"
//                 onClick={() => (token ? null : navigate('/login'))}
//               />

//               {token && (
//                 <div className="absolute right-0 top-full hidden group-hover:block pt-2">
//                   <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
//                     <p className="cursor-pointer hover:text-black">My Profile</p>
//                     <p
//                       onClick={() => navigate('/orders')}
//                       className="cursor-pointer hover:text-black"
//                     >
//                       Orders
//                     </p>
//                     <p
//                       onClick={logout}
//                       className="cursor-pointer hover:text-black"
//                     >
//                       Logout
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Cart */}
//             <Link to="/cart" className="relative">
//               <img src={assets.cart_icon} alt="cart" className="w-5" />
//               <span className="absolute -right-2 -bottom-2 w-4 h-4 text-[8px] flex items-center justify-center bg-black text-white rounded-full">
//                 {getCartCount()}
//               </span>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* 🔹 BACKDROP */}
//       {visible && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 sm:hidden"
//           onClick={() => setVisible(false)}
//         />
//       )}

//       {/* ================= MOBILE SIDEBAR (LEFT ONLY) ================= */}
//       <aside
//         className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-50
//         transform transition-transform duration-300 ease-in-out
//         ${visible ? 'translate-x-0' : '-translate-x-full'} sm:hidden`}
//       >
//         <div className="flex flex-col h-full px-6 pt-6 text-gray-600">
//           {/* Back */}
//           <div
//             onClick={() => setVisible(false)}
//             className="flex items-center gap-4 mb-6 cursor-pointer"
//           >
//             <img
//               src={assets.dropdown_icon}
//               alt="back"
//               className="h-4 rotate-180"
//             />
//             <p>Back</p>
//           </div>

//           {[
//             { label: 'Home', to: '/' },
//             { label: 'Collections', to: '/collections' },
//             { label: 'Orders', to: '/orders' },
//             { label: 'About', to: '/about' },
//             { label: 'Contact', to: '/contact' }
//           ].map(({ label, to }) => (
//             <NavLink
//               key={to}
//               to={to}
//               onClick={() => setVisible(false)}
//               className="py-4 border-b text-lg font-medium"
//             >
//               {label}
//             </NavLink>
//           ))}

//           {token && (
//             <p
//               onClick={logout}
//               className="mt-6 text-lg font-bold text-red-600 cursor-pointer"
//             >
//               Logout
//             </p>
//           )}
//         </div>
//       </aside>
//     </>
//   )
// }

// export default Navbar


import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems
  } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    setVisible(false)
  }

  const brownIcon =
    'filter sepia brightness-[0.6] hue-rotate-[350deg] saturate-[4]'

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="bg-white border-b z-50 relative m-0 p-0">

        {/* 🔹 TOP — LOGO */}
        <div className="flex justify-center items-center min-h-[120px]">
          <Link to="/" className="flex items-center justify-center">
            <img
              src={assets.logo}
              alt="logo"
              className="w-[44rem] sm:w-72 md:w-80"
            />
          </Link>
        </div>

        {/* 🔹 BOTTOM — MENU (LEFT) + ICONS (RIGHT) */}
        <div className="flex items-center justify-between px-4 sm:px-10 h-[64px] border-t">

          {/* LEFT — MENU */}
          <div className="flex items-center gap-6">
            {/* Mobile menu */}
            <img
              src={assets.menu_icon}
              alt="menu"
              className={`w-5 cursor-pointer sm:hidden ${brownIcon}`}
              onClick={() => setVisible(true)}
            />

            {/* Desktop menu */}
            <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
              {['/', '/collections', '/about', '/contact'].map((path, i) => {
                const labels = ['Home', 'Collection', 'About', 'Contact']
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `font-bold transition-colors ${
                        isActive
                          ? 'text-[#4A2F1A]'
                          : 'hover:text-[#4A2F1A]'
                      }`
                    }
                  >
                    {labels[i]}
                  </NavLink>
                )
              })}
            </ul>
          </div>

          {/* RIGHT — ICONS */}
          <div className="flex items-center gap-6">
            <img
              src={assets.search_icon}
              alt="search"
              className={`w-5 cursor-pointer ${brownIcon}`}
              onClick={() => {
                setShowSearch(true)
                navigate('/collections')
              }}
            />

            {/* Profile */}
            <div className="relative group">
              <img
  src={assets.profile_icon}
  alt="profile"
  className={`w-5 cursor-pointer ${brownIcon}`}
  onClick={() => {
    if (token) {
      navigate('/profile')   // ✅ mobile + desktop
    } else {
      navigate('/login')
    }
  }}
/>


              {token && (
                <div className="absolute right-0 top-full hidden group-hover:block pt-2">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                    <p 
                            onClick={() => navigate('/profile')}

                    className="cursor-pointer hover:text-black">My Profile</p>
                    <p
                      onClick={() => navigate('/orders')}
                      className="cursor-pointer hover:text-black"
                    >
                      Orders
                    </p>
                    <p
                      onClick={logout}
                      className="cursor-pointer hover:text-black"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                alt="cart"
                className={`w-5 ${brownIcon}`}
              />
              <span className="absolute -right-2 -bottom-2 w-4 h-4 text-[8px] flex items-center justify-center bg-black text-white rounded-full">
                {getCartCount()}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* 🔹 BACKDROP */}
      {visible && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setVisible(false)}
        />
      )}

      {/* ================= MOBILE SIDEBAR (LEFT) ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-50
        transform transition-transform duration-300 ease-in-out
        ${visible ? 'translate-x-0' : '-translate-x-full'} sm:hidden`}
      >
        <div className="flex flex-col h-full px-6 pt-6 text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 mb-6 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              alt="back"
              className={`h-4 rotate-180 ${brownIcon}`}
            />
            <p>Back</p>
          </div>

          {[
            { label: 'Home', to: '/' },
            { label: 'Collections', to: '/collections' },
            { label: 'Orders', to: '/orders' },
            { label: 'About', to: '/about' },
            { label: 'Contact', to: '/contact' }
          ].map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setVisible(false)}
              className="py-4 border-b text-lg font-medium text-[#4A2F1A]"
            >
              {label}
            </NavLink>
          ))}

          {token && (
            <p
              onClick={logout}
              className="mt-6 text-lg font-bold text-red-600 cursor-pointer"
            >
              Logout
            </p>
          )}
        </div>
      </aside>
    </>
  )
}

export default Navbar
