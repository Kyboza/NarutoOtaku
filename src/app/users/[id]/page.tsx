import React from 'react'
import Image from 'next/image'

export default function User() {
  return (
    <div className="flex flex-col items-center px-4">
      {/* Profile Section */}
      <section className="flex flex-col md:flex-row w-full max-w-[90vw] mt-6 bg-[#A5A5A5] bg-opacity-75 border border-black rounded-md overflow-hidden shadow-sm">
        {/* Image Column */}
        <div className="w-full md:w-1/3 flex justify-center items-center p-4">
          <div className="relative w-40 h-40 border rounded-md border-black">
            <Image
              src="/images/profilepic/Obito.webp"
              alt="Profile Picture"
              className="object-cover rounded-md"
              fill
            />
          </div>
        </div>
        {/* Info Column */}
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center p-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-notojp text-white drop-shadow mb-2">
            Martin
          </h1>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm md:text-base text-white font-notojp">Gender: Male</p>
            <p className="text-sm md:text-base text-white font-notojp">Age: 25</p>
            <p className="text-sm md:text-base text-white font-notojp">Weight: 80kg</p>
            <p className="text-sm md:text-base text-white font-notojp">Fighting Style: Taijutsu</p>
          </div>
        </div>
        {/* Follow Column */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4">
          <button className="w-28 h-10 border border-black text-sm md:text-base font-notojp text-white hover:cursor-pointer mb-2">
            Follow+
          </button>
          <p className="text-sm md:text-base text-white font-notojp">34 Followers</p>
        </div>
      </section>

      {/* About Me Section */}
      <section className="w-full max-w-[90vw] p-4 bg-[#A5A5A5] bg-opacity-75 border border-black rounded-md mt-4 mb-6 max-h-[40vh] overflow-y-auto scrollbar-hide">
        <h2 className="text-2xl md:text-3xl font-notojp text-white drop-shadow mb-2">About Me</h2>
        <p className="text-sm md:text-base text-white font-notojp whitespace-pre-line">
          A dedicated Naruto fan with a deep appreciation for the world of shinobi, from the emotional depth of character backstories to the intensity of high-stakes battles. Whether its analyzing Itachis complex morality, debating the strongest Hokage, or ranking the most powerful jutsu, Im always eager to dive into discussions. I enjoy uncovering hidden details, exploring fan theories, and reliving the most iconic moments from the series. Narutos themes of perseverance, friendship, and destiny resonate deeply with me, and I love connecting with fellow Naruto enthusiasts!
        </p>
      </section>
    </div>
  )
}