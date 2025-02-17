"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';  // Use useParams from next/navigation
import Image from 'next/image';


interface ICharacter {
  _id: string,
  name: string,
  description: string,
  image: string,
  gender: string,
  age: number,
  likes: number,
  weight: number,
  style: string,
  content: string;
}


export default function CharacterAbout() {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const params = useParams();  // Get dynamic route parameters
  const id = params?.id; // Extract the `id` parameter from URL
  console.log(id)

  // Fetch the character based on the ID
  useEffect(() => {
    if (!id) return; // Don't fetch if ID is undefined or empty
  
    const fetchChar = async () => {
      const response = await fetch(`/api/characters/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched character data:", data); // Log the fetched data
        setCharacter(data);
      } else {
        console.error("Error fetching character:", response.status, response.statusText);
      }
    };
    fetchChar();
  }, [id]);
  

  // Loading, Error, and No Character Found States

  if (!character) {
    return <p>No character data found.</p>;
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className="mb-4 mt-4 text-xl sm:text-2xl md:text-4xl lg:text-6xl font-rock text-white text-stroke-title text-shadow-xl">
        Character Info
      </h1>
      <section className='flex flex-col h-auto w-full max-w-[90vw] lg:max-w-[900px] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md mb-4'>
        <div className='flex flex-row h-auto w-full border-b border-black'>
          {/* Character Image */}
          <div className='flex items-center justify-center w-[40%] mb-2'>
            <div className='w-[90%] h-[95%] border border-black rounded-md'>
              <Image src={character.image} alt={character.name} className='w-full h-full object-cover object-center rounded-md' width={1920} height={1080} />
            </div>
          </div>
          
          {/* Character Details */}
          <div className='flex flex-col justify-evenly items-start w-[40%] mb-2'>
            <h2 className='font-bold text-xl landscape-sm:text-lg sm:text-2xl md:text-4xl landscape-md:text-3xl lg:text-4xl font-notojp text-white text-shadow-xl self-start'>
              {character.name}
            </h2>
            <p className='font-notojp text-white text-xs sm:text-sm  md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Gender: {character.gender}</p>
            <p className='font-notojp text-white text-xs sm:text-sm  md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Age: {character.age}</p>
            <p className='font-notojp text-white text-xs sm:text-sm  md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Weight: {character.weight}</p>
            <p className='font-notojp text-white text-xs sm:text-sm  md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Fighting Style: {character.style}</p>
          </div>

          <div className='flex items-center justify-center mb-1 mr-1 w-[20%]'>
          <button className='flex flex-row items-center bg-[#737373] h-[33%] sm:h-[50%] md:h-[25%] xl:h-[25%] border border-black rounded-md p-1'>
                  <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                    &#10084;&#65039;
                  </p>
                  <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                    {character.likes}
                  </p>
            </button>
          </div>
        </div>

        {/* Character Content */}
        <article className='w-full p-4 overflow-hidden'>
          <p className='font-notojp text-white text-xs sm:text-xs md:text-xl lg:text-2xl xl:text-xl leading-6 text-stroke text-shadow-lg'>
            {character.content}
          </p>
        </article>
      </section>
    </div>
  );
};
