import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  // ================= FETCH =================
  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) setList(res.data.products);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // ================= DELETE =================
  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Product removed");
        fetchList();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ================= UPDATE =================
  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();

      fd.append("_id", editProduct._id);
      fd.append("name", editProduct.name);
      fd.append("description", editProduct.description);
      fd.append("category", editProduct.category);
      fd.append("subCategory", editProduct.subCategory);
      fd.append("type", editProduct.type);
      fd.append("features", editProduct.features);
      fd.append("quality", editProduct.quality);
      fd.append("price", editProduct.price);
      fd.append("actualPrice", editProduct.actualPrice);
      fd.append("bestseller", editProduct.bestseller);
      fd.append("isPreOrder", editProduct.isPreOrder);

      fd.append(
        "preOrderAvailableDate",
        editProduct.preOrderAvailableDate || ""
      );
      fd.append("maxPreOrderQty", editProduct.maxPreOrderQty || "");

      fd.append("existingImages", JSON.stringify(editProduct.image));

      if (editProduct.newImages) {
        editProduct.newImages.forEach((file, index) => {
          if (file) fd.append(`image${index + 1}`, file);
        });
      }

      const res = await axios.put(
        backendUrl + "/api/product/update",
        fd,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Product updated successfully");
        setEditProduct(null);
        fetchList();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredList = list.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <input
        className="mb-4 p-2 border rounded w-full md:w-1/2"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ================= LIST ================= */}
      {filteredList.map((p) => (
        <div
          key={p._id}
          className="flex items-center gap-4 border p-2 mb-2"
        >
          <img src={p.image[0]} className="w-12" />
          <p className="flex-1">{p.name}</p>
          <p>{currency}{p.price}</p>
          <button
            onClick={() => setEditProduct({ ...p, newImages: [] })}
            className="text-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => removeProduct(p._id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}

      {/* ================= EDIT FORM ================= */}
      {editProduct && (
        <form
          onSubmit={updateProduct}
          className="mt-6 p-4 border rounded bg-yellow-50 max-w-2xl"
        >
          <h3 className="font-semibold mb-3">Edit Product</h3>

          {[
            ["name", "Name"],
            ["description", "Description"],
            ["category", "Category"],
            ["subCategory", "Sub Category"],
            ["type", "Type"],
            ["features", "Features"],
            ["quality", "Quality"],
          ].map(([key, label]) => (
            <input
              key={key}
              value={editProduct[key] || ""}
              onChange={(e) =>
                setEditProduct({ ...editProduct, [key]: e.target.value })
              }
              placeholder={label}
              className="border p-2 w-full mb-2"
            />
          ))}

          <input
            type="number"
            value={editProduct.price}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
            placeholder="Price"
            className="border p-2 w-full mb-2"
          />

          <input
            type="number"
            value={editProduct.actualPrice}
            onChange={(e) =>
              setEditProduct({ ...editProduct, actualPrice: e.target.value })
            }
            placeholder="Actual Price"
            className="border p-2 w-full mb-2"
          />

          {/* ================= CHECKBOXES ================= */}
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={editProduct.bestseller || false}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  bestseller: e.target.checked,
                })
              }
            />
            Bestseller
          </label>

          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={editProduct.isPreOrder || false}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  isPreOrder: e.target.checked,
                })
              }
            />
            Enable Pre-Order
          </label>

          {editProduct.isPreOrder && (
            <>
              <input
                type="date"
                value={
                  editProduct.preOrderAvailableDate?.slice(0, 10) || ""
                }
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    preOrderAvailableDate: e.target.value,
                  })
                }
                className="border p-2 w-full mb-2"
              />

              <input
                type="number"
                value={editProduct.maxPreOrderQty || ""}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    maxPreOrderQty: e.target.value,
                  })
                }
                placeholder="Max Pre-Order Quantity"
                className="border p-2 w-full mb-2"
              />
            </>
          )}

          {/* ================= IMAGES ================= */}
          <div className="grid grid-cols-4 gap-3 my-3">
            {editProduct.image.map((img, i) => (
              <div key={i}>
                <img
                  src={img}
                  className="w-20 h-20 object-cover border"
                />
                <input
                  type="file"
                  onChange={(e) => {
                    const files = [...(editProduct.newImages || [])];
                    files[i] = e.target.files[0];
                    setEditProduct({ ...editProduct, newImages: files });
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditProduct(null)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default List;
