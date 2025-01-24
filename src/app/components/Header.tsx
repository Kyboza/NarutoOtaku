"use client"
import React from 'react'
import { useState } from 'react';
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='bg-[#D48900] z-1 h-[15vh] lg:h-[15vh] border-b border-opacity-[25%] border-b-black relative top-0 flex justify-between items-center drop-shadow-xl'>
      <button className='h-[6dvh] w-[20vw] flex items-center justify-center relative ml-1 :hovercursor-pointer' onClick={() => setIsOpen(prev => !prev)}>
          <div className={`h-[0.5vh] w-[4vh] landscape-md:h-[0.75vh] landscape-md:w-[6vh] landscape-xl:h-[0.75vh] landscape-xl:w-[6vh] bg-white absolute top-[25%] rounded-md transition-all ${isOpen ? 'animate-hamanimation' : 'animate-hamanimationReverse'}`}></div>
          <div className={`h-[0.5vh] w-[4vh] landscape-md:h-[0.75vh] landscape-md:w-[6vh] landscape-xl:h-[0.75vh] landscape-xl:w-[6vh] bg-white absolute top-[50%] rounded-md transition-all ${isOpen ? 'animate-hamanimation' : 'animate-hamanimationReverse'}`}></div>
          <div className={`h-[0.5vh] w-[4vh] landscape-md:h-[0.75vh] landscape-md:w-[6vh] landscape-xl:h-[0.75vh] landscape-xl:w-[6vh] bg-white absolute top-[75%] rounded-md transition-all ${isOpen ? 'animate-hamanimation' : 'animate-hamanimationReverse'}`}></div>
      </button>

      <figure className='h-[12vh] w-[60vw] flex justify-center items-center'>
          <Image className='object-contain w-[75%] h-full' src="/images/website-standard/NarutoLogo.svg" alt="Naruto Otaku Website Logo" width={250} height={100}/>
          <figcaption className='offscreen'>Naruto Website Logo</figcaption>
      </figure>

      <div className='w-[20vw] flex items-center justify-center flex-row gap-2 mr-1'>
          <FaShoppingCart className='text-white text-2xl md:text-5xl landscape-md:text-2xl lg:text-5xl landscape-lg:text-5xl drop-shadow-xl'/>
          <FaUserAlt className='text-white text-xl md:text-5xl landscape-md:text-2xl  lg:text-5xl landscape-lg:text-5xl drop-shadow-xl'/>
          <IoGlobeOutline className='text-white text-2xl md:text-5xl landscape-md:text-2xl  lg:text-5xl landscape-lg:text-5xl drop-shadow-xl'/>
      </div>
    </header>
  )
}
