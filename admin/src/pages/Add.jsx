import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [features, setFeatures] = useState('');
  const [quality, setQuality] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]); // Array of { size, stock }

  // Pre-order fields
  const [isPreOrder, setIsPreOrder] = useState(false);
  const [preOrderAvailableDate, setPreOrderAvailableDate] = useState('');
  const [maxPreOrderQty, setMaxPreOrderQty] = useState('');

  const totalStock = sizes.reduce((acc, item) => acc + (Number(item.stock) || 0), 0);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('actualPrice', actualPrice);
      formData.append('type', type);
      formData.append('features', features);
      formData.append('quality', quality);
      formData.append('price', price);
      formData.append('stock', totalStock);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      // Append pre-order fields
      formData.append('isPreOrder', isPreOrder);
      if (isPreOrder) {
        formData.append('preOrderAvailableDate', preOrderAvailableDate);
        formData.append('maxPreOrderQty', maxPreOrderQty);
      }

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(
        backendUrl + '/api/product/add',
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setActualPrice('');
        setPrice('');
        setType('');
        setQuality('');
        setFeatures('');
        setSizes([]);
        setBestseller(false);
        setIsPreOrder(false);
        setPreOrderAvailableDate('');
        setMaxPreOrderQty('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>Add New Product</h2>
        <p className='text-gray-500 mt-1'>Fill in the details below to add a new product to your store.</p>
      </div>

      <form onSubmit={onSubmitHandler} className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-8'>
        
        {/* Images Section */}
        <div className='bg-gray-50 p-6 rounded-xl border border-gray-100'>
          <p className='text-sm font-semibold text-gray-700 mb-4'>Product Imagery</p>
          <div className='flex gap-4 overflow-x-auto pb-2'>
            {[
              { id: 'image1', state: image1, setter: setImage1 },
              { id: 'image2', state: image2, setter: setImage2 },
              { id: 'image3', state: image3, setter: setImage3 },
              { id: 'image4', state: image4, setter: setImage4 },
            ].map((img, idx) => (
              <label key={idx} htmlFor={img.id} className='cursor-pointer group relative flex-shrink-0'>
                <div className='w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 bg-white flex items-center justify-center overflow-hidden hover:border-gray-400 transition-all'>
                  <img 
                    className={`object-cover ${img.state ? 'w-full h-full' : 'w-10 opacity-50'}`} 
                    src={!img.state ? assets.upload_area : URL.createObjectURL(img.state)} 
                    alt={`Upload ${idx+1}`} 
                  />
                </div>
                {!img.state && <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity rounded-xl'><span className='text-xs font-medium text-gray-500'>Upload</span></div>}
                <input onChange={(e) => img.setter(e.target.files[0])} type="file" id={img.id} hidden accept="image/*" />
              </label>
            ))}
          </div>
        </div>

        {/* Basic Details */}
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Product Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none' type="text" placeholder='e.g. Classic White T-Shirt' required />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
              <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none min-h-[120px]' placeholder='Detailed product description...' required />
            </div>
            <div className='flex flex-col gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Features</label>
                <textarea onChange={(e)=>setFeatures(e.target.value)} value={features} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none h-[40px]' placeholder='Key features...' required />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Type</label>
                  <input onChange={(e)=>setType(e.target.value)} value={type} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none' type="text" placeholder='e.g. T-Shirt' required />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Fabric/Quality</label>
                  <input onChange={(e)=>setQuality(e.target.value)} value={quality} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none' type="text" placeholder='e.g. 100% Cotton' required />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing, Inventory & Category */}
        <div className='bg-gray-50 p-6 rounded-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6'>
          <div className='md:col-span-1'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Category</label>
            <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900'>
              <option value="Men">Men</option>
              <option value="Unisex">Unisex</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Footwear">Footwear</option>
            </select>
          </div>
          <div className='md:col-span-1'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Sub Category</label>
            <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
              <option value="Footwear">Footwear</option>
            </select>
          </div>
          <div className='md:col-span-1'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Actual Price (₹)</label>
            <input onChange={(e)=>setActualPrice(e.target.value)} value={actualPrice} className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900' type="number" placeholder='0' required min="0"/>
          </div>
          <div className='md:col-span-1'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Selling Price (₹)</label>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 font-semibold text-green-700' type="number" placeholder='0' required min="0"/>
          </div>
          <div className='md:col-span-1'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Total Stock</label>
            <input value={totalStock} readOnly className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl outline-none font-semibold text-gray-500 cursor-not-allowed' type="number" placeholder='0' />
          </div>
        </div>

        {/* Sizes & Toggles */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-3'>Available Sizes & Stock</label>
            <div className='flex flex-wrap gap-3'>
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                const isActive = sizes.some(item => item.size === size);
                return (
                  <div 
                    key={size}
                    onClick={() => {
                      setSizes(prev => isActive 
                        ? prev.filter(item => item.size !== size) 
                        : [...prev, { size, stock: 0 }]
                      );
                    }}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl font-medium cursor-pointer transition-all border
                      ${isActive ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                  >
                    {size}
                  </div>
                );
              })}
            </div>
            
            {sizes.length > 0 && (
              <div className='mt-5 flex flex-col gap-3 bg-white p-4 border border-gray-200 rounded-xl'>
                <p className='text-sm font-semibold text-gray-700 border-b pb-2'>Enter Stock for Selected Sizes</p>
                {sizes.map(item => (
                  <div key={item.size} className='flex items-center gap-4'>
                    <div className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg font-bold text-gray-700'>
                      {item.size}
                    </div>
                    <input
                      type='number'
                      min='0'
                      required
                      placeholder='Stock qty'
                      className='flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none'
                      value={item.stock}
                      onChange={(e) => {
                        const val = Math.max(0, Number(e.target.value));
                        setSizes(prev => prev.map(s => s.size === item.size ? { ...s, stock: val } : s));
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className='flex flex-col justify-center'>
            <label className='flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors w-max'>
              <input 
                onChange={() => setBestseller((prev) => !prev)} 
                checked={bestseller} 
                type='checkbox' 
                className='w-5 h-5 accent-gray-900 rounded cursor-pointer' 
              />
              <span className='font-medium text-gray-800 tracking-wide'>Mark as Bestseller ✨</span>
            </label>
          </div>
        </div>

        {/* Pre-order Section */}
        <div className='border-t border-gray-100 pt-8'>
          <div className='flex items-center gap-3 mb-6'>
            <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${isPreOrder ? 'bg-gray-900' : 'bg-gray-300'}`} onClick={() => setIsPreOrder(!isPreOrder)}>
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isPreOrder ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
            <span className='font-medium text-gray-800'>Enable Pre-Order Mode</span>
          </div>

          {isPreOrder && (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 bg-amber-50/50 p-6 rounded-xl border border-amber-100'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Shipping Date</label>
                <input
                  type='date'
                  className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500'
                  value={preOrderAvailableDate}
                  onChange={(e) => setPreOrderAvailableDate(e.target.value)}
                  required={isPreOrder}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Max Pre-Order Capacity</label>
                <input
                  type='number'
                  className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500'
                  value={maxPreOrderQty}
                  onChange={(e) => setMaxPreOrderQty(e.target.value)}
                  required={isPreOrder}
                  placeholder='0'
                  min="1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className='pt-4'>
          <button type='submit' className='w-full sm:w-auto px-10 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 active:scale-95 transition-all shadow-lg shadow-gray-900/20'>
            Add Product to Store
          </button>
        </div>

      </form>
    </div>
  );
};

export default Add;
