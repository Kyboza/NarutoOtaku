"use client"
import React from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { IItemCart } from "../../../types"
import { addItem } from "../store/cartSlice"

export default function CartButton({ item }: { item: IItemCart }) {
    const dispatch = useDispatch<AppDispatch>()

    const updateCart = async () => {
        try {
            dispatch(addItem(item))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <button
            onClick={updateCart}
            className="text-stroke w-[80%] transform rounded-md border border-black bg-[#E19B1A] p-0.5 font-notojp text-xs text-white transition-all duration-100 ease-in-out hover:scale-105 active:scale-95 md:p-0 md:text-lg"
        >
            Add To Cart
        </button>
    )
}
