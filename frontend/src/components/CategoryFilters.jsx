// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // const categories = [
// //   {
// //     label: "Shirts",
// //     icon: "https://img.icons8.com/?size=100&id=Sz9rUgdHcYKn&format=png&color=000000",
// //     query: "shirts",
// //   },
// //   {
// //     label: "T-Shirts",
// //     icon: "https://img.icons8.com/ios-filled/100/000000/t-shirt.png",
// //     query: "tshirts",
// //   },
// //   {
// //     label: "Jeans",
// //     icon: "https://img.icons8.com/ios-filled/100/000000/jeans.png",
// //     query: "jeans",
// //   },
// //   {
// //     label: "Trousers",
// //     icon: "https://img.icons8.com/ios-filled/100/000000/trousers.png",
// //     query: "trousers",
// //   },
// //   {
// //     label: "Jackets",
// //     icon: "https://img.icons8.com/ios-filled/100/000000/jacket.png",
// //     query: "jackets",
// //   },
// //   {
// //     label: "Winterwear",
// //     icon: "https://img.icons8.com/?size=100&id=eOv2xJdk_JuD&format=png&color=000000",
// //     query: "winterwear",
// //   },
// // ];

// // const CategoryFilters = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <section className="w-full bg-white border-b">
// //       <div className="flex gap-4 px-4 py-6 overflow-x-auto scrollbar-hide sm:justify-center">
// //         {categories.map(({ label, icon, query }) => (
// //           <button
// //             key={label}
// //             onClick={() => navigate(`/collections?category=${query}`)}
// //             className="flex flex-col items-center min-w-[88px] group"
// //           >
// //             {/* Icon */}
// //             <div className="w-20 h-20 border rounded-lg flex items-center justify-center transition-all group-hover:border-black group-hover:shadow-sm">
// //               <img src={icon} alt={label} className="w-12 h-12 object-contain" />
// //             </div>

// //             {/* Label */}
// //             <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-black">
// //               {label}
// //             </span>
// //           </button>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // };

// // export default CategoryFilters;


import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    label: "Shirts",
    // icon: "https://img.icons8.com/?size=100&id=Sz9rUgdHcYKn&format=png&color=000000",
    icon: "https://img.icons8.com/?size=100&id=1169&format=png&color=000000",
    query: "shirts",
  },
  {
    label: "T-Shirts",
    // icon: "https://img.icons8.com/ios-filled/100/000000/t-shirt.png",
    icon: "https://img.icons8.com/?size=100&id=105819&format=png&color=000000",
    query: "tshirts",
  },
  {
    label: "Jeans",
    // icon: "https://img.icons8.com/ios-filled/100/000000/jeans.png",
    icon: "https://img.icons8.com/?size=100&id=YedBvucd2z3n&format=png&color=000000",
    query: "jeans",
  },
  {
    label: "Trousers",
    // icon: "https://img.icons8.com/ios-filled/100/000000/trousers.png",
    icon:"https://img.icons8.com/?size=100&id=TzWQsSt4zZc6&format=png&color=000000",
    query: "trousers",
  },
  {
    label: "Jackets",
    // icon: "https://img.icons8.com/ios-filled/100/000000/jacket.png",
        icon: "https://img.icons8.com/?size=100&id=1184&format=png&color=000000",

    query: "jackets",
  },
  {
    label: "Winterwear",
    //icon: "https://img.icons8.com/?size=100&id=eOv2xJdk_JuD&format=png&color=000000",
    icon: "https://img.icons8.com/?size=100&id=4mwiu33L-uR2&format=png&color=000000",
    query: "winterwear",
  },
];

const CategoryFilters = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white border-b border-[#4A2F1A]/30">
      <div className="flex gap-6 px-4 py-6 overflow-x-auto scrollbar-hide sm:justify-center">
        {categories.map(({ label, icon, query }) => (
          <button
            key={label}
            onClick={() => navigate(`/collections?category=${query}`)}
            className="flex flex-col items-center min-w-[96px] group"
          >
            {/* Icon Box */}
            <div
              className="
                w-20 h-20 
                border-2 border-[#4A2F1A] 
                rounded-xl 
                flex items-center justify-center
                transition-all duration-300
                group-hover:bg-[#4A2F1A]
              "
            >
              <img
                src={icon}
                alt={label}
                className="
                  w-12 h-12 object-contain
                  transition-all duration-300
                  group-hover:invert
                "
              />
            </div>

            {/* Label */}
            <span
              className="
                mt-2 text-sm font-medium
                text-[#4A2F1A]
                tracking-wide
                transition-colors duration-300
                group-hover:text-black
              "
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilters;


// import React from "react";
// import { useNavigate } from "react-router-dom";

// const categories = [
//   {
//     label: "Shirts",
//     icon: "https://img.icons8.com/?size=100&id=Sz9rUgdHcYKn&format=png&color=000000",
//     query: "shirts",
//   },
//   {
//     label: "T-Shirts",
//     icon: "https://img.icons8.com/ios-filled/100/000000/t-shirt.png",
//     query: "tshirts",
//   },
//   {
//     label: "Jeans",
//     icon: "https://img.icons8.com/ios-filled/100/000000/jeans.png",
//     query: "jeans",
//   },
//   {
//     label: "Trousers",
//     icon: "https://img.icons8.com/ios-filled/100/000000/trousers.png",
//     query: "trousers",
//   },
//   {
//     label: "Jackets",
//     icon: "https://img.icons8.com/ios-filled/100/000000/jacket.png",
//     query: "jackets",
//   },
//   {
//     label: "Winterwear",
//     icon: "https://img.icons8.com/?size=100&id=eOv2xJdk_JuD&format=png&color=000000",
//     query: "winterwear",
//   },
// ];

// const CategoryFilters = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="w-full bg-white border-b border-[#4A2F1A]/30">
//       <div className="flex gap-6 px-4 py-6 overflow-x-auto scrollbar-hide sm:justify-center">
//         {categories.map(({ label, icon, query }) => (
//           <button
//             key={label}
//             onClick={() => navigate(`/collections?category=${query}`)}
//             className="flex flex-col items-center min-w-[96px] group"
//           >
//             {/* Icon Box – Solid Brand Brown */}
//             <div
//               className="
//                 w-20 h-20
//                 bg-[#4A2F1A]
//                 border-2 border-[#4A2F1A]
//                 rounded-xl
//                 flex items-center justify-center
//                 transition-all duration-300
//                 group-hover:scale-105
//               "
//             >
//               <img
//                 src={icon}
//                 alt={label}
//                 className="
//                   w-12 h-12 object-contain
//                   invert
//                 "
//               />
//             </div>

//             {/* Label */}
//             <span
//               className="
//                 mt-2 text-sm font-medium
//                 text-[#4A2F1A]
//                 tracking-wide
//               "
//             >
//               {label}
//             </span>
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CategoryFilters;
