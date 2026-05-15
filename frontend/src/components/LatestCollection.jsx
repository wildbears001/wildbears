import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [LastestProducts,setLatestProducts] = useState([]); 

    useEffect(()=>{
          setLatestProducts(products.slice(0,10));
    },[products])

    
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl '>
            <Title text1={'NEW'} text2={'ARRIVALS'}/>
            <p className=' w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            embracing bold prints, oversized blazers, wide-leg trousers, and sustainable materials
            </p>
        </div>
        {/* Rendering Products */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
               {
                LastestProducts.map((item,index)=>(
                    <ProductItem
                                                  key={index}
                                                  name={item.name}
                                                  id={item._id}
                                                  image={item.image}
                                                  price={item.price}
                                                  isPreOrder={item.isPreOrder}
                                                  actualPrice={item.actualPrice}
                                                  
                                                />
                ))
               }
        </div>
 
        {/* Premium CTA Button */}
        <div className="flex justify-center mt-16 sm:mt-20 mb-8">
            <Link to="/collections" className="focus:outline-none inline-block">
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative overflow-hidden bg-gradient-to-r from-[#6B4E2E] to-[#8B6A4A] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs sm:text-sm shadow-[0_10px_30px_-10px_rgba(107,78,46,0.6)] transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(107,78,46,0.8)]"
                    >
                        {/* Continuous Shimmer Animation */}
                        <motion.div
                            className="absolute top-0 bottom-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            initial={{ x: '-150%' }}
                            animate={{ x: '150%' }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                        />
                        
                        <div className="relative z-10 flex items-center justify-center gap-3">
                            <span>Explore Collection</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </motion.div>
                </motion.div>
            </Link>
        </div>
      
    </div>
  )
}

export default LatestCollection
