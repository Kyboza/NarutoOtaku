"use client"
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { IItemCart } from '../../../types'
import { addItem } from '../store/cartSlice'
import { revalidate } from '../actions/userActions'


export default function CartButton({item}: {item: IItemCart}) {
    const dispatch = useDispatch<AppDispatch>()
    // const {_id, name, image, price, amount } = item;
    const path = "/cart"

    const updateCart = async () => {
        try {
          dispatch(addItem(item))
          console.log('succesfully added to cart')
          revalidate(path)
        } catch(error){
            handleError(error)
        }
    }

  return (
    <button onClick={updateCart} className="w-[80%] bg-[#E19B1A] border p-0.5 border-black rounded-md font-notojp text-white text-stroke text-xs md:text-lg md:p-0 transform transition-all ease-in-out duration-100 hover:scale-105 active:scale-95">
        Add To Cart
    </button>
  )
}