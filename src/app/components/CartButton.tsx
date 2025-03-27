"use client"
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { IItemCart } from '../../../types'
import { addItem } from '../store/cartSlice'


export default function CartButton({item}: {item: IItemCart}) {
    const dispatch = useDispatch<AppDispatch>()

    const updateCart = async () => {
        try {
          dispatch(addItem(item))
        } catch(error){
            console.error(error)
        }
    }

  return (
    <button onClick={updateCart} className="w-[80%] bg-[#E19B1A] border p-0.5 border-black rounded-md font-notojp text-white text-stroke text-xs md:text-lg md:p-0 transform transition-all ease-in-out duration-100 hover:scale-105 active:scale-95">
        Add To Cart
    </button>
  )
}