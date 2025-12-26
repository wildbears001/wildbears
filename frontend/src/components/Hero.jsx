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
