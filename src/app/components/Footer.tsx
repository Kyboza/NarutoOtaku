import React from 'react'
import { FaYoutube, FaInstagram} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiCrunchyroll } from "react-icons/si";

export default function Footer() {
  return (
    <footer className='bg-[#D48900] z-1 h-[15dvh] lg:h-[15vh] border-t border-opacity-[25%] border-t-black relative bottom-0 flex flex-row justify-between items-center shadow-[0px_-20px_13px_rgba(0,0,0,0.03)]'>
        <div className='w-[70%] h-[15vh] flex flex-col'>
            <div className='ml-2 h-[7.5vh] flex items-center'>
                <p className='font-bold font-notojp text-sm md:text-2xl lg:text-4xl landscape-sm:text-xs landscape-md:text-xs landscape-xl:text-2xl text-white text-shadow-letter-border'>@Copyright 2025 Naruto Otaku.</p>
            </div>

            <div className='ml-2 h-[7.5vh] flex flex-row gap-3 items-center'>
                <FaXTwitter className='text-white text-2xl md:text-5xl lg:text-7xl landscape-sm:text-sm landscape-md:text-sm landscape-lg:text-2xl landscape-xl:text-4xl drop-shadow-xl :hover cursor-pointer'/>
                <FaYoutube className='text-white text-2xl md:text-5xl lg:text-7xl landscape-sm:text-sm landscape-md:text-sm landscape-lg:text-2xl landscape-xl:text-4xl drop-shadow-xl :hover cursor-pointer'/>
                <FaInstagram className='text-white text-2xl md:text-5xl lg:text-7xl landscape-sm:text-sm landscape-md:text-sm landscape-lg:text-2xl landscape-xl:text-4xl drop-shadow-xl :hover cursor-pointer'/>
                <SiCrunchyroll className='text-white text-2xl md:text-5xl lg:text-7xl landscape-sm:text-sm landscape-md:text-sm landscape-lg:text-2xl landscape-xl:text-4xl drop-shadow-xl :hover cursor-pointer'/>
            </div>
        </div>

        <div className='flex flex-col landscape-sm:flex-row landscape-md:flex-row h-[15vh] landscape-sm:h-[5vh] landscape-md:h-[5vh] w-[30%] items-center justify-center'>
            <p className='text-white text-sm md:text-xl lg:text-4xl landscape-sm:text-xs landscape-sm:mr-3 landscape-xl:text-2xl font-bold font-notojp text-shadow-letter-border :hover cursor-pointer'>Shop</p>
            <p className='text-white text-sm md:text-xl lg:text-4xl landscape-sm:text-xs landscape-sm:mr-3 landscape-xl:text-2xl font-bold font-notojp text-shadow-letter-border :hover cursor-pointer'>Forum</p>
            <p className='text-white text-sm md:text-xl lg:text-4xl landscape-sm:text-xs landscape-sm:mr-3 landscape-xl:text-2xl font-bold font-notojp text-shadow-letter-border :hover cursor-pointer'>Contact</p>
            <p className='text-white text-sm md:text-xl lg:text-4xl landscape-sm:text-xs landscape-sm:mr-3 landscape-xl:text-2xl font-bold font-notojp text-shadow-letter-border :hover cursor-pointer'>Popular</p>
        </div>
    </footer>
  )
}
