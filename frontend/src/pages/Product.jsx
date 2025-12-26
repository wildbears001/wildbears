import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { assets } from '../assets/assets';
import PreOrderInfo from '../components/PreOrderInfo';
import SizeChart from '../components/SizeChart';
import ReviewSection from '../components/ReviewSection';
import { useSwipeable } from 'react-swipeable';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { products, currency, addTOCart, user } = useContext(ShopContext);
  const userId = user?._id;

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentProduct = products.find((item) => item._id === productId);
    if (currentProduct) {
      setProductData(currentProduct);
      setSelectedImage(currentProduct.image[0]);
      setCurrentIndex(0);
    }
  }, [productId, products]);

  const handleNextImage = () => {
    if (!productData) return;
    const next = (currentIndex + 1) % productData.image.length;
    setCurrentIndex(next);
    setSelectedImage(productData.image[next]);
  };

  const handlePrevImage = () => {
    if (!productData) return;
    const prev =
      (currentIndex - 1 + productData.image.length) %
      productData.image.length;
    setCurrentIndex(prev);
    setSelectedImage(productData.image[prev]);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNextImage,
    onSwipedRight: handlePrevImage,
    trackMouse: true
  });

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size before adding to cart.');
      return;
    }
    addTOCart(productData._id, selectedSize);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error('Please select a size before purchasing.');
      return;
    }
    addTOCart(productData._id, selectedSize);
    navigate('/cart');
  };

  if (!productData) return null;

  const {
    name,
    actualPrice,
    price,
    image,
    description,
    features,
    quality,
    type,
    sizes,
    category,
    subCategory,
    isPreOrder,
    preOrderAvailableDate,
    maxPreOrderQty
  } = productData;

  const discountPercentage =
    actualPrice && price
      ? Math.round(((actualPrice - price) / actualPrice) * 100)
      : 0;

  return (
    <div className="border-t-2 pt-10 text-[#6B4E2E]">
      <ToastContainer />

      <div className="flex flex-col sm:flex-row gap-12">
        {/* ================= IMAGES ================= */}
        <div className="flex-1 flex flex-col sm:flex-row-reverse gap-4">
          {/* MAIN IMAGE */}
          <div {...handlers} className="relative w-full sm:w-[80%]">
            <img
              src={selectedImage}
              alt="Product"
              className="w-full h-auto rounded-lg object-cover"
            />

            {/* Mobile arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full sm:hidden"
            >
              ‹
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full sm:hidden"
            >
              ›
            </button>
          </div>

          {/* THUMBNAILS */}
          <div className="flex sm:flex-col gap-3 sm:w-[20%] overflow-x-auto sm:overflow-visible">
            {image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => {
                  setSelectedImage(img);
                  setCurrentIndex(idx);
                }}
                className={`w-20 h-20 sm:w-full sm:h-auto object-cover rounded cursor-pointer border ${
                  selectedImage === img
                    ? 'border-[#6B4E2E]'
                    : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= INFO ================= */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium">{name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} className="w-4" />
            ))}
            <img src={assets.star_dull_icon} className="w-4" />
            <span className="pl-2 text-sm">(1)</span>
          </div>

          <p className="mt-5 text-lg text-[#8B6A4A]">
            Actual Price:{' '}
            <del className="text-red-500">
              {currency} {actualPrice}
            </del>
          </p>

          <p className="mt-1 text-3xl font-semibold text-red-600">
            {currency}
            {price}
            <span className="ml-3 text-base text-green-600">
              ({discountPercentage}% OFF)
            </span>
          </p>

          {isPreOrder && (
            <div className="bg-yellow-100 border border-yellow-500 p-4 rounded mt-5 text-sm">
              <PreOrderInfo availableDate={preOrderAvailableDate} />
              {maxPreOrderQty && (
                <p>
                  Max Pre-Order Quantity:{' '}
                  <strong>{maxPreOrderQty}</strong>
                </p>
              )}
            </div>
          )}

          <p className="mt-5 text-[#8B6A4A]">{description}</p>
          <p className="mt-3"><b>Features:</b> {features}</p>
          <p className="mt-2"><b>Type:</b> {type}</p>
          <p className="mt-2"><b>Fabric:</b> {quality}</p>

          {/* SIZE */}
          <div className="my-8">
            <p className="mb-2">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 rounded ${
                    selectedSize === size
                      ? 'bg-[#6B4E2E] text-white'
                      : 'bg-[#EFE2C6]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="bg-[#6B4E2E] text-white px-8 py-3 rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-[#6B4E2E] text-white px-8 py-3 rounded"
            >
              Buy Now
            </button >
            <SizeChart  />
          </div>

          <hr className="mt-8" />
          <ul className="text-sm mt-5 list-disc list-inside text-[#8B6A4A]">
            <li>100% Original Product</li>
            <li>Cash on Delivery available</li>
            <li>7-Day Return & Exchange Policy</li>
          </ul>
        </div>
      </div>

      {/* <ReviewSection productId={productId} userId={userId} /> */}
      <RelatedProducts category={category} subCategory={subCategory} />
    </div>
  );
};

export default Product;
