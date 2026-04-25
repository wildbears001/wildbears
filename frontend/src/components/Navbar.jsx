import React, { useContext, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems
  } = useContext(ShopContext)

  // Add scroll event listener for sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    setVisible(false)
  }

  const brownIcon = 'filter sepia brightness-[0.6] hue-rotate-[350deg] saturate-[4]'

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header 
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm py-2' 
            : 'bg-white/40 backdrop-blur-sm border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* 🔹 LEFT — LOGO */}
          <Link to="/" className="flex-shrink-0 flex items-center group">
            <img
              src={assets.logo}
              alt="logo"
              className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
                scrolled ? 'h-8 sm:h-10' : 'h-10 sm:h-14'
              }`}
            />
          </Link>

          {/* 🔹 CENTER — DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-1 bg-white/60 px-2 py-1.5 rounded-full border border-gray-200/50 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md">
            {['/', '/collections', '/about', '/contact'].map((path, i) => {
              const labels = ['Home', 'Collection', 'About', 'Contact']
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                      isActive
                        ? 'text-white bg-[#6B4E2E] shadow-md scale-105'
                        : 'text-gray-600 hover:text-[#4A2F1A] hover:bg-[#6B4E2E]/10'
                    }`
                  }
                >
                  {labels[i]}
                </NavLink>
              )
            })}
          </nav>

          {/* 🔹 RIGHT — ICONS & MOBILE TOGGLE */}
          <div className="flex items-center gap-2 sm:gap-4 bg-white/60 px-2 py-1.5 rounded-full border border-gray-200/50 shadow-sm backdrop-blur-md">
            {/* Search */}
            <button 
              onClick={() => {
                setShowSearch(true)
                navigate('/collections')
              }}
              className="p-2 rounded-full hover:bg-[#6B4E2E]/10 transition-colors"
            >
              <img src={assets.search_icon} alt="search" className={`w-5 ${brownIcon}`} />
            </button>

            {/* Profile */}
            <div className="relative group">
              <button 
                className="p-2 rounded-full hover:bg-[#6B4E2E]/10 transition-colors"
                onClick={() => {
                  if (token) navigate('/profile')
                  else navigate('/login')
                }}
              >
                <img src={assets.profile_icon} alt="profile" className={`w-5 ${brownIcon}`} />
              </button>

              {token && (
                <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 z-50">
                  <div className="py-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <p onClick={() => navigate('/profile')} className="px-4 py-2.5 text-sm text-gray-700 hover:bg-[#6B4E2E]/10 hover:text-[#4A2F1A] cursor-pointer transition-colors font-medium">My Profile</p>
                    <p onClick={() => navigate('/orders')} className="px-4 py-2.5 text-sm text-gray-700 hover:bg-[#6B4E2E]/10 hover:text-[#4A2F1A] cursor-pointer transition-colors font-medium">Orders</p>
                    <div className="border-t border-gray-100/80 my-1"></div>
                    <p onClick={logout} className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors font-medium">Logout</p>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-[#6B4E2E]/10 transition-colors group">
              <img src={assets.cart_icon} alt="cart" className={`w-5 transition-transform duration-300 group-hover:scale-110 ${brownIcon}`} />
              <span className="absolute top-0 right-0 w-4 h-4 text-[9px] font-bold flex items-center justify-center bg-[#6B4E2E] text-white rounded-full shadow-sm ring-2 ring-white">
                {getCartCount()}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setVisible(true)}
              className="md:hidden p-2 rounded-full hover:bg-[#6B4E2E]/10 transition-colors ml-1"
            >
              <img src={assets.menu_icon} alt="menu" className={`w-5 ${brownIcon}`} />
            </button>
          </div>
        </div>
      </header>

      {/* 🔹 BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ${
          visible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setVisible(false)}
      />

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white/95 backdrop-blur-2xl z-[70] shadow-2xl
        transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col
        ${visible ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
      >
        <div className="p-6 border-b border-gray-100/50 flex items-center justify-between">
           <img src={assets.logo} alt="logo" className="h-8 object-contain" />
           <button 
             onClick={() => setVisible(false)}
             className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
           >
             <img src={assets.dropdown_icon} alt="close" className={`w-3.5 rotate-90 ${brownIcon}`} />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-3">
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
              className={({ isActive }) => 
                `py-3.5 px-5 rounded-2xl text-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#6B4E2E] text-white shadow-lg shadow-[#6B4E2E]/30 scale-105' 
                    : 'text-gray-700 bg-gray-50/50 hover:bg-[#6B4E2E]/10 hover:text-[#4A2F1A]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {token && (
          <div className="p-6 border-t border-gray-100/50">
            <button
              onClick={logout}
              className="w-full py-4 px-4 rounded-2xl text-center text-lg font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors shadow-sm"
            >
              Logout
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

export default Navbar
