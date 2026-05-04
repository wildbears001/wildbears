import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { PencilLine, Trash2, Search, Zap, Crown, PackageOpen, Save, X, CheckCircle2 } from "lucide-react";
import { assets } from '../assets/assets';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        setList(res.data.products);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchList(); }, []);

  const removeProduct = async (id) => {
    if(!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } });
      if (res.data.success) {
        toast.success("Product permanently archived.");
        fetchList();
      }
    } catch (err) { toast.error(err.message); }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      const fields = ["_id", "name", "description", "category", "subCategory", "type", "features", "quality", "price", "actualPrice", "bestseller", "isPreOrder", "stock"];
      fields.forEach(f => fd.append(f, editProduct[f]));
      
      fd.append("preOrderAvailableDate", editProduct.preOrderAvailableDate || "");
      fd.append("maxPreOrderQty", editProduct.maxPreOrderQty || "");
      fd.append("sizes", JSON.stringify(editProduct.sizes || []));
      fd.append("existingImages", JSON.stringify(editProduct.image));

      if (editProduct.newImages) {
        editProduct.newImages.forEach((file, index) => {
          if (file) fd.append(`image${index + 1}`, file);
        });
      }

      const res = await axios.put(backendUrl + "/api/product/update", fd, {
        headers: { token, "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Product data synced successfully");
        setEditProduct(null);
        fetchList();
      }
    } catch (err) { toast.error(err.message); }
  };

  const filteredList = list.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-gray-800 flex items-center gap-3">
             <PackageOpen className="text-[#6B4E2E]" /> Inventory Catalog
          </h3>
          <p className="text-sm text-gray-500 mt-1">Review and manage your store products</p>
        </div>

        <div className="relative w-full md:w-[350px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#6B4E2E] transition-all"
            placeholder="Search catalog models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ================= GRID LISTINGS ================= */}
      {!editProduct ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? [...Array(8)].map((_, i) => <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>) 
          : filteredList.map((p) => (
            <div key={p._id} className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#6B4E2E]/30 transition-all duration-300">
              {/* Product Hero Image */}
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                 <img src={p.image[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.name} />
                 
                 {/* Badges Container */}
                 <div className="absolute top-3 left-3 flex flex-col gap-2">
                   {p.bestseller && (
                     <span className="bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-md flex items-center gap-1.5">
                       <Crown size={12} /> Bestseller
                     </span>
                   )}
                   {p.isPreOrder && (
                     <span className="bg-[#6B4E2E] text-white text-[10px] font-black text-center uppercase tracking-wider px-2 py-1 rounded shadow-md w-fit">
                       PRE-ORDER
                     </span>
                   )}
                 </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-1">
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{p.category}</p>
                 <h4 className="font-bold text-gray-900 leading-tight mb-2 truncate">{p.name}</h4>
                 <div className="flex items-end gap-2 mt-auto">
                    <span className="text-xl font-black text-[#6B4E2E]">{currency}{p.price}</span>
                    {p.actualPrice > p.price && (
                      <span className="text-sm font-semibold text-gray-400 line-through mb-0.5">{currency}{p.actualPrice}</span>
                    )}
                 </div>
              </div>

              {/* Actions Footer */}
              <div className="grid grid-cols-2 border-t border-gray-100 bg-gray-50 mt-auto">
                 <button onClick={() => setEditProduct({ ...p, newImages: [null, null, null, null], sizes: p.sizes || [] })} className="flex items-center justify-center gap-2 py-3 hover:bg-[#6B4E2E] hover:text-white text-gray-600 font-semibold text-sm transition-colors border-r border-gray-200">
                   <PencilLine size={16} /> Edit
                 </button>
                 <button onClick={() => removeProduct(p._id)} className="flex items-center justify-center gap-2 py-3 hover:bg-red-500 hover:text-white text-red-500 font-semibold text-sm transition-colors">
                   <Trash2 size={16} /> Discard
                 </button>
              </div>
            </div>
          ))}
          {filteredList.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center text-gray-500 font-medium">No catalog items matching this matrix.</div>
          )}
        </div>
      ) : (

        /* ================= EDIT ORBITAL FORM ================= */
        <div className="bg-[#faf9f7] border border-gray-200 rounded-2xl p-6 lg:p-10 shadow-inner relative animate-fade-in">
           <button onClick={() => setEditProduct(null)} className="absolute top-6 right-6 p-2 bg-white rounded-full text-gray-400 hover:text-black shadow-sm transition-colors"><X size={20} /></button>
           
           <h3 className="text-xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4">Editing Blueprint: {editProduct.name}</h3>
           
           <form onSubmit={updateProduct} className='flex flex-col gap-8'>
             
             {/* Images Section */}
             <div className='bg-gray-50 p-6 rounded-xl border border-gray-100'>
               <p className='text-sm font-semibold text-gray-700 mb-4'>Product Imagery</p>
               <div className='flex gap-4 overflow-x-auto pb-2'>
                 {[0, 1, 2, 3].map((idx) => {
                   const existingImg = editProduct.image && editProduct.image[idx];
                   const newImg = editProduct.newImages && editProduct.newImages[idx];
                   return (
                   <label key={idx} className='cursor-pointer group relative flex-shrink-0'>
                     <div className='w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 bg-white flex items-center justify-center overflow-hidden hover:border-gray-400 transition-all'>
                       <img 
                         className={`object-cover ${existingImg || newImg ? 'w-full h-full' : 'w-10 opacity-50'}`} 
                         src={newImg ? URL.createObjectURL(newImg) : (existingImg || assets.upload_area)} 
                         alt={`Upload ${idx+1}`} 
                       />
                     </div>
                     <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity rounded-xl'><span className='text-xs font-medium text-gray-500'>Upload</span></div>
                     <input onChange={(e) => {
                       const newFiles = [...(editProduct.newImages || [null, null, null, null])];
                       newFiles[idx] = e.target.files[0];
                       setEditProduct({ ...editProduct, newImages: newFiles });
                     }} type="file" hidden accept="image/*" />
                   </label>
                 )})}
               </div>
             </div>

             {/* Basic Details */}
             <div className='grid grid-cols-1 gap-6'>
               <div>
                 <label className='block text-sm font-medium text-gray-700 mb-2'>Product Name</label>
                 <input onChange={(e)=>setEditProduct({...editProduct, name: e.target.value})} value={editProduct.name || ''} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none' type="text" required />
               </div>

               <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                 <div>
                   <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                   <textarea onChange={(e)=>setEditProduct({...editProduct, description: e.target.value})} value={editProduct.description || ''} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none min-h-[120px]' required />
                 </div>
                 <div className='flex flex-col gap-6'>
                   <div>
                     <label className='block text-sm font-medium text-gray-700 mb-2'>Features</label>
                     <textarea onChange={(e)=>setEditProduct({...editProduct, features: e.target.value})} value={editProduct.features || ''} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none h-[40px]' required />
                   </div>
                   <div className='grid grid-cols-2 gap-4'>
                     <div>
                       <label className='block text-sm font-medium text-gray-700 mb-2'>Type</label>
                       <input onChange={(e)=>setEditProduct({...editProduct, type: e.target.value})} value={editProduct.type || ''} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none' type="text" required />
                     </div>
                     <div>
                       <label className='block text-sm font-medium text-gray-700 mb-2'>Fabric/Quality</label>
                       <input onChange={(e)=>setEditProduct({...editProduct, quality: e.target.value})} value={editProduct.quality || ''} className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none' type="text" required />
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Pricing, Inventory & Category */}
             <div className='bg-gray-50 p-6 rounded-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6'>
               <div className='md:col-span-1'>
                 <label className='block text-sm font-medium text-gray-700 mb-2'>Category</label>
                 <select onChange={(e)=>setEditProduct({...editProduct, category: e.target.value})} value={editProduct.category || ''} className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900'>
                   <option value="Men">Men</option>
                   <option value="Unisex">Unisex</option>
                   <option value="Women">Women</option>
                   <option value="Kids">Kids</option>
                   <option value="Footwear">Footwear</option>
                 </select>
               </div>
               <div className='md:col-span-1'>
                 <label className='block text-sm font-medium text-gray-700 mb-2'>Sub Category</label>
                 <select onChange={(e)=>setEditProduct({...editProduct, subCategory: e.target.value})} value={editProduct.subCategory || ''} className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900'>
                   <option value="Topwear">Topwear</option>
                   <option value="Bottomwear">Bottomwear</option>
                   <option value="Winterwear">Winterwear</option>
                   <option value="Footwear">Footwear</option>
                 </select>
               </div>
               <div className='md:col-span-1'>
                 <label className='block text-sm font-medium text-gray-700 mb-2'>Actual Price (₹)</label>
                 <input onChange={(e)=>setEditProduct({...editProduct, actualPrice: e.target.value})} value={editProduct.actualPrice || ''} className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900' type="number" required min="0"/>
               </div>
               <div className='md:col-span-1'>
                 <label className='block text-sm font-medium text-gray-700 mb-2'>Selling Price (₹)</label>
                 <input onChange={(e)=>setEditProduct({...editProduct, price: e.target.value})} value={editProduct.price || ''} className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 font-semibold text-green-700' type="number" required min="0"/>
               </div>
               <div className='md:col-span-1'>
                 <label className='block text-sm font-medium text-gray-700 mb-2'>Stock Count</label>
                 <input onChange={(e)=>setEditProduct({...editProduct, stock: e.target.value})} value={editProduct.stock || ''} className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 text-blue-700 font-semibold' type="number" required min="0"/>
               </div>
             </div>

             {/* Sizes & Toggles */}
             <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
               <div>
                 <label className='block text-sm font-medium text-gray-700 mb-3'>Available Sizes</label>
                 <div className='flex flex-wrap gap-3'>
                   {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                     <div 
                       key={size}
                       onClick={() => setEditProduct(prev => ({
                         ...prev,
                         sizes: prev.sizes?.includes(size) ? prev.sizes.filter(item => item !== size) : [...(prev.sizes || []), size]
                       }))}
                       className={`w-12 h-12 flex items-center justify-center rounded-xl font-medium cursor-pointer transition-all border
                         ${editProduct.sizes?.includes(size) ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                     >
                       {size}
                     </div>
                   ))}
                 </div>
               </div>
               
               <div className='flex flex-col justify-center'>
                 <label className='flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors w-max'>
                   <input 
                     onChange={(e) => setEditProduct({...editProduct, bestseller: e.target.checked})} 
                     checked={editProduct.bestseller || false} 
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
                 <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${editProduct.isPreOrder ? 'bg-gray-900' : 'bg-gray-300'}`} onClick={() => setEditProduct({...editProduct, isPreOrder: !editProduct.isPreOrder})}>
                   <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${editProduct.isPreOrder ? 'translate-x-6' : 'translate-x-0'}`}></div>
                 </div>
                 <span className='font-medium text-gray-800'>Enable Pre-Order Mode</span>
               </div>

               {editProduct.isPreOrder && (
                 <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 bg-amber-50/50 p-6 rounded-xl border border-amber-100'>
                   <div>
                     <label className='block text-sm font-medium text-gray-700 mb-2'>Shipping Date</label>
                     <input
                       type='date'
                       className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500'
                       value={editProduct.preOrderAvailableDate?.slice(0,10) || ''}
                       onChange={(e) => setEditProduct({...editProduct, preOrderAvailableDate: e.target.value})}
                       required={editProduct.isPreOrder}
                     />
                   </div>
                   <div>
                     <label className='block text-sm font-medium text-gray-700 mb-2'>Max Pre-Order Capacity</label>
                     <input
                       type='number'
                       className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500'
                       value={editProduct.maxPreOrderQty || ''}
                       onChange={(e) => setEditProduct({...editProduct, maxPreOrderQty: e.target.value})}
                       required={editProduct.isPreOrder}
                       placeholder='0'
                       min="1"
                     />
                   </div>
                 </div>
               )}
             </div>

             {/* Action Submit */}
             <div className="flex justify-end gap-4 mt-6 border-t border-gray-200 pt-8">
               <button type="button" onClick={() => setEditProduct(null)} className="px-6 py-3 bg-white font-bold text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">Abort Changes</button>
               <button type="submit" className="px-8 py-3 bg-[#6B4E2E] text-white font-bold tracking-wide rounded-xl shadow-lg border border-[#6B4E2E] hover:bg-[#5a4225] flex items-center gap-2"><Save size={18}/> SYNC DATABASE</button>
             </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default List;
