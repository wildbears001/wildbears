import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { assets } from '../assets/assets';
import PreOrderInfo from '../components/PreOrderInfo';
import SizeChart from '../components/SizeChart';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Info, Zap, CheckCircle, Truck, RefreshCw, ShieldCheck, ChevronDown, Droplets } from 'lucide-react';

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 focus:outline-none group"
      >
        <span className="font-semibold text-gray-900 tracking-wide text-sm uppercase group-hover:text-[#6B4E2E] transition-colors">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} className="text-gray-400 group-hover:text-[#6B4E2E] transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm text-gray-600 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { products, currency, addTOCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Zoom state
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const scrollRef = React.useRef(null);

  useEffect(() => {
    const currentProduct = products.find((item) => item._id === productId);
    if (currentProduct) {
      setProductData(currentProduct);
      setSelectedImage(currentProduct.image[0]);
      setCurrentIndex(0);
    }
  }, [productId, products]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [productId]);

  const handleNextImage = () => {
    if (!productData) return;
    const next = (currentIndex + 1) % productData.image.length;
    handleThumbnailClick(productData.image[next], next);
  };

  const handlePrevImage = () => {
    if (!productData) return;
    const prev = (currentIndex - 1 + productData.image.length) % productData.image.length;
    handleThumbnailClick(productData.image[prev], prev);
  };

  const handleThumbnailClick = (img, idx) => {
    setSelectedImage(img);
    setCurrentIndex(idx);
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({ left: width * idx, behavior: 'smooth' });
    }
  };

  const handleScroll = (e) => {
    if (!productData) return;
    const width = e.target.offsetWidth;
    const scrollLeft = e.target.scrollLeft;
    const newIdx = Math.round(scrollLeft / width);
    if (newIdx !== currentIndex && productData.image[newIdx]) {
      setCurrentIndex(newIdx);
      setSelectedImage(productData.image[newIdx]);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNextImage,
    onSwipedRight: handlePrevImage,
    trackMouse: true
  });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const normalizedSizes = productData?.sizes?.map(s => typeof s === 'string' ? { size: s, stock: productData.stock } : s) || [];

  const handleAddToCart = () => {
    if (productData.stock <= 0) {
      toast.error('This product is out of stock.');
      return;
    }
    if (!selectedSize) {
      toast.error('Please select a size before adding to cart.');
      return;
    }
    const sizeData = normalizedSizes.find(s => s.size === selectedSize);
    if (sizeData && sizeData.stock <= 0) {
      toast.error('This size is out of stock.');
      return;
    }
    addTOCart(productData._id, selectedSize);
  };

  const handleBuyNow = () => {
    if (productData.stock <= 0) {
      toast.error('This product is out of stock.');
      return;
    }
    if (!selectedSize) {
      toast.error('Please select a size before purchasing.');
      return;
    }
    const sizeData = normalizedSizes.find(s => s.size === selectedSize);
    if (sizeData && sizeData.stock <= 0) {
      toast.error('This size is out of stock.');
      return;
    }
    navigate(`/placeorder?buyNow=true&productId=${productData._id}&size=${selectedSize}`);
  };

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#6B4E2E] rounded-full animate-spin"></div>
      </div>
    );
  }

  const {
    name,
    actualPrice,
    price,
    image,
    description,
    features,
    quality,
    type,
    category,
    subCategory,
    isPreOrder,
    preOrderAvailableDate,
    maxPreOrderQty,
    stock,
    bestseller
  } = productData;

  const discountPercentage = actualPrice && price ? Math.round(((actualPrice - price) / actualPrice) * 100) : 0;

  const renderBulletPoints = (text, isFeatures = false) => {
    if (!text) return null;
    let points = [];
    if (text.includes('\n')) {
      points = text.split('\n');
    } else if (isFeatures && text.includes(',')) {
      points = text.split(',');
    } else if (text.includes('.')) {
      points = text.split('.');
    } else {
      points = [text];
    }

    points = points.map(p => p.trim()).filter(p => p.length > 0);

    return (
      <ul className="space-y-2">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 bg-[#6B4E2E] rounded-full mt-2 shrink-0"></span>
            <span className="text-gray-600 leading-relaxed text-sm sm:text-base">{point}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pb-24 sm:pb-12 pt-6 sm:pt-10"
    >
      <ToastContainer position="bottom-right" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}


        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* ================= LEFT: MEDIA GALLERY ================= */}
          <div className="lg:w-3/5 flex flex-col-reverse sm:flex-row gap-4 lg:gap-6 lg:sticky lg:top-24 h-max">

            {/* THUMBNAILS */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible hide-scrollbar py-1">
              {image.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleThumbnailClick(img, idx)}
                  className={`relative flex-shrink-0 w-20 h-24 sm:w-24 sm:h-32 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${selectedImage === img ? 'ring-2 ring-[#6B4E2E] ring-offset-2 opacity-100 scale-[1.02]' : 'opacity-60 hover:opacity-100 border border-gray-100'
                    }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE WITH HOVER ZOOM (Desktop) */}
            <div
              className="hidden sm:block relative w-full h-[60vh] sm:h-[75vh] lg:h-[85vh] rounded-2xl bg-gray-50 overflow-hidden cursor-crosshair group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
            >
              <img
                src={selectedImage}
                alt={name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'}`}
              />

              {isZooming && (
                <div
                  className="absolute inset-0 bg-no-repeat pointer-events-none"
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '200%'
                  }}
                />
              )}

              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {bestseller && (
                  <span className="bg-[#6B4E2E] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-md">
                    Bestseller
                  </span>
                )}
                {isPreOrder && (
                  <span className="bg-[#8B6A4A] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-md">
                    Pre-Order
                  </span>
                )}
              </div>
            </div>

            {/* MOBILE HORIZONTAL SCROLL GALLERY */}
            <div className="sm:hidden w-full relative">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar rounded-2xl bg-gray-50 h-[60vh] scroll-smooth"
              >
                {image.map((img, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 snap-center h-full relative">
                    <img src={img} alt={`${name} - ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      {bestseller && idx === 0 && (
                        <span className="bg-[#6B4E2E] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-md">
                          Bestseller
                        </span>
                      )}
                      {isPreOrder && idx === 0 && (
                        <span className="bg-[#8B6A4A] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-md">
                          Pre-Order
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Swipe Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full pointer-events-none">
                {image.map((_, idx) => (
                  <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-white w-4' : 'bg-white/50'}`} />
                ))}
              </div>
            </div>
          </div>


          {/* ================= RIGHT: PRODUCT INFO ================= */}
          <div className="lg:w-2/5 flex flex-col pt-2 lg:pt-6">

            {/* Header & Title */}
            <div className="mb-6">
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">{category} • {subCategory}</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#6B4E2E] tracking-tight leading-[1.1]">{name}</h1>

              <div className="flex items-center gap-2 mt-4">
                <div className="flex text-yellow-400">
                  <Star fill="currentColor" size={14} />
                  <Star fill="currentColor" size={14} />
                  <Star fill="currentColor" size={14} />
                  <Star fill="currentColor" size={14} />
                  <Star size={14} className="text-gray-300" />
                </div>
                <span className="text-sm font-medium text-gray-500 underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-[#6B4E2E]">124 Reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-8 pb-8 border-b border-gray-100">
              <span className="text-3xl sm:text-4xl font-bold text-gray-900">{currency}{price}</span>
              {actualPrice > price && (
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg text-gray-400 line-through font-medium">{currency}{actualPrice}</span>
                  <span className="text-xs font-black text-[#6B4E2E] bg-[#EFE2C6] px-2 py-1 rounded uppercase tracking-wider">{discountPercentage}% OFF</span>
                </div>
              )}
            </div>

            {/* Pre Order Alert */}
            {isPreOrder && (
              <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <Info className="text-amber-600 mt-0.5 shrink-0" size={18} />
                <div>
                  <h4 className="text-sm font-bold text-amber-900 uppercase tracking-wide">Pre-Order Item</h4>
                  <PreOrderInfo availableDate={preOrderAvailableDate} />
                  {maxPreOrderQty && <p className="text-xs font-medium text-amber-700 mt-1">Limited to {maxPreOrderQty} units per customer.</p>}
                </div>
              </div>
            )}

            {/* Sizes */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-[#6B4E2E] uppercase tracking-widest">Select Size</span>
                <SizeChart />
              </div>

              <div className="flex flex-wrap gap-3">
                {normalizedSizes.map((item) => {
                  const isOutOfStock = item.stock <= 0;
                  const isSelected = selectedSize === item.size;

                  return (
                    <button
                      key={item.size}
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(item.size)}
                      className={`relative group h-14 min-w-[3.5rem] px-5 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-300 ${isSelected
                        ? 'bg-[#6B4E2E] text-white shadow-lg shadow-[#6B4E2E]/20 ring-2 ring-[#6B4E2E] ring-offset-2 scale-[1.02]'
                        : isOutOfStock
                          ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-50 overflow-hidden'
                          : 'bg-white text-[#6B4E2E] border border-gray-200 hover:border-[#6B4E2E] hover:bg-gray-50'
                        }`}
                    >
                      {item.size}
                      {isOutOfStock && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-gray-400 rotate-45 scale-150"></div></div>}
                    </button>
                  );
                })}
              </div>

              {/* Stock Status Label */}
              <div className="mt-4 h-6">
                <AnimatePresence mode="wait">
                  {selectedSize && (
                    <motion.div
                      key={selectedSize}
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    >
                      {(() => {
                        const sz = normalizedSizes.find(s => s.size === selectedSize);
                        if (!sz) return null;
                        if (sz.stock <= 0) return <p className="text-red-500 font-semibold text-sm flex items-center gap-1.5"><Info size={14} /> Currently out of stock.</p>;
                        if (sz.stock > 0 && sz.stock <= 3) return <p className="text-amber-600 font-bold text-sm flex items-center gap-1.5"><Zap size={14} /> Hurry! Only {sz.stock} units left.</p>;
                        if (sz.stock > 0) return <p className="text-green-600 font-semibold text-sm flex items-center gap-1.5"><CheckCircle size={14} /> In Stock and ready to ship.</p>;
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex flex-col xl:flex-row gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white text-[#6B4E2E] border border-[#6B4E2E] px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#6B4E2E] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#6B4E2E] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#5A4126] shadow-xl shadow-[#6B4E2E]/20 hover:shadow-[#6B4E2E]/30 transition-all duration-300 active:scale-95"
              >
                Buy Now
              </button>
            </div>

            {/* Delivery Trust Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-[#6B4E2E] shrink-0"><Truck size={18} /></div>
                <div>
                  <p className="text-sm font-bold text-[#6B4E2E]">Free Shipping</p>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">On orders over {currency}599</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-[#6B4E2E] shrink-0"><ShieldCheck size={18} /></div>
                <div>
                  <p className="text-sm font-bold text-[#6B4E2E]">Secure Payment</p>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">100% encrypted checkout</p>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="mb-10">
              <Accordion title="Product Description" defaultOpen={true}>
                {renderBulletPoints(description)}
              </Accordion>

              <Accordion title="Fabric & Material">
                <ul className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Quality</h4>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-[#6B4E2E] rounded-full mt-2 shrink-0"></span>
                      <span className="text-gray-600 text-sm sm:text-base">{quality}</span>
                    </li>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Style</h4>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-[#6B4E2E] rounded-full mt-2 shrink-0"></span>
                      <span className="text-gray-600 text-sm sm:text-base">{type}</span>
                    </li>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Key Features</h4>
                    {renderBulletPoints(features, true)}
                  </div>
                </ul>
              </Accordion>

              <Accordion title="Wash Care Instructions">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"><Droplets size={16} className="text-blue-500" /> Machine wash cold</div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"><Info size={16} className="text-gray-400" /> Do not bleach</div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"><Info size={16} className="text-gray-400" /> Tumble dry low</div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"><Info size={16} className="text-gray-400" /> Iron inside out</div>
                </div>
              </Accordion>
            </div>

          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24 pt-12 border-t border-gray-100">
          <RelatedProducts category={category} subCategory={subCategory} />
        </div>

      </div>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 sm:hidden z-50 transform transition-transform">
        <div className="flex gap-3 max-w-md mx-auto">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-white border border-[#6B4E2E] text-[#6B4E2E] py-3.5 rounded-xl font-bold uppercase tracking-widest shadow-sm flex items-center justify-center"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#6B4E2E] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-[#6B4E2E]/20"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
