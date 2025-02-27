"use client";
import React, { useState } from "react";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

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
      <Link href="/">
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
      </Link>

      {/* Icons Section */}
      <div className="flex items-center justify-center gap-4 sm:w-[40vw] md:w-[30vw] lg:w-[20vw]">
        <FaShoppingCart className="text-white text-2xl md:text-3xl lg:text-4xl drop-shadow-xl" />
        <Link href="/login">
          <FaUserAlt className="text-white text-2xl md:text-3xl lg:text-4xl drop-shadow-xl" />
        </Link>
        <IoGlobeOutline className="text-white text-2xl md:text-3xl lg:text-4xl drop-shadow-xl" />
      </div>

          <ul className={`flex flex-col justify-evenly items-center bg-[#A5A5A5] bg-opacity-90 border border-black rounded-md rounded-tl-none rounded-tr-none absolute top-[100%] left-0 w-screen h-auto min-h[25vh] transition-all duration-800 ease-in-out  ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <Link className="w-full border-b border-b-black" href='/forum'><li className="flex justify-center font-notojp text-white text-stroke leading-5 text-shadow-xl p-2 md:text-lg lg:text-xl">
              Forum
            </li></Link>
            <Link className="w-full border-b border-b-black" href='/shop'><li className="flex justify-center font-notojp text-white text-stroke leading-5 text-shadow-xl p-2 md:text-lg lg:text-xl">
              Shop
            </li></Link>
            <Link className="w-full border-b border-b-black" href='/characters'><li className="flex justify-center font-notojp text-white text-stroke leading-5 text-shadow-xl p-2 md:text-lg lg:text-xl">
              Characters
            </li></Link>
            <li className="flex justify-center w-full font-notojp text-white text-stroke leading-5 text-shadow-xl border-b border-b-black p-2 md:text-lg lg:text-xl">
              Profile
            </li>
            <li className="flex justify-center w-full font-notojp text-white text-stroke leading-5 text-shadow-xl border-b border-b-black p-2 md:text-lg lg:text-xl">
              Logout
            </li>
          </ul>
    </header>
  );
}
