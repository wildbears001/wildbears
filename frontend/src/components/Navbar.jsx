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
