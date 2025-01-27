"use client";
import React from "react";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiCrunchyroll } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="relative bottom-0 z-1 flex flex-row justify-between items-center h-[15dvh] lg:h-[15vh] bg-[#D48900] border-t border-t-black border-opacity-[25%] shadow-[0px_-20px_13px_rgba(0,0,0,0.03)] landscape-sm:mt-2 landscape-md:mt-4 landscape-xl:mt-0 mt-4">
      <div className="flex flex-col w-[70%] h-[15vh]">
        <div className="flex items-center h-[7.5vh] ml-2">
          <p className="font-bold font-notojp text-xs md:text-2xl lg:text-4xl text-white text-shadow-letter-border landscape-sm:text-xs landscape-md:text-xs landscape-xl:text-2xl">
            @Copyright 2025 Naruto Otaku.
          </p>
        </div>
        
        <div className="flex flex-row items-center gap-3 h-[7.5vh] ml-2">
          <FaXTwitter className="text-white text-2xl md:text-5xl lg:text-7xl drop-shadow-xl landscape-sm:text-sm landscape-md:text-sm landscape-lg:text-2xl landscape-xl:text-4xl :hover cursor-pointer" />
          <FaYoutube className="text-white text-2xl md:text-5xl lg:text-7xl drop-shadow-xl landscape-sm:text-sm landscape-md:text-sm landscape-lg:text-2xl landscape-xl:text-4xl :hover cursor-pointer" />
          <FaInstagram className="text-white text-2xl md:text-5xl lg:text-7xl drop-shadow-xl landscape-sm:text-sm landscape-md:text-sm landscape-lg:text-2xl landscape-xl:text-4xl :hover cursor-pointer" />
          <SiCrunchyroll className="text-white text-2xl md:text-5xl lg:text-7xl drop-shadow-xl landscape-sm:text-sm landscape-md:text-sm landscape-lg:text-2xl landscape-xl:text-4xl :hover cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-[30%] h-[15vh] landscape-sm:flex-row landscape-md:flex-row landscape-sm:h-[5vh] landscape-md:h-[5vh]">
        <p className="font-bold font-notojp text-white text-sm md:text-xl lg:text-4xl text-shadow-letter-border landscape-sm:text-xs landscape-sm:mr-3 landscape-xl:text-2xl :hover cursor-pointer">
          Shop
        </p>
        <p className="font-bold font-notojp text-white text-sm md:text-xl lg:text-4xl text-shadow-letter-border landscape-sm:text-xs landscape-sm:mr-3 landscape-xl:text-2xl :hover cursor-pointer">
          Forum
        </p>
        <p className="font-bold font-notojp text-white text-sm md:text-xl lg:text-4xl text-shadow-letter-border landscape-sm:text-xs landscape-sm:mr-3 landscape-xl:text-2xl :hover cursor-pointer">
          Contact
        </p>
        <p className="font-bold font-notojp text-white text-sm md:text-xl lg:text-4xl text-shadow-letter-border landscape-sm:text-xs landscape-sm:mr-3 landscape-xl:text-2xl :hover cursor-pointer">
          Popular
        </p>
      </div>
    </footer>
  );
}
