import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice()

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      )
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      )
    }

    setFilterProducts(productsCopy)
  }

  const sortProducts = () => {
    let fpCopy = filterProducts.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price))
        break
      default:
        applyFilter()
        break
    }
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProducts()
  }, [sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t text-[#6B4E2E]">

      {/* ================= FILTERS ================= */}
      <div className="min-w-[260px]">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl font-medium flex items-center cursor-pointer gap-2"
        >
          Filters
          <img
            src={assets.dropdown_icons}
            className={`h-3 sm:hidden transition-transform duration-300 ${
              showFilter ? 'rotate-90' : ''
            }`}
            alt=""
          />
        </p>

        {/* CATEGORY FILTER */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            showFilter ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          } sm:max-h-full sm:opacity-100 overflow-hidden`}
        >
          <div className="bg-[#EFE2C6] rounded-xl shadow-sm p-5 mt-4">
            <p className="mb-4 text-sm font-semibold tracking-wide">
              Categories
            </p>
            <div className="flex flex-col gap-3 text-sm text-[#8B6A4A]">
              {['Unisex', 'Men', 'Women', 'Kids', 'Footwear'].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#6B4E2E] transition"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                    className="accent-[#6B4E2E]"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* TYPE FILTER */}
          <div className="bg-[#EFE2C6] rounded-xl shadow-sm p-5 mt-5">
            <p className="mb-4 text-sm font-semibold tracking-wide">
              Type
            </p>
            <div className="flex flex-col gap-3 text-sm text-[#8B6A4A]">
              {['Topwear', 'Bottomwear', 'Winterwear', 'Footwear'].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#6B4E2E] transition"
                >
                  <input
                    type="checkbox"
                    value={type}
                    onChange={toggleSubCategory}
                    className="accent-[#6B4E2E]"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-[#6B4E2E] rounded-md text-sm px-3 py-1 bg-transparent"
          >
            <option value="relavent">Sort: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-8">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              actualPrice={item.actualPrice}
              isPreOrder={item.isPreOrder}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collections
