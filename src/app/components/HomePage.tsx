"use client"
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axiosAPI from '../lib/axios';

interface ITopCharacters {
  _id: string,
  name: string,
  likes: number,
  image: string,
}

export default function HomePage() {
  const [visibleIndex, setVisibleIndex] = useState<number>(0)
  const [topChar, setTopChar] = useState<ITopCharacters[] | null>(null);

  useEffect(() => {
    const fetchTopChar = async() => {
      try {
        const response = await axiosAPI.get('/api/characters/favorite');
        if(response.status === 200){
          setTopChar(response.data.topCharacters)
          console.log(response.data.topCharacters)
          console.log('Got top 3')
        } else {
          throw new Error('Failed to get top 3 characters')
        }
      } catch(error){
        handleError(error)
      }
    }

    fetchTopChar()

    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 6000);

    return () => clearInterval(interval);
  }, [])

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-screen h-[25vh] border border-black flex justify-center items-end">
        {topChar && topChar.map((char, index) => (
          <div key={char._id} 
          className={`absolute flex w-full h-[25vh] inset-0 justify-evenly items-center bg-[url('/images/favchar/First.webp')] bg-cover bg-top -z-10 transition-opacity duration-1000
          ${visibleIndex === index ? 'opacity-100' : 'opacity-0'}`}>
            <div className='relative w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[10vw] md:h-[10vw] border rounded-full overflow-hidden'>
              <Image
                className='object-cover'
                src={char.image}
                alt='Top Characters Image'
                fill
              />
            </div>
            
            <p className='font-rock text-white text-stroke-title text-shadow-xl text-xl sm:text-lg md:text-2xl'>
              {`# ${index + 1}`}
            </p>
            <p className='font-rock text-white text-stroke-title text-shadow-xl text-xl sm:text-lg md:text-2xl'>
              {char.name}
            </p>
            <div className='flex items-center mb-3 sm:mb-2 md:mb-5'>
                <p className='text-2xl mr-2 text-stroke-title text-shadow-xl md:text-3xl'>
                  &#10084;&#65039;
                </p>
                <p className='font-rock text-white text-stroke-title text-shadow-xl text-xl sm:text-lg md:text-2xl'>
                  {char.likes}
                </p>
            </div>
          </div>
        ))}
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
