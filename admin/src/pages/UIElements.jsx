import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const UIElements = ({ token }) => {
  const [uiElements, setUiElements] = useState([]);
  const [section, setSection] = useState("hero"); // 'hero', 'video', 'category'
  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUIElements = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/ui/list`);
      if (response.data.success) {
        setUiElements(response.data.uiElements);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUIElements();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!media) {
      return toast.error("Please select an image or video");
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("section", section);
      if (title) formData.append("title", title);
      if (subCategory) formData.append("subCategory", subCategory);
      formData.append("media", media);

      const response = await axios.post(`${backendUrl}/api/ui/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setMedia(null);
        setTitle("");
        setSubCategory("");
        fetchUIElements();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const deleteElement = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/ui/delete`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchUIElements();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredElements = uiElements.filter((el) => el.section === section);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Frontend UI Elements</h1>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${section === "hero" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
          onClick={() => setSection("hero")}
        >
          Hero Banners
        </button>
        <button
          className={`px-4 py-2 rounded ${section === "video" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
          onClick={() => setSection("video")}
        >
          Featured / Videos
        </button>
        <button
          className={`px-4 py-2 rounded ${section === "category" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
          onClick={() => setSection("category")}
        >
          Category Images
        </button>
      </div>

      <form onSubmit={onSubmitHandler} className="bg-white p-6 shadow-md rounded-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New {section.charAt(0).toUpperCase() + section.slice(1)} Element</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {section === "category" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  placeholder="e.g. SHIRTS"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SubCategory Target</label>
                <input
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  placeholder="e.g. Topwear"
                  required
                />
              </div>
            </>
          )}

          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Upload Media (Image / Video)</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files[0])}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            />
            {media && (
              <p className="mt-2 text-sm text-gray-500">Selected: {media.name}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-[#6B4E2E] text-white px-6 py-2 rounded shadow hover:bg-[#5a4126] disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Element"}
        </button>
      </form>

      <div className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Current {section.charAt(0).toUpperCase() + section.slice(1)} Elements</h2>
        {filteredElements.length === 0 ? (
          <p className="text-gray-500">No elements found for this section.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredElements.map((el) => (
              <div key={el._id} className="border rounded-md overflow-hidden relative shadow-sm">
                {el.resourceType === "video" ? (
                  <video src={el.mediaUrl} controls className="w-full h-48 object-cover bg-black" />
                ) : (
                  <img src={el.mediaUrl} alt="media" className="w-full h-48 object-cover bg-gray-100" />
                )}
                <div className="p-4 flex justify-between items-center">
                  <div>
                    {el.title && <p className="font-bold text-sm">{el.title}</p>}
                    {el.subCategory && <p className="text-xs text-gray-500">{el.subCategory}</p>}
                  </div>
                  <button
                    onClick={() => deleteElement(el._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UIElements;
