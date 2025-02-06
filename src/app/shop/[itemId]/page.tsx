import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Order Complete - Naruto Otaku Shop", // Title when order is complete
    description: "Thank you for your purchase! Your Naruto Otaku Shop order has been successfully processed. We hope you enjoy your new anime collectibles!",
    keywords: "Naruto, Otaku, Anime, Order, Complete, Purchase, Thank you, Order Confirmation",
    openGraph: {
      title: "Order Success - Naruto Otaku Shop", // Open Graph title for social sharing
      description: "Your Naruto Otaku Shop order has been successfully completed. We appreciate your business and hope you enjoy your collectibles!",
      url: "http://localhost:3000/order/success", // Update URL to reflect the correct success page URL
      type: "website", // Type of content  // Add a relevant image (e.g., order confirmation or related product)
      siteName: "Naruto Otaku Shop",
    },
};

  

export default function ItemId() {
  return (
    <div className='flex flex-col h-full items-center'>
        <h1 className="mt-4 mb-4 text-2xl md:text-3xl font-rock text-white text-stroke-title text-shadow-xl">Item#</h1>
        
        <section className="flex flex-col justify-top items-center w-[50vw] landscape-sm:w-[40vw] landscape-xl:w-[45vw] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md p-4">
            
            {/* Container for the image */}
            <div className='w-full landscape-sm:w-full landscape-xl:w-full h-[25vh] landscape-xl:h-[40vh] border border-black mt-4 mb-4'>
                {/* Add image or content here */}
            </div>
            
            {/* Pricing and Item details */}
            <div className='flex flex-col justify-start items-center w-full gap-4'>
                <div className='flex flex-row justify-around w-full landscape-sm:w-full landscape-xl:w-full'>
                    <p className="font-notojp text-white text-stroke text-shadow-xl text-xs md:text-lg lg:text-xl sm:text-sm landscape-sm:text-xs landscape-xl:text-2xl">Price: 32$</p>
                    <p className="font-notojp text-white text-stroke text-shadow-xl text-xs md:text-lg lg:text-xl sm:text-sm landscape-sm:text-xs landscape-xl:text-2xl">Item: Naruto</p>
                </div>

                {/* Button */}
                <button className="text-stroke text-shadow-xl w-full landscape-sm:w-full landscape-xl:w-full py-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white text-stroke text-sm md:text-lg lg:text-xl landscape-sm:text-xs landscape-xl:text-2xl">
                    Add To Cart
                </button>
            </div>
        </section>
    </div>
  )
}
