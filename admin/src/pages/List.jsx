import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { PencilLine, Trash2, Search, Zap, Crown, PackageOpen, Save, X, CheckCircle2 } from "lucide-react";

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
      const fields = ["_id", "name", "description", "category", "subCategory", "type", "features", "quality", "price", "actualPrice", "bestseller", "isPreOrder"];
      fields.forEach(f => fd.append(f, editProduct[f]));
      
      fd.append("preOrderAvailableDate", editProduct.preOrderAvailableDate || "");
      fd.append("maxPreOrderQty", editProduct.maxPreOrderQty || "");
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
                 <button onClick={() => setEditProduct({ ...p, newImages: [] })} className="flex items-center justify-center gap-2 py-3 hover:bg-[#6B4E2E] hover:text-white text-gray-600 font-semibold text-sm transition-colors border-r border-gray-200">
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
           
           <form onSubmit={updateProduct} className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
             {/* Core Data Block */}
             <div className="space-y-5">
               <h4 className="font-bold text-[#6B4E2E] uppercase tracking-wider text-xs flex items-center gap-2"><Zap size={14}/> Core Attributes</h4>
               
               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Title</label>
                  <input value={editProduct.name || ""} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#6B4E2E]" />
               </div>

               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Description</label>
                  <textarea value={editProduct.description || ""} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#6B4E2E] h-24 resize-none" />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Price</label>
                    <input type="number" value={editProduct.price || ""} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#6B4E2E]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Compare Price</label>
                    <input type="number" value={editProduct.actualPrice || ""} onChange={(e) => setEditProduct({ ...editProduct, actualPrice: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#6B4E2E]" />
                  </div>
               </div>
             </div>

             {/* Secondary Data Block */}
             <div className="space-y-5">
               <h4 className="font-bold text-[#6B4E2E] uppercase tracking-wider text-xs flex items-center gap-2 mt-2 lg:mt-0"><Zap size={14}/> Metadata & Toggles</h4>
               <div className="grid grid-cols-2 gap-4">
                 <input placeholder="Category" value={editProduct.category || ""} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#6B4E2E]" />
                 <input placeholder="Sub Category" value={editProduct.subCategory || ""} onChange={(e) => setEditProduct({ ...editProduct, subCategory: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#6B4E2E]" />
                 <input placeholder="Type Variant" value={editProduct.type || ""} onChange={(e) => setEditProduct({ ...editProduct, type: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#6B4E2E]" />
                 <input placeholder="Quality Code" value={editProduct.quality || ""} onChange={(e) => setEditProduct({ ...editProduct, quality: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#6B4E2E]" />
               </div>

               <div className="flex gap-6 py-4 bg-white px-5 rounded-lg border border-gray-200 mt-2">
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <div className="relative flex items-center">
                     <input type="checkbox" checked={editProduct.bestseller || false} onChange={e => setEditProduct({...editProduct, bestseller: e.target.checked})} className="peer sr-only" />
                     <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center peer-checked:bg-[#6B4E2E] peer-checked:border-[#6B4E2E] transition-colors"><CheckCircle2 size={14} className="text-white opacity-0 peer-checked:opacity-100" /></div>
                   </div>
                   <span className="font-semibold text-gray-700">Flag as Bestseller</span>
                 </label>

                 <label className="flex items-center gap-3 cursor-pointer group">
                   <div className="relative flex items-center">
                     <input type="checkbox" checked={editProduct.isPreOrder || false} onChange={e => setEditProduct({...editProduct, isPreOrder: e.target.checked})} className="peer sr-only" />
                     <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center peer-checked:bg-[#6B4E2E] peer-checked:border-[#6B4E2E] transition-colors"><CheckCircle2 size={14} className="text-white opacity-0 peer-checked:opacity-100" /></div>
                   </div>
                   <span className="font-semibold text-gray-700">Enable Pre-order Logic</span>
                 </label>
               </div>

               {editProduct.isPreOrder && (
                 <div className="grid grid-cols-2 gap-4 animate-fade-in bg-amber-50 p-4 border border-amber-200 rounded-lg">
                   <div>
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Fulfillment Date</label>
                     <input type="date" value={editProduct.preOrderAvailableDate?.slice(0, 10) || ""} onChange={(e) => setEditProduct({ ...editProduct, preOrderAvailableDate: e.target.value })} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:border-[#6B4E2E]" />
                   </div>
                   <div>
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Max Stock Allocation</label>
                     <input type="number" value={editProduct.maxPreOrderQty || ""} onChange={(e) => setEditProduct({ ...editProduct, maxPreOrderQty: e.target.value })} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:border-[#6B4E2E]" />
                   </div>
                 </div>
               )}
             </div>

             {/* Action Submit */}
             <div className="col-span-1 lg:col-span-2 flex justify-end gap-4 mt-6 border-t border-gray-200 pt-8">
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
