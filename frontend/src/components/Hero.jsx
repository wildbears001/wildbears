// // // // // import React from 'react'
// // // // // import { assets } from '../assets/assets'

// // // // // const Hero = () => {
// // // // //   return (
// // // // //     <div className='flex flex-col sm:flex-row border border-gray-400'>
// // // // //       {/* Hero left SIde */}
// // // // //       <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 '>
// // // // //              <div className='text-[#414141]'>
// // // // //                 <div className='flex items-center gap-2 '>
// // // // //                     <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
// // // // //                     <p className='font-medium text-sm md:text-base'>OUR BESTSELLER</p>

// // // // //                 </div>
// // // // //                 <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed '>Latest Arrivals</h1>
// // // // //                 <div className='flex items-center gap-2 '>
// // // // //                      <p className='font-semibold text-sm md:text-base '>SHOP NOW</p>

// // // // //                      <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
// // // // //                 </div>

// // // // //              </div>
// // // // //       </div>
// // // // //       {/* Hero right Side  */}
// // // // //       <img src={assets.hero_img}  className='w-full sm:w-1/2' alt="" />
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default Hero


// // // // import React, { useRef } from "react";
// // // // import { assets } from "../assets/assets";
// // // // import { ChevronLeft, ChevronRight } from "lucide-react";

// // // // const banners = [
// // // //   assets.b1,
// // // //   assets.b2,
// // // //   assets.b3,
// // // //   assets.b4,
// // // //   assets.b5,
// // // //   assets.b6,
// // // //   assets.b7,
// // // // ];

// // // // const Hero = () => {
// // // //   const sliderRef = useRef(null);

// // // //   const scrollLeft = () => {
// // // //     sliderRef.current.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
// // // //   };

// // // //   const scrollRight = () => {
// // // //     sliderRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
// // // //   };

// // // //   return (
// // // //     <div className="relative w-full overflow-hidden border border-gray-300">

// // // //       {/* LEFT ARROW */}
// // // //       <button
// // // //         onClick={scrollLeft}
// // // //         className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
// // // //       >
// // // //         <ChevronLeft size={26} />
// // // //       </button>

// // // //       {/* RIGHT ARROW */}
// // // //       <button
// // // //         onClick={scrollRight}
// // // //         className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
// // // //       >
// // // //         <ChevronRight size={26} />
// // // //       </button>

// // // //       {/* SLIDER */}
// // // //       <div
// // // //         ref={sliderRef}
// // // //         className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide"
// // // //       >
// // // //         {banners.map((img, index) => (
// // // //           <div
// // // //             key={index}
// // // //             className="min-w-full h-[70vh] sm:h-[80vh] snap-start relative"
// // // //           >
// // // //             <img
// // // //               src={img}
// // // //               alt={`banner-${index}`}
// // // //               className="w-full h-full object-cover"
// // // //             />

// // // //             {/* TEXT OVERLAY */}
// // // //             <div className="absolute inset-0 flex items-center bg-black/20">
// // // //               <div className="text-white px-8 sm:px-16 max-w-xl">
// // // //                 <div className="flex items-center gap-3 mb-3">
// // // //                   <span className="w-10 h-[2px] bg-white"></span>
// // // //                   <p className="text-sm tracking-widest">OUR BESTSELLER</p>
// // // //                 </div>

// // // //                 <h1 className="text-3xl sm:text-5xl font-serif leading-tight mb-4">
// // // //                   Latest Arrivals
// // // //                 </h1>

// // // //                 <div className="flex items-center gap-3 cursor-pointer">
// // // //                   <p className="font-semibold">SHOP NOW</p>
// // // //                   <span className="w-10 h-[2px] bg-white"></span>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Hero;


// // // import React, { useRef } from "react";
// // // import { assets } from "../assets/assets";
// // // import { ChevronLeft, ChevronRight } from "lucide-react";

// // // const banners = [
// // //   assets.b1,
// // //   assets.b2,
// // //   assets.b3,
// // //   assets.b4,
// // //   assets.b5,
// // //   assets.b6,
// // //   assets.b7,
// // // ];

// // // const Hero = () => {
// // //   const sliderRef = useRef(null);

// // //   const scrollLeft = () => {
// // //     if (!sliderRef.current) return;
// // //     sliderRef.current.scrollBy({
// // //       left: -sliderRef.current.offsetWidth,
// // //       behavior: "smooth",
// // //     });
// // //   };

