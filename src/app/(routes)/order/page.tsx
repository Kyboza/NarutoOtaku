import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Order Complete - Naruto Otaku Shop",
  description: "Thank you for your purchase! Your Naruto Otaku Shop order has been successfully processed. We hope you enjoy your new anime collectibles!",
  keywords: "Naruto, Otaku, Anime, Order, Complete, Purchase, Thank you, Order Confirmation, Collectibles",
  openGraph: {
    title: "Order Success - Naruto Otaku Shop",
    description: "Your Naruto Otaku Shop order has been successfully completed. We appreciate your business and hope you enjoy your collectibles!",
    url: "http://localhost:3000/order", // Update this to your live domain
    type: "website",
    siteName: "Naruto Otaku Shop",
  },
};

export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center p-4">
      {/* Title */}
      <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rock text-white text-stroke-title text-shadow-xl">
        Order Success
      </h1>

      {/* Order Details Section */}
      <section className="flex flex-col items-center w-full sm:w-[50vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw] 
                         bg-[#A5A5A5] bg-opacity-75 border border-black rounded-md p-6 mb-6 shadow-lg gap-2">
        <div className="flex flex-row justify-between w-full">
          {/* Name */}
          <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Name:
          </p>
          <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Johan Clifford
          </p>
        </div>
        <div className="flex flex-row justify-between w-full">
          {/* Address */}
          <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Address:
          </p>
          <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Spejarvägen 17
          </p>
        </div>
        <div className="flex flex-row justify-between w-full">
          {/* Zip */}
          <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Zip:
          </p>
          <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            72240
          </p>
          </div>

          {/* City */}
          <div className="flex flex-row justify-between w-full">
          <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            City:
          </p>
          <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Vasteras
          </p>
          </div>

          {/* Country */}
          <div className="flex flex-row justify-between w-full">
          <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Country:
          </p>
          <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Sweden
          </p>
          </div>

          {/* Email */}
          <div className="flex flex-row justify-between w-full">
          <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Email:
          </p>
          <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            cjfc@hotmail.se
          </p>
          </div>

      </section>

      {/* "Okay" Button */}
      <button className="w-full sm:w-[50vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw] py-2 bg-[#E19B1A] border border-black 
                        rounded-md font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl 
                        xl:text-2xl hover:bg-[#d18a15] transition duration-300 ease-in-out">
        Okay
      </button>
    </div>
  );
}
