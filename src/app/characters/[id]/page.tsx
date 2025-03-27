import React from 'react'
import Image from 'next/image';
import { getCharacter } from '@/app/actions/serverActions';
import LikeButton from '@/app/components/LikeButton';


export default async function CharacterAbout({params}: {params: {id: string}}) {
const parameters = await params;
const id: string = parameters?.id
let visitingUser = null
const response = await getCharacter(id);

visitingUser = response?.visitingUser?.username
const character = response?.character
const characterName = character.name
const initialLikes = character.likes;
const initialLikers = character.userWhoLike;


if(!character) return <p>Failed to get character info</p>
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className="mb-4 mt-4 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-rock text-white text-stroke-p text-shadow-xl">
        Character Info
      </h1>
      <section className='flex flex-col h-auto w-full max-w-[90vw] lg:max-w-[900px] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md mb-4'>
        <div className='flex flex-row h-auto w-full border-b border-black'>
          
          <div className='flex items-center justify-center w-[40%] mb-2'>
            <div className='w-[90%] h-[95%] border border-black rounded-md'>
              <Image src={character.image} alt={character.name} className='w-full h-full object-cover object-center rounded-md' width={1920} height={1080} priority />
            </div>
          </div>

         
          <div className='flex flex-col justify-evenly items-start w-[40%] mb-2'>
            <h2 className='font-bold text-xl landscape-sm:text-lg sm:text-2xl md:text-4xl landscape-md:text-3xl lg:text-4xl font-notojp text-white text-shadow-xl self-start'>
              {character.name}
            </h2>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Gender: {character.gender}</p>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Age: {character.age}</p>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Weight: {character.weight}</p>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Fighting Style: {character.style}</p>
          </div>

          <div className='flex items-center justify-center mb-1 mr-1 w-[20%]'>
            <LikeButton visitingUser={visitingUser} characterName={characterName} initialLikes={initialLikes} initialLikers={initialLikers}/>
          </div>
        </div>

        <article className='w-full p-4 overflow-hidden'>
          <p className='font-notojp text-white text-xs sm:text-xs md:text-xl lg:text-2xl xl:text-xl leading-6 text-stroke text-shadow-lg'>
            {character.content}
          </p>
        </article>
      </section>
    </div>
  );
}