// // //   const scrollRight = () => {
// // //     if (!sliderRef.current) return;
// // //     sliderRef.current.scrollBy({
// // //       left: sliderRef.current.offsetWidth,
// // //       behavior: "smooth",
// // //     });
// // //   };

// // //   return (
// // //     <section className="relative w-full border border-gray-300">

// // //       {/* LEFT ARROW */}
// // //       <button
// // //         onClick={scrollLeft}
// // //         className="absolute left-3 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
// // //         aria-label="Previous banner"
// // //       >
// // //         <ChevronLeft size={28} />
// // //       </button>

// // //       {/* RIGHT ARROW */}
// // //       <button
// // //         onClick={scrollRight}
// // //         className="absolute right-3 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
// // //         aria-label="Next banner"
// // //       >
// // //         <ChevronRight size={28} />
// // //       </button>

// // //       {/* SLIDER */}
// // //       <div
// // //         ref={sliderRef}
// // //         className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
// // //       >
// // //         {banners.map((img, index) => (
// // //           <div
// // //             key={index}
// // //             className="w-full flex-shrink-0 h-[60vh] sm:h-[80vh] snap-start relative"
// // //           >
// // //             {/* IMAGE */}
// // //             <img
// // //               src={img}
// // //               alt={`banner-${index + 1}`}
// // //               className="w-full h-full object-cover"
// // //               draggable="false"
// // //             />

// // //             {/* OVERLAY */}
// // //             <div className="absolute inset-0 bg-black/30 flex items-center">
// // //               <div className="text-white px-6 sm:px-16 max-w-xl">
// // //                 <div className="flex items-center gap-3 mb-3">
// // //                   <span className="w-10 h-[2px] bg-white"></span>
// // //                   <p className="text-sm tracking-widest">OUR BESTSELLER</p>
// // //                 </div>

// // //                 <h1 className="text-3xl sm:text-5xl font-serif leading-tight mb-4">
// // //                   Latest Arrivals
// // //                 </h1>

// // //                 <div className="flex items-center gap-3 cursor-pointer">
// // //                   <p className="font-semibold tracking-wide">SHOP NOW</p>
// // //                   <span className="w-10 h-[2px] bg-white"></span>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default Hero;


// // import React, { useRef } from "react";
// // import { assets } from "../assets/assets";
// // import { ChevronLeft, ChevronRight } from "lucide-react";

// // const banners = [
// //   assets.b1,
// //   assets.b2,
// //   assets.b3,
// //   assets.b4,
// //   assets.b5,
// //   assets.b6,
// //   assets.b7,
// // ];

// // const Hero = () => {
// //   const sliderRef = useRef(null);

// //   const scrollLeft = () => {
// //     if (!sliderRef.current) return;
// //     sliderRef.current.scrollBy({
// //       left: sliderRef.current.offsetWidth,
// //       behavior: "smooth",
// //     });
// //   };

// //   const scrollRight = () => {
// //     if (!sliderRef.current) return;
// //     sliderRef.current.scrollBy({
// //       left: sliderRef.current.offsetWidth,
// //       behavior: "smooth",
// //     });
// //   };

// //   return (
// //     <section className="relative w-full border border-gray-300 bg-black">

// //       {/* LEFT ARROW */}
// //       <button
// //         onClick={scrollLeft}
// //         className="absolute left-3 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
// //         aria-label="Previous banner"
// //       >
// //         <ChevronLeft size={28} />
// //       </button>

// //       {/* RIGHT ARROW */}
// //       <button
// //         onClick={scrollRight}
// //         className="absolute right-3 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
// //         aria-label="Next banner"
// //       >
// //         <ChevronRight size={28} />
// //       </button>

// //       {/* SLIDER */}
// //       <div
// //         ref={sliderRef}
// //         className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
// //       >
// //         {banners.map((img, index) => (
// //           <div
// //             key={index}
// //             className="w-full flex-shrink-0 h-[70vh] sm:h-[90vh] snap-start relative bg-black"
// //           >
// //             {/* IMAGE (FULL VIEW) */}
// //             <img
// //               src={img}
// //               alt={`banner-${index + 1}`}
// //               className="w-full h-full object-contain"
// //               draggable="false"
// //             />

// //             {/* TEXT OVERLAY */}
// //             <div className="absolute inset-0 flex items-center bg-black/30">
// //               <div className="text-white px-6 sm:px-16 max-w-xl">
// //                 <div className="flex items-center gap-3 mb-3">
// //                   <span className="w-10 h-[2px] bg-white"></span>
// //                   <p className="text-sm tracking-widest">OUR BESTSELLER</p>
// //                 </div>

