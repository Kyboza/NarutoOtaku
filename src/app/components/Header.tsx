"use client";
import React, { useState } from "react";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative top-0 z-10 h-[10vh] flex justify-between items-center bg-[#D48900] border-b border-black border-opacity-25 drop-shadow-xl">
      {/* Hamburger Button */}
      <button
        className="relative flex items-center justify-center h-[4vh] sm:h-[6vh] lg:h-[7.5vh] w-[20vw] ml-1 cursor-pointer z-20"
        onClick={() => setIsOpen((prev) => !prev)}

      >
        <div
          className={`absolute top-[25%] h-[0.5vh] w-[3vh] xl:w-[5vh] bg-white rounded-md transition-all ${
            isOpen ? "animate-hamburgerOpen" : "animate-hamburgerClose"
          }`}
        ></div>
        <div
          className={`absolute top-[50%] h-[0.5vh] w-[3vh] xl:w-[5vh] bg-white rounded-md transition-all ${
            isOpen ? "animate-hamburgerOpen" : "animate-hamburgerClose"
          }`}
        ></div>
        <div
          className={`absolute top-[75%] h-[0.5vh] w-[3vh] xl:w-[5vh] bg-white rounded-md transition-all ${
            isOpen ? "animate-hamburgerOpen" : "animate-hamburgerClose"
          }`}
        ></div>
      </button>

      {/* Logo Section */}
      <figure className="flex justify-center items-center w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[25vw]">
        <Image
          className="object-contain"
          src="/images/website-standard/NarutoLogo.svg"
          alt="Naruto Otaku Website Logo"
          priority
          fill
        />
        <figcaption className="sr-only">Naruto Website Logo</figcaption>
      </figure>

      {/* Icons Section */}
      <div className="flex items-center justify-center gap-4 sm:w-[40vw] md:w-[30vw] lg:w-[20vw]">
        <FaShoppingCart className="text-white text-2xl md:text-3xl lg:text-4xl drop-shadow-xl" />
        <FaUserAlt className="text-white text-2xl md:text-3xl lg:text-4xl drop-shadow-xl" />
        <IoGlobeOutline className="text-white text-2xl md:text-3xl lg:text-4xl drop-shadow-xl" />
      </div>
    </header>
  );
}
