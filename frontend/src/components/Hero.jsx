import React, { useRef, useContext, useState, useEffect, useCallback } from "react";
import { assets } from "../assets/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const Hero = () => {
  const { uiElements } = useContext(ShopContext);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const heroElements = uiElements ? uiElements.filter(el => el.section === "hero") : [];

  const banners =
    heroElements.length > 0
      ? heroElements
      : [
          { resourceType: "image", mediaUrl: assets.b1 },
          { resourceType: "image", mediaUrl: assets.b2 },
          { resourceType: "image", mediaUrl: assets.b3 },
          { resourceType: "image", mediaUrl: assets.b4 },
          { resourceType: "image", mediaUrl: assets.b5 },
          { resourceType: "image", mediaUrl: assets.b6 },
          { resourceType: "image", mediaUrl: assets.b7 },
        ];

  const goTo = useCallback(
    (idx) => {
      if (isTransitioning) return;
      const slider = sliderRef.current;
      if (!slider) return;
      const target = Math.max(0, Math.min(idx, banners.length - 1));
      setCurrentIndex(target);
      setIsTransitioning(true);
      slider.scrollTo({ left: slider.clientWidth * target, behavior: "smooth" });
      setTimeout(() => setIsTransitioning(false), 450);
    },
    [isTransitioning, banners.length]
  );

  const prev = () => goTo(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  const next = () => goTo(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);

  /* Auto-advance */
  useEffect(() => {
    if (banners.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [currentIndex, banners.length]);

  /* Sync dot indicator on native scroll */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const onScroll = () => {
      const idx = Math.round(slider.scrollLeft / slider.clientWidth);
      setCurrentIndex(idx);
    };
    slider.addEventListener("scroll", onScroll, { passive: true });
    return () => slider.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* ── NAV ARROWS ─────────────────────────────────────────── */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous banner"
            className="absolute left-3 sm:left-5 top-1/2 z-20 -translate-y-1/2
                       bg-white/70 hover:bg-white active:scale-95
                       p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-sm
                       transition-all duration-200"
          >
            <ChevronLeft size={22} strokeWidth={2.5} className="text-black" />
          </button>

          <button
            onClick={next}
            aria-label="Next banner"
            className="absolute right-3 sm:right-5 top-1/2 z-20 -translate-y-1/2
                       bg-white/70 hover:bg-white active:scale-95
                       p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-sm
                       transition-all duration-200"
          >
            <ChevronRight size={22} strokeWidth={2.5} className="text-black" />
          </button>
        </>
      )}

      {/* ── SLIDER TRACK ───────────────────────────────────────── */}
      <div
        ref={sliderRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {banners.map((item, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-full snap-start bg-black"
            style={{
              /* Responsive height:
                 • Mobile  ( <640px ) → 55vw, min 260px, max 420px
                 • Tablet  (640–1024) → 60vw
                 • Desktop (>1024px) → 90vh, min 480px             */
              height: "clamp(260px, 56vw, 90vh)",
            }}
          >
            {/* MEDIA — always object-cover so it fills every screen edge-to-edge */}
            {item.resourceType === "video" ? (
              <video
                src={item.mediaUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img
                src={item.mediaUrl}
                alt={`banner-${index + 1}`}
                draggable="false"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Subtle gradient vignette for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* ── DOT INDICATORS ─────────────────────────────────────── */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300
                ${i === currentIndex
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
