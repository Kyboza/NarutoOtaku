import React from 'react';
import Image from 'next/image';

export default function HomePage() {
//LÄS!! Lägg till metadata på ind char pages och städa upp massa.
  return (
    <div className="flex flex-col items-center">
      <section className="relative w-screen h-[25vh] border border-black bg-[url('/images/favchar/BackgroundChar.png')] bg-cover bg-top flex justify-center items-end">
        <div className='absolute w-full h-[25vh] inset-0 flex justify-evenly items-center'>
          <div className='relative w-[15vw] pb-[15vw] border rounded-full overflow-hidden landscape-md:w-[8vw] landscape-md:pb-[8vw]'>
            <Image
              className='object-cover'
              src="/images/favchar/Orochimaru2.webp" 
              alt='Orochimaru' 
              fill 
            />
          </div>
          <p className='font-rock text-white text-stroke-title text-shadow-xl text-xl md:text-3xl landscape-sm:text-lg landscape-md:text-2xl landscape-xl:text-4xl'>
            #1
          </p>
          <p className='font-rock text-white text-stroke-title text-shadow-xl text-xl md:text-3xl landscape-sm:text-lg landscape-md:text-2xl landscape-xl:text-4xl'>
            Orochimaru Sama
          </p>
        </div>
        <div className='flex flex-row mb-3 md:mb-5 landscape-sm:mb-2 landscape-md:mb-5 landscape-xl:mb-6'>
          <p className='text-2xl mr-2 text-stroke-title text-shadow-xl md:text-3xl landscape-sm:text-lg landscape-md:text-2xl landscape-xl:text-4xl landscape-md:hidden landscape-lg:block'>
            &#10084;&#65039;
          </p>
          <p className='font-rock text-white text-stroke-title text-shadow-xl text-xl md:text-3xl landscape-sm:text-lg landscape-md:text-2xl landscape-xl:text-4xl landscape-md:hidden landscape-lg:block'>
            623
          </p>
        </div>
      </section>

      <section className="mt-4 landscape-lg:mt-6 w-[90vw] sm:w-[75vw] xl:w-[50vw] p-4 flex flex-col items-center bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md">
        <h1 className="mb-2 mt-2 text-2xl md:text-3xl font-rock text-white text-stroke-title text-shadow-xl">
          Welcome
        </h1>
        <p className="p-2 text-sm md:text-xl font-notojp text-white text-stroke leading-5 text-shadow-xl">
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
