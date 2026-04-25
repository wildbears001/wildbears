import React from 'react';
import { Star } from 'lucide-react';
import Title from './Title';

const dummyReviews = [
  {
    stars: 4,
    text: "t shirts were best quality and the comfort was awesome",
    author: "k lakshmi pathi reddy"
  },
  {
    stars: 5,
    text: "especially loved the comfort",
    author: "vasanth bandari"
  },
  {
    stars: 5,
    text: "T-shirts are so nice! Worth the price, with great quality and a perfect fit. Highly recommend!",
    author: "siva shankar"
  },
  {
    stars: 5,
    text: "T shirts are very stylish and very comfortable 🥰 I loved the overall experience from this Brand",
    author: "shubhnarayan pandey"
  }
];

const HomeReviews = () => {
  // We duplicate the reviews a few times to create a seamless infinite scroll effect
  const repeatedReviews = [...dummyReviews, ...dummyReviews, ...dummyReviews];

  return (
    <div className="my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      
      <div className="text-center py-8 text-3xl">
        <Title text1={'WHAT PEOPLE'} text2={'ARE SAYING'} />
        <div className="flex flex-col items-center justify-center mt-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm sm:text-base text-gray-600 font-medium">Rated 4.9 of 5</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">Feeling inspired already? Order for yourself!</p>
        </div>
      </div>

      {/* Reviews Marquee */}
      <div className="relative max-w-[100vw] overflow-hidden -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        
        {/* Gradients to fade out edges */}
        <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee hover:animate-pause gap-6 pb-12 pt-6 w-max">
          {repeatedReviews.map((review, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 w-[260px] sm:w-[300px] flex flex-col justify-between p-6 sm:p-8 rounded border border-gray-200 bg-gray-50 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 hover:bg-white hover:border-[#6B4E2E]"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < review.stars ? "fill-yellow-500 text-yellow-500" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <p className="text-sm sm:text-base font-medium leading-relaxed text-gray-700 whitespace-normal">
                  {review.text}
                </p>
              </div>
              
              <p className="text-xs font-semibold text-gray-500 mt-6 tracking-wide uppercase">
                {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
        
      {/* CSS for animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333% - 8px)); } /* 8px is a third of the 24px gap roughly to make it seamless */
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-pause:hover {
          animation-play-state: paused;
        }
      `}} />

    </div>
  );
};

export default HomeReviews;
