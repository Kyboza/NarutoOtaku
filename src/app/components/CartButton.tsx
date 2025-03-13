import React from 'react'
import { UseSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { IItem } from '../../../types'
import { addItem } from '../store/cartSlice'

export default function CartButton({item}: {item: IItem}) {
    const dispatch = useDispatch<AppDispatch>()

    const updateCart = () => {
        try {

        } catch(error){
            handleError(error)
        }
    }
  return (
    <button onClick={updateCart} className="w-[80%] bg-[#E19B1A] border p-0.5 border-black rounded-md font-notojp text-white text-stroke text-xs md:text-lg md:p-0">
        Add To Cart
    </button>
  )
}
