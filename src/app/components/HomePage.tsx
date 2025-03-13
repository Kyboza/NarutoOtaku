import React from 'react';
import Carousel from './Carousel';
import { favorite } from '../actions/userActions';
import { ITopCharacters } from '../../../types';


export default async function HomePage() {
  const topChar: ITopCharacters[] | null = await favorite()
  if(!topChar || topChar === undefined) return <p>Could not get top characters</p>

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-screen h-[25vh] border border-black flex justify-center items-end">
       <Carousel topChar={topChar}/>
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
