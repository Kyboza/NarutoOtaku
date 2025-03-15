"use client";
import { FaMinus, FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { clearCart, addItem, removeItem } from "@/app/store/cartSlice";
import { IItemCart } from "../../../../types";
import { persistor } from "@/app/store/store";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const items: IItemCart[] = useSelector((state: RootState) => state.cart.items);

  // If no items, show a message
  if (!items || items.length === 0) return <p>Your cart is empty.</p>;

  const removeItemCart = (itemId: string) => {
    dispatch(removeItem(itemId));
    persistor.flush() //tvingar direkt sync
  }




  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-rock text-white text-stroke-title text-shadow-xl">
        Cart
      </h1>
      {items.map((item) => (
        <section
          key={item._id}
          className="w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex flex-col bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md overflow-y-auto"
        >
          <div className="flex flex-row items-center justify-between py-4">
            <div className="w-[25%] h-[60%] rounded-sm ml-1">
              <Image
                src={item.image ? item.image : '/path/to/default-image.jpg'} // Provide a default fallback image
                alt="Product Image"
                className="w-full h-full object-contain"
                width={1300}
                height={1300}
              />
            </div>
            <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg">
              {item.amount}
            </p>
            <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg">
              {item.name}
            </p>
            <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg">
              {item.price}$
            </p>
            <div className="flex flex-row items-center">
              <button
                className="w-[2vw] h-[4vh] bg-[#E19B1A] border border-black rounded-md flex items-center justify-center mt-1 mr-1 text-white text-sm sm:text-base md:text-lg text-shadow-xl"
                onClick={() => removeItemCart(item._id)} // Assuming you want to remove items here
              >
                <FaMinus className="text-xxs sm:text-sm" />
              </button>
              <button
                className="w-[2vw] h-[4vh] bg-[#E19B1A] border border-black rounded-md flex items-center justify-center mt-1 mr-1 text-white text-sm sm:text-base md:text-lg text-shadow-xl"
                onClick={() => dispatch(addItem(item))} // Assuming you want to add items here
              >
                <FaPlus className="text-xxs sm:text-sm" />
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
