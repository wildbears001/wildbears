import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const { currency, delivery_fee, free_delivery_threshold, getCartAmount } = useContext(ShopContext);

    const subTotal = getCartAmount();
    const isFreeDelivery = free_delivery_threshold > 0 && subTotal >= free_delivery_threshold;
    const effectiveDeliveryFee = isFreeDelivery ? 0 : delivery_fee;
    const grandTotal = subTotal === 0 ? 0 : subTotal + effectiveDeliveryFee;
    const amountToFree = free_delivery_threshold - subTotal;

    return (
        <div className='w-full'>
            <div className='text-2xl mb-6'>
                <Title text1={'ORDER'} text2={'SUMMARY'} />
            </div>

            {/* Free delivery threshold banner */}
            {free_delivery_threshold > 0 && subTotal > 0 && !isFreeDelivery && (
                <div className='mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700 flex items-center gap-3 shadow-sm'>
                    <span className="text-xl">🚚</span>
                    <span>Add <b>{currency}{amountToFree}</b> more for <b>FREE delivery</b></span>
                </div>
            )}
            {isFreeDelivery && (
                <div className='mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center gap-3 shadow-sm'>
                    <span className="text-xl">🎉</span>
                    <span>You've unlocked <b>FREE Delivery!</b></span>
                </div>
            )}

            <div className='flex flex-col gap-4 text-[15px] text-gray-700'>
                <div className='flex justify-between font-medium'>
                    <p>Sub Total</p>
                    <p>{currency} {subTotal}.00</p>
                </div>

                <hr className="border-gray-100" />
                <div className='flex justify-between font-medium'>
                    <p>Delivery Fee</p>
                    {isFreeDelivery
                        ? <p className='text-green-600 font-bold'>FREE</p>
                        : <p>{currency} {effectiveDeliveryFee}.00</p>
                    }
                </div>
                <hr className="border-gray-100" />
                <div className='flex justify-between text-lg mt-1'>
                    <b className="text-gray-900">Total</b>
                    <b className="text-[#6B4E2E]">{currency}{grandTotal}.00</b>
                </div>

                {/* Info line */}
                {free_delivery_threshold > 0 && (
                    <p className='text-xs text-gray-400 mt-1'>
                        🚚 Free delivery on orders above {currency}{free_delivery_threshold}
                    </p>
                )}
            </div>
        </div>
    )
}

export default CartTotal
