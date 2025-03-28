"use client"
import React from "react"
import { FaYoutube, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiCrunchyroll } from "react-icons/si"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="relative bottom-0 z-10 mt-2 flex w-full flex-row items-start justify-between border-t border-black border-opacity-25 bg-[#D48900] px-4 py-2 shadow-[0px_-10px_8px_rgba(0,0,0,0.03)]">
            <div className="flex w-1/2 flex-col items-start">
                <p className="font-notojp text-xs font-bold text-white text-shadow-letter-border md:text-sm lg:text-lg">
                    © 2025 Naruto Otaku
                </p>
                <div className="mt-1 flex flex-row items-center gap-2">
                    <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaXTwitter className="text-xl text-white drop-shadow-xl hover:cursor-pointer md:text-2xl lg:text-3xl" />
                    </a>
                    <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaYoutube className="text-xl text-white drop-shadow-xl hover:cursor-pointer md:text-2xl lg:text-3xl" />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaInstagram className="text-xl text-white drop-shadow-xl hover:cursor-pointer md:text-2xl lg:text-3xl" />
                    </a>
                    <a
                        href="https://crunchyroll.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <SiCrunchyroll className="text-xl text-white drop-shadow-xl hover:cursor-pointer md:text-2xl lg:text-3xl" />
                    </a>
                </div>
            </div>

            <div className="flex w-1/2 flex-row items-center justify-end gap-3">
                <Link href="/shop">
                    <p className="font-notojp text-xs font-bold text-white text-shadow-letter-border hover:cursor-pointer md:text-sm lg:text-lg">
                        Shop
                    </p>
                </Link>
                <Link href="/forum">
                    <p className="font-notojp text-xs font-bold text-white text-shadow-letter-border hover:cursor-pointer md:text-sm lg:text-lg">
                        Forum
                    </p>
                </Link>
                <Link href="/characters">
                    <p className="font-notojp text-xs font-bold text-white text-shadow-letter-border hover:cursor-pointer md:text-sm lg:text-lg">
                        Read
                    </p>
                </Link>
                <Link href="/">
                    <p className="font-notojp text-xs font-bold text-white text-shadow-letter-border hover:cursor-pointer md:text-sm lg:text-lg">
                        Home
                    </p>
                </Link>
            </div>
        </footer>
    )
}
