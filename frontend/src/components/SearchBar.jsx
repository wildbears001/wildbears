import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('collections')) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location])

  return showSearch && visible ? (
    <div className='border-t border-b border-[#6B4E2E]/30 bg-white text-center'>

      <div className='inline-flex items-center justify-center 
                      border border-[#6B4E2E]/50 
                      px-5 py-2 my-5 mx-3 
                      rounded-full 
                      w-3/5 sm:w-1/2
                      bg-[#6B4E2E]/5
                      focus-within:ring-2 
                      focus-within:ring-[#6B4E2E]/40
                      transition'>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder='Search streetwear...'
          className='flex-1 outline-none bg-transparent text-sm 
                     text-[#6B4E2E] placeholder-[#6B4E2E]/60'
        />

        <img
          src={assets.search_icon}
          className='w-4 opacity-80'
          alt="search"
        />
      </div>

      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        className='inline w-3 cursor-pointer opacity-70 hover:opacity-100 transition'
        alt="close"
      />

    </div>
  ) : null
}

export default SearchBar