// //                 <h1 className="text-3xl sm:text-5xl font-serif leading-tight mb-4">
// //                   Latest Arrivals
// //                 </h1>

// //                 <div className="flex items-center gap-3 cursor-pointer">
// //                   <p className="font-semibold tracking-wide">SHOP NOW</p>
// //                   <span className="w-10 h-[2px] bg-white"></span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // };

// // export default Hero;


// import React, { useRef } from "react";
// import { assets } from "../assets/assets";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const banners = [
//   assets.b1,
//   assets.b2,
//   assets.b3,
//   assets.b4,
//   assets.b5,
//   assets.b6,
//   assets.b7,
// ];

// const Hero = () => {
//   const sliderRef = useRef(null);

//   const scrollLeft = () => {
//     if (!sliderRef.current) return;
//     sliderRef.current.scrollBy({
//       left: sliderRef.current.offsetWidth,
//       behavior: "smooth",
//     });
//   };

//   const scrollRight = () => {
//     if (!sliderRef.current) return;
//     sliderRef.current.scrollBy({
//       left: sliderRef.current.offsetWidth,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="relative w-full border border-gray-300 bg-black">

//       {/* LEFT ARROW */}
//       <button
//         onClick={scrollLeft}
//         className="absolute left-3 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
//       >
//         <ChevronLeft size={28} />
//       </button>

//       {/* RIGHT ARROW */}
//       <button
//         onClick={scrollRight}
//         className="absolute right-3 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
//       >
//         <ChevronRight size={28} />
//       </button>

//       {/* SLIDER */}
//       <div
//         ref={sliderRef}
//         className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
//       >
//         {banners.map((img, index) => (
//           <div
//             key={index}
//             className="w-full flex-shrink-0 h-[70vh] sm:h-[90vh] snap-start relative bg-black"
//           >
//             {/* IMAGE */}
//             <img
//               src={img}
//               alt={`banner-${index + 1}`}
//               draggable="false"
//               className="
//                 w-full h-full
//                 object-cover        /* 📱 Mobile – SAME as before */
//                 sm:object-contain   /* 💻 Desktop – FULL image */
//               "
//             />

//             {/* TEXT OVERLAY */}
//             <div className="absolute inset-0 flex items-center bg-black/30">
//               <div className="text-white px-6 sm:px-16 max-w-xl">
//                 <div className="flex items-center gap-3 mb-3">
//                   <span className="w-10 h-[2px] bg-white"></span>
//                   <p className="text-sm tracking-widest">OUR BESTSELLER</p>
//                 </div>

//                 <h1 className="text-3xl sm:text-5xl font-serif leading-tight mb-4">
//                   Latest Arrivals
//                 </h1>

//                 <div className="flex items-center gap-3 cursor-pointer">
//                   <p className="font-semibold tracking-wide">SHOP NOW</p>
//                   <span className="w-10 h-[2px] bg-white"></span>
//                 </div>
//               </div>
//             </div>

//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Hero;


import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  assets.b1,
  assets.b2,
  assets.b3,
  assets.b4,
  assets.b5,
  assets.b6,
  assets.b7,
];

const Hero = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const slideWidth = slider.clientWidth;

    slider.scrollTo({
      left:
        direction === "left"
          ? slider.scrollLeft - slideWidth
          : slider.scrollLeft + slideWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full border border-gray-300 bg-black">

      {/* LEFT ARROW */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
        aria-label="Previous banner"
      >
        <ChevronLeft size={28} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
        aria-label="Next banner"
      >
        <ChevronRight size={28} />
      </button>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {banners.map((img, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-[70vh] sm:h-[90vh] snap-start relative bg-black"
          >
            {/* IMAGE */}
            <img
              src={img}
              alt={`banner-${index + 1}`}
              draggable="false"
              className="
                w-full h-full
                object-cover
                sm:object-contain
              "
            />

            {/* TEXT OVERLAY */}
            <div className="absolute inset-0 flex items-center bg-black/30">
              <div className="text-white px-6 sm:px-16 max-w-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-[2px] bg-white"></span>
                  <p className="text-sm tracking-widest">OUR BESTSELLER</p>
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif leading-tight mb-4">
                  Latest Arrivals
                </h1>

                <div className="flex items-center gap-3 cursor-pointer">
                  <p className="font-semibold tracking-wide">SHOP NOW</p>
                  <span className="w-10 h-[2px] bg-white"></span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
