"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ICharacter {
  _id: string;
  name: string;
  description: string;
  image: string;
  likes: number;
}

const CharactersPage = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  // Fetch characters from API
  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch('/api/characters');
      const data = await response.json();
      console.log('Fetched characters:', data);
      setCharacters(data);
    };

    fetchCharacters();
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <h1 className="mb-2 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl landscape-lg:text-4xl landscape-xl:text-5xl font-rock text-white text-stroke-title text-shadow-xl">
        Characters
      </h1>
      <section className='flex flex-col h-[60vh] w-[80vw] landscape-xl:h-[70vh] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md overflow-y-scroll scrollbar-hide'>
        {characters.map((character) => (
          <div key={character._id} className='flex flex-col h-[50%] landscape-xl:h-[33.3333%] w-full border-b border-black'>
            <div className='flex flex-row h-[70%] w-full justify-between items-start'>
              <div className='w-[45%] h-full flex items-center justify-center'>
                <div className='border border-black rounded-md h-[80%] w-[75%]'>
                  <Image 
                    src={character.image} 
                    alt={character.name} 
                    className="w-full h-full object-cover object-center rounded-md" 
                    width={1920} 
                    height={1080} 
                  />
                </div>
              </div>

              <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
                <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                  {character.name}
                </h2>
                <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                  <span className='block lg:hidden '>{character.description}</span>
                  <span className='hidden lg:block landscape-lg:block '>{character.description}</span>
                </p>
              </div>
            </div>

            <div className='flex flex-row h-[30%] w-full justify-between items-center'>
              <div className='w-[45%] flex justify-center'>
                <Link className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1' href={`/characters/${character._id}`}>Read More</Link>
              </div>
              <div className='w-[55%] h-full flex justify-center items-center'>
                <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                  <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                    &#10084;&#65039;
                  </p>
                  <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                    {character.likes}
                  </p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CharactersPage;
