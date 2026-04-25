import React, { useRef, useContext } from "react";
import { assets } from "../assets/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const VideoHero = () => {
  const { uiElements } = useContext(ShopContext);
  const sliderRef = useRef(null);

  const videoElements = uiElements ? uiElements.filter(el => el.section === 'video') : [];

  const slides = videoElements.length > 0
    ? videoElements
    : [
      { resourceType: "video", mediaUrl: assets.v1 },
      { resourceType: "video", mediaUrl: assets.v2 },
      { resourceType: "video", mediaUrl: assets.v3 },
    ];

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
      >
        <ChevronLeft size={28} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
      >
        <ChevronRight size={28} />
      </button>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {slides.map((item, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-[70vh] sm:h-[90vh] snap-start relative bg-black"
          >
            {/* MEDIA */}
            {item.resourceType === "video" ? (
              <video
                src={item.mediaUrl}
                autoPlay
                muted
                loop
                playsInline
                className="
                  w-full h-full
                  object-cover        /* 📱 Mobile */
                  sm:object-contain   /* 💻 Desktop */
                "
              />
            ) : (
              <img
                src={item.mediaUrl}
                alt={`video-hero-${index + 1}`}
                draggable="false"
                className="w-full h-full object-cover sm:object-contain"
              />
            )}

            {/* TEXT OVERLAY */}

          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoHero;
