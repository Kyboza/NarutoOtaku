import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Order Details",
    description: "Fill in the details of your order at Naruto Otaku Shop. Track your purchase and ensure everything is correct before shipping.",
    keywords: "Naruto, Otaku, Anime, Order Details, Purchase, Tracking, Shipping, Collectibles, Order Shipment",
    openGraph: {
      title: "Order Details - Naruto Otaku Shop",
      description: "Check your order details and track your Naruto Otaku Shop purchase. Make sure your shipping details are correct!",
      url: "http://localhost:3000/details", // Update this to your live domain
      type: "website",
      siteName: "Naruto Otaku Shop",
    },
};


export default function Details() {
  return (
    <div className='flex flex-col items-center'>
      <h1 className="mb-2 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl landscape-lg:text-4xl landscape-xl:text-5xl 
                     font-rock text-white text-stroke-title text-shadow-xl">
        Details
      </h1>
      
      <form className='flex flex-col justify-evenly items-center 
                        w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] landscape-lg:w-[45vw] landscape-xl:w-[40vw] 
                        h-[60vh] sm:h-[55vh] md:h-[50vh] lg:h-[50vh] xl:h-[45vh] landscape-sm:h-[95vh] landscape-lg:h-[50vh] landscape-xl:h-[50vh] 
                        bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md p-4'>
        
        {/* Name Input */}
        <label htmlFor="ordername" className='offscreen'>Name</label>
        <input
          className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp 
                     placeholder:text-white placeholder:opacity-75 placeholder:text-sm sm:placeholder:text-base 
                     text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 landscape-lg:text-lg landscape-xl:text-xl' 
          type="text"
          id='ordername'
          name='ordername'
          required
          placeholder='Your Name'
          autoComplete='name'
          maxLength={30}
          spellCheck="false"
        />

        {/* Email Input */}
        <label htmlFor="orderemail" className='offscreen'>Email</label>
        <input
          className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp 
                     placeholder:text-white placeholder:opacity-75 placeholder:text-sm sm:placeholder:text-base 
                     text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 landscape-lg:text-lg landscape-xl:text-xl' 
          type="email"
          id='orderemail'
          name='orderemail'
          required
          placeholder='Your Email'
          autoComplete='email'
          maxLength={40}
          spellCheck="false"
        />

        {/* Country Input */}
        <label htmlFor="ordercountry" className='offscreen'>Country</label>
        <input
          className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp 
                     placeholder:text-white placeholder:opacity-75 placeholder:text-sm sm:placeholder:text-base 
                     text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 landscape-lg:text-lg landscape-xl:text-xl' 
          type="text"
          id='ordercountry'
          name='ordercountry'
          required
          placeholder='Country'
          maxLength={40}
          spellCheck="false"
        />

        {/* City Input */}
        <label htmlFor="ordercity" className='offscreen'>City</label>
        <input
          className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp 
                     placeholder:text-white placeholder:opacity-75 placeholder:text-sm sm:placeholder:text-base 
                     text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 landscape-lg:text-lg landscape-xl:text-xl' 
          type="text"
          id='ordercity'
          name='ordercity'
          required
          placeholder='City'
          maxLength={40}
          spellCheck="false"
        />

        {/* Address Input */}
        <label htmlFor="orderadress" className='offscreen'>Address</label>
        <input
          className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp 
                     placeholder:text-white placeholder:opacity-75 placeholder:text-sm sm:placeholder:text-base 
                     text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 landscape-lg:text-lg landscape-xl:text-xl' 
          type="text"
          id='orderadress'
          name='orderadress'
          required
          placeholder='Address'
          maxLength={50}
          spellCheck="false"
        />

        {/* Zip Input */}
        <label htmlFor="orderzip" className='offscreen'>Zip</label>
        <input
          className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp 
                     placeholder:text-white placeholder:opacity-75 placeholder:text-sm sm:placeholder:text-base 
                     text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 landscape-lg:text-lg landscape-xl:text-xl' 
          type="number"
          id='orderzip'
          name='orderzip'
          required
          placeholder='Zip-Code'
          maxLength={10}
          spellCheck="false"
        />
      </form>

      {/* Checkout Button */}
      <div className='w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] landscape-lg:w-[45vw] landscape-xl:w-[40vw] flex justify-end'>
        <button className='w-[40%] sm:w-[35%] md:w-[30%] lg:w-[25%] xl:w-[20%] landscape-lg:w-[20%] landscape-xl:w-[18%] 
                           py-1 mt-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white 
                           text-sm sm:text-base md:text-lg lg:text-xl landscape-lg:text-lg landscape-xl:text-lg text-stroke text-shadow-xl'>
          Checkout
        </button>
      </div>
    </div>
  );
}
