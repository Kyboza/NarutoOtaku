import React from 'react';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <section className="w-full h-[20vh] border border-black">
      </section>

      <section className="mt-4 w-[90vw] sm:w-[75vw] xl:w-[50vw] p-4 flex flex-col items-center bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md">
        <h2 className="mb-2 mt-2 text-xl md:text-3xl font-rock text-white text-stroke-title text-shadow-xl">
          Welcome
        </h2>
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
