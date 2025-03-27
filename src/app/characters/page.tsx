import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchCharacters } from '../actions/serverActions';

type ICharacter = {
  _id: string;
  name: string;
  description: string;
  image: string;
  gender: string;
  age: number;
  likes: number;
  weight: number;
  style: string;
  content: string;
}


export default async function CharactersPage() {
 const characters: ICharacter[] | undefined = await fetchCharacters()
 if(!characters) {
  return <p>Loading..</p>
 } else if(characters.length === 0){
  return <p>No Characters Found</p>
 }

  return (
    <div className='flex flex-col items-center mb-4'>
      <h1 className="mb-4 mt-4 text-2xl md:text-4xl lg:text-5xl font-rock text-white text-stroke-2 text-shadow-xl">
        Characters
      </h1>
      <section className='flex flex-col h-[60vh] w-[80vw] xl:h-[70vh] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md overflow-y-scroll scrollbar-hide'>
        {characters.map((character) => (
          <div key={character._id} className='flex flex-col h-[50%] xl:h-[33.3333%] w-full border-b last-of-type:border-none border-black'>
            <div className='flex flex-row h-[70%] w-full justify-between items-start'>
              <div className='w-[45%] h-full flex items-center justify-center'>
                <div className='border border-black rounded-md h-[80%] w-[75%]'>
                  <Image 
                    src={character.image} 
                    alt={character.name} 
                    className="w-full h-full object-cover object-center rounded-md" 
                    width={1920} 
                    height={1080}
                    priority
                  />
                </div>
              </div>

              <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
                <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                  {character.name}
                </h2>
                <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                  <span className='block lg:hidden '>{character.description.substring(0, 100)}...</span>
                  <span className='hidden lg:block landscape-lg:block '>{character.description}</span>
                </p>
              </div>
            </div>

            <div className='flex flex-row h-[30%] w-full justify-between items-center'>
              <div className='w-[45%] flex justify-center'>
                <Link className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1' href={`/characters/${character._id}`}>Read More</Link>
              </div>
              <div className='w-[55%] h-full flex justify-center items-center'>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};