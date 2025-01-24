"use client";
import React, { useState } from "react";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative top-0 z-1 h-[15vh] lg:h-[15vh] flex justify-between items-center bg-[#D48900] border-b border-b-black border-opacity-[25%] drop-shadow-xl">
      {/* Hamburger Button */}
      <button
        className="relative flex items-center justify-center h-[6dvh] w-[20vw] ml-1 :hovercursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`absolute top-[25%] h-[0.5vh] w-[4vh] bg-white rounded-md transition-all landscape-md:h-[0.75vh] landscape-md:w-[6vh] landscape-xl:h-[0.75vh] landscape-xl:w-[6vh] ${
            isOpen ? "animate-hamanimation" : "animate-hamanimationReverse"
          }`}
        ></div>
        <div
          className={`absolute top-[50%] h-[0.5vh] w-[4vh] bg-white rounded-md transition-all landscape-md:h-[0.75vh] landscape-md:w-[6vh] landscape-xl:h-[0.75vh] landscape-xl:w-[6vh] ${
            isOpen ? "animate-hamanimation" : "animate-hamanimationReverse"
          }`}
        ></div>
        <div
          className={`absolute top-[75%] h-[0.5vh] w-[4vh] bg-white rounded-md transition-all landscape-md:h-[0.75vh] landscape-md:w-[6vh] landscape-xl:h-[0.75vh] landscape-xl:w-[6vh] ${
            isOpen ? "animate-hamanimation" : "animate-hamanimationReverse"
          }`}
        ></div>
      </button>

      {/* Logo Section */}
      <figure className="flex justify-center items-center h-[12vh] w-[60vw]">
        <Image
          className="object-contain w-[75%] h-full"
          src="/images/website-standard/NarutoLogo.svg"
          alt="Naruto Otaku Website Logo"
          width={250}
          height={100}
        />
        <figcaption className="offscreen">Naruto Website Logo</figcaption>
      </figure>

      {/* Icons Section */}
      <div className="flex items-center justify-center flex-row gap-2 w-[20vw] mr-1">
        <FaShoppingCart className="text-white text-3xl md:text-5xl landscape-md:text-2xl lg:text-5xl landscape-lg:text-5xl drop-shadow-xl" />
        <FaUserAlt className="text-white text-3xl md:text-5xl landscape-md:text-2xl lg:text-5xl landscape-lg:text-5xl drop-shadow-xl" />
        <IoGlobeOutline className="text-white text-3xl md:text-5xl landscape-md:text-2xl lg:text-5xl landscape-lg:text-5xl drop-shadow-xl" />
      </div>
    </header>
  );
}

