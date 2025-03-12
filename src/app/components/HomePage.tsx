import React from 'react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-screen h-[25vh] border border-black bg-[url('/images/favchar/First.webp')] bg-cover bg-top flex justify-center items-end">
        <div className='absolute w-full h-[25vh] inset-0 flex justify-evenly items-center'>
          {/* Character Image */}
          <div className='relative w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[10vw] md:h-[10vw] border rounded-full overflow-hidden'>
            <Image
              className='object-cover'
              src="/images/favchar/Orochimaru2.webp"
              alt='Orochimaru'
              fill
            />
          </div>
          {/* Character Info */}
          <p className='font-rock text-white text-stroke-title text-shadow-xl text-xl sm:text-lg md:text-2xl'>
            #1
          </p>
          <p className='font-rock text-white text-stroke-title text-shadow-xl text-xl sm:text-lg md:text-2xl'>
            Orochimaru Sama
          </p>
        </div>
        {/* Heart and Like Count */}
        <div className='flex items-center mb-3 sm:mb-2 md:mb-5'>
          <p className='text-2xl mr-2 text-stroke-title text-shadow-xl md:text-3xl'>
            &#10084;&#65039;
          </p>
          <p className='font-rock text-white text-stroke-title text-shadow-xl text-xl sm:text-lg md:text-2xl'>
            623
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="mt-4 max-w-4xl p-4 flex flex-col items-center bg-[#A5A5A5] bg-opacity-75 border border-black rounded-md w-[80%]">
        <h1 className="mb-2 text-2xl sm:text-3xl font-rock text-white text-stroke-title text-shadow-xl">
          Welcome
        </h1>
        <p className="p-2 text-sm sm:text-lg md:text-xl font-notojp text-white text-stroke leading-5 text-shadow-xl">
          Welcome to our Naruto fan site, where you can immerse yourself in the world of ninjas! 
          Explore our shop for unique Naruto-themed items, interact with fellow fans in the forum to discuss episodes, 
          theories, and more. Dive into character profiles to learn about your favorite ninja, 
          and react to them to help them rise to the top as the most popular character on the site. 
          Above all, remember to have fun and enjoy the journey with fellow Naruto enthusiasts!
        </p>
      </section>
    </div>
  );
}
