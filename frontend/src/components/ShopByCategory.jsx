import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "SHIRTS",
    image: assets.category_shirt,
    subCategory: "Topwear",
  },
  {
    name: "T-SHIRTS",
    image: assets.category_tshirt,
    subCategory: "Topwear",
  },
  {
    name: "TROUSERS",
    image: assets.category_trouser,
    subCategory: "Bottomwear",
  },
  {
    name: "LAYERS",
    image: assets.category_jacket,
    subCategory: "Winterwear",
  },
];

const ShopByCategory = () => {
  const navigate = useNavigate();

  const handleClick = (subCategory) => {
    navigate("/collections", {
      state: { subCategory },
    });
  };

  return (
    <section className="w-full py-12 bg-white">
      {/* Heading */}
      <h2 className="text-center text-3xl sm:text-4xl font-serif mb-10">
        Shop By Category
      </h2>

      {/* Grid / Row */}
      <div
        className="
          max-w-7xl mx-auto px-4
          grid grid-cols-2 gap-6
          md:grid-cols-4 md:gap-8
        "
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleClick(cat.subCategory)}
            className="text-center cursor-pointer group"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="
                  w-full h-[220px]
                  sm:h-[300px]
                  md:h-[360px]
                  lg:h-[420px]
                  object-cover
                  transition-transform duration-500
                  group-hover:scale-105
                "
              />
            </div>

            {/* Category Name */}
            <p className="mt-4 text-sm sm:text-base tracking-widest font-medium">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
