"use client";
import React from "react";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiCrunchyroll } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="w-full relative bottom-0 z-10 flex flex-row justify-between items-start bg-[#D48900] border-t border-black border-opacity-25 shadow-[0px_-10px_8px_rgba(0,0,0,0.03)] py-2 px-4 mt-2">
      {/* Left Column: Copyright & Social Icons */}
      <div className="w-1/2 flex flex-col items-start">
        <p className="font-bold font-notojp text-xs md:text-sm lg:text-lg text-white text-shadow-letter-border">
          © 2025 Naruto Otaku.
        </p>
        <div className="flex flex-row items-center gap-2 mt-1">
          <FaXTwitter className="text-white text-xl md:text-2xl lg:text-3xl drop-shadow-xl hover:cursor-pointer" />
          <FaYoutube className="text-white text-xl md:text-2xl lg:text-3xl drop-shadow-xl hover:cursor-pointer" />
          <FaInstagram className="text-white text-xl md:text-2xl lg:text-3xl drop-shadow-xl hover:cursor-pointer" />
          <SiCrunchyroll className="text-white text-xl md:text-2xl lg:text-3xl drop-shadow-xl hover:cursor-pointer" />
        </div>
      </div>

      {/* Right Column: Navigation Links */}
      <div className="w-1/2 flex flex-row items-center justify-end gap-3">
        <p className="font-bold font-notojp text-xs md:text-sm lg:text-lg text-white text-shadow-letter-border hover:cursor-pointer">
          Shop
        </p>
        <p className="font-bold font-notojp text-xs md:text-sm lg:text-lg text-white text-shadow-letter-border hover:cursor-pointer">
          Forum
        </p>
        <p className="font-bold font-notojp text-xs md:text-sm lg:text-lg text-white text-shadow-letter-border hover:cursor-pointer">
          Contact
        </p>
        <p className="font-bold font-notojp text-xs md:text-sm lg:text-lg text-white text-shadow-letter-border hover:cursor-pointer">
          Popular
        </p>
      </div>
    </footer>
  );
}
