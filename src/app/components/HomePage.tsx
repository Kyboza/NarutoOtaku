import React from 'react';
import Carousel from './Carousel';
import { favorite } from '../actions/userActions';
import { ITopCharacters } from '../../../types';
import Image from 'next/image';


export default async function HomePage() {
  const topChar: ITopCharacters[] | null = await favorite()
  if(!topChar || topChar === undefined) return <p>Could not get top characters</p>

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-screen h-[25vh] border border-black flex justify-center items-end">
       <Carousel topChar={topChar}/>
      </section>

      {/* <h1 className="mb-2 text-2xl sm:text-3xl font-rock text-white text-stroke-title text-shadow-xl">
          Welcome
        </h1> */}

      {/* Welcome Section */}
      <section className="flex flex-row justify-evenly h-auto mt-4 p-4 gap-2 sm:gap-4 bg-white items-center bg-opacity-75 border border-black rounded-md w-screen">
        <div className='relative h-[25vh] w-[30vw] sm:w-[25vw] sm:h-[33vh] md:w-[30vw] xl:h-[40vh] aspect-square'>
          <Image
            className='object-cover'
            src='/images/website-standard/SasukeMain.webp'
            alt='Visit Shop'
            fill
          />
        </div>
        <div className='relative h-[25vh] w-[30vw] sm:w-[25vw] sm:h-[33vh] md:w-[30vw] xl:h-[40vh] aspect-square'>
          <Image
            className='object-cover'
            src='/images/website-standard/NarutoMain.webp'
            alt='Visit Forum'
            fill
          />
        </div>
        <div className='relative h-[25vh] w-[30vw] sm:w-[25vw] sm:h-[33vh] md:w-[30vw] xl:h-[40vh] aspect-square'>
          <Image
            className='object-cover'
            src='/images/website-standard/SakuraMain.webp'
            alt='Visit Read About'
            fill
          />
        </div>
      </section>
    </div>
  );
}
