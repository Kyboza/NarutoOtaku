"use client"
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { IItem } from '../../../types'
import { addItem } from '../store/cartSlice'
// import { addOneCart } from '../actions/userActions'


export default function CartButton({item}: {item: IItem}) {
    const dispatch = useDispatch<AppDispatch>()
    const {_id, name, price, amount } = item;

    const updateCart = async () => {
        try {
          dispatch(addItem({_id, name, price, amount}))
          // await addOneCart(_id)
          console.log('succesfully added to cart')
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