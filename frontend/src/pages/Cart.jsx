import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import PreOrderInfo from '../components/PreOrderInfo'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  const handleIncrement = (id, size, currentQuantity) => {
    updateQuantity(id, size, currentQuantity + 1)
  }

  const handleDecrement = (id, size, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, size, currentQuantity - 1)
    }
  }

  const handleRemove = (id, size) => {
    updateQuantity(id, size, 0)
  }

  if (cartData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[70vh] flex flex-col items-center justify-center pt-10 pb-24 px-4 bg-[#faf9f7]"
      >
        <div className="w-28 h-28 bg-[#6B4E2E]/10 rounded-full flex items-center justify-center mb-6 text-[#6B4E2E]">
          <ShoppingBag size={56} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-10 max-w-md text-center text-lg">Looks like you haven't added anything to your cart yet. Discover our premium collection and find something you love.</p>
        <Link
          to="/collections"
          className="bg-[#6B4E2E] text-white px-10 py-4 rounded-full hover:bg-[#5a4125] transition-all duration-300 flex items-center gap-3 shadow-lg shadow-[#6B4E2E]/20 hover:shadow-xl hover:-translate-y-1 font-medium"
        >
          Start Shopping <ArrowRight size={20} />
        </Link>
      </motion.div>
    )
  }

  return (
    <div className='min-h-screen bg-[#faf9f7] pt-10 pb-24 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-8'
        >
          <Title text1={'YOUR'} text2={'CART'} />
        </motion.div>

        <div className='flex flex-col lg:flex-row gap-10'>
          {/* Cart Items List */}
          <div className='flex-1 space-y-5'>
            <AnimatePresence>
              {cartData.map((item) => {
                const productData = products.find((product) => product._id === item._id)
                if (!productData) return null;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.2 } }}
                    key={`${item._id}-${item.size}`}
                    className='bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 hover:shadow-md transition-shadow'
                  >
                    {/* Product Image */}
                    <div className='w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl border border-gray-50 bg-gray-50 cursor-pointer' onClick={() => navigate(`/product/${productData._id}`)}>
                      <img
                        className='w-full h-full object-cover hover:scale-110 transition-transform duration-500'
                        src={productData.image[0]}
                        alt={productData.name}
                      />
                    </div>

                    {/* Product Details */}
                    <div className='flex-1 min-w-0'>
                      <h3
                        className='text-xl font-semibold text-gray-800 line-clamp-1 cursor-pointer hover:text-[#6B4E2E] transition-colors'
                        onClick={() => navigate(`/product/${productData._id}`)}
                      >
                        {productData.name}
                      </h3>

                      <div className='flex flex-wrap items-center gap-3 mt-3 mb-4'>
                        <span className='font-bold text-[#6B4E2E] text-xl'>
                          {currency}{productData.price}
                        </span>
                        <span className='w-1.5 h-1.5 rounded-full bg-gray-300'></span>
                        <span className='px-3 py-1 bg-[#6B4E2E]/5 text-[#6B4E2E] border border-[#6B4E2E]/20 text-xs font-medium rounded-full'>
                          Size: {item.size}
                        </span>
                      </div>

                      {productData.isPreOrder && productData.preOrderAvailableDate && (
                        <div className="mt-2 text-sm">
                          <PreOrderInfo availableDate={productData.preOrderAvailableDate} />
                        </div>
                      )}
                    </div>

                    {/* Controls */}
                    <div className='flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8 mt-2 sm:mt-0'>

                      {/* Quantity Selector */}
                      <div className='flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden h-11'>
                        <button
                          onClick={() => handleDecrement(item._id, item.size, item.quantity)}
                          className='w-11 h-full flex items-center justify-center text-gray-500 hover:bg-[#6B4E2E] hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-gray-50 disabled:hover:text-gray-500'
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={18} />
                        </button>
                        <div className='w-12 h-full flex items-center justify-center font-medium text-gray-800 bg-white border-x border-gray-200'>
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => handleIncrement(item._id, item.size, item.quantity)}
                          className='w-11 h-full flex items-center justify-center text-gray-500 hover:bg-[#6B4E2E] hover:text-white transition-colors'
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item._id, item.size)}
                        className='p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors group'
                        title="Remove item"
                      >
                        <Trash2 size={22} className="group-hover:scale-110 transition-transform" />
                      </button>
                    </div>

                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Cart Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className='lg:w-[420px]'
          >
            <div className='sticky top-24 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col'>
              <CartTotal />

              <button
                onClick={() => navigate('/PlaceOrder')}
                className='w-full bg-[#6B4E2E] text-white text-sm font-bold mt-8 px-8 py-4 rounded-xl
                           hover:bg-[#5a4125] hover:shadow-xl hover:-translate-y-1 
                           transition-all duration-300 tracking-wide flex items-center justify-center gap-2'
              >
                PROCEED TO CHECKOUT <ArrowRight size={18} />
              </button>

              <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Secure Checkout</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span>100% Original Products</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Cart
