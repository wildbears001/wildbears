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
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTAL'} />
            </div>

            {/* Free delivery threshold banner */}
            {free_delivery_threshold > 0 && subTotal > 0 && !isFreeDelivery && (
                <div className='mt-3 mb-1 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 flex items-center gap-2'>
                    <span>🚚</span>
                    <span>Add <b>{currency}{amountToFree}</b> more for <b>FREE delivery</b></span>
                </div>
            )}
            {isFreeDelivery && (
                <div className='mt-3 mb-1 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700 flex items-center gap-2'>
                    <span>🎉</span>
                    <span>You've unlocked <b>FREE Delivery!</b></span>
                </div>
            )}

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Sub Total</p>
                    <p>{currency} {subTotal}.00</p>
                </div>

                <hr />
                <div className='flex justify-between'>
                    <p>Delivery Fee</p>
                    {isFreeDelivery
                        ? <p className='text-green-600 font-semibold'>FREE</p>
                        : <p>{currency} {effectiveDeliveryFee}.00</p>
                    }
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency}{grandTotal}.00</b>
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
