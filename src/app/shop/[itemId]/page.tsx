import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Order Complete - Naruto Otaku Shop",
    description: "Thank you for your purchase! Your Naruto Otaku Shop order has been successfully processed. We hope you enjoy your new anime collectibles!",
    keywords: "Naruto, Otaku, Anime, Order, Complete, Purchase, Thank you, Order Confirmation",
    openGraph: {
      title: "Order Success - Naruto Otaku Shop",
      description: "Your Naruto Otaku Shop order has been successfully completed. We appreciate your business and hope you enjoy your collectibles!",
      url: "http://localhost:3000/order/success",
      type: "website",
      siteName: "Naruto Otaku Shop",
    },
};

export default function ItemId() {
  return (
    <div className="flex flex-col h-full w-[75%] items-center">
        <h1 className="mt-4 mb-4 text-2xl md:text-3xl font-rock text-white text-stroke-title text-shadow-xl">Item#</h1>
        
        <section className="flex flex-col items-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md p-4">
            
            {/* Image Container */}
            <div className="w-full h-[25vh] sm:h-[30vh] md:h-[35vh] border border-black mt-4 mb-4">
                {/* Add image or content here */}
            </div>
            
            {/* Item Details */}
            <div className="flex flex-col items-center w-full gap-4">
                <div className="flex flex-row sm:flex-row justify-between w-full">
                    <p className="font-notojp text-white text-stroke text-shadow-xl text-xs sm:text-sm md:text-lg lg:text-xl">Price: 32$</p>
                    <p className="font-notojp text-white text-stroke text-shadow-xl text-xs sm:text-sm md:text-lg lg:text-xl">Item: Naruto</p>
                </div>

                {/* Button */}
                <button className="text-stroke text-shadow-xl w-full py-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white text-xs sm:text-sm md:text-lg lg:text-xl">
                    Add To Cart
                </button>
            </div>
        </section>
    </div>
  )
}
