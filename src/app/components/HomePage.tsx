import React from 'react';
import Carousel from './Carousel';
import { favorite } from '../actions/serverActions';
import { ITopCharacters } from '../../../types';
import Image from 'next/image';
import Link from 'next/link';


export default async function HomePage() {
  const topChar: ITopCharacters[] | null = await favorite()
  if(!topChar || topChar === undefined) return <p>Could not get top characters</p>

  return (
    <div className="flex flex-col items-center justify-between">
      <section className="relative w-screen h-[25vh] border border-black flex justify-center items-end">
       <Carousel topChar={topChar}/>
      </section>

      <section className="flex flex-row justify-center h-auto mt-4 p-4 gap-2 sm:gap-4 items-center rounded-md w-screen animate-homeNavigation">
        <Link href='/shop'><div className='relative h-[25vh] w-[30vw] sm:w-[25vw] sm:h-[33vh] md:w-[30vw] xl:h-[40vh] transition-transform duration-300 hover:scale-105 active:scale-95'>
          <Image
            className='object-cover'
            src='/images/website-standard/SasukeMain.webp'
            alt='Visit Shop'
            fill
            sizes='100%'
            priority
          />
          <p className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white font-rock 
           text-stroke-2 text-2xl md:text-4xl lg:text-5xl'>Shop</p>
        </div></Link>
        <Link href='/forum'><div className='relative h-[25vh] w-[30vw] sm:w-[25vw] sm:h-[33vh] md:w-[30vw] xl:h-[40vh] transition-transform duration-150 hover:scale-105 active:scale-95'>
          <Image
            className='object-cover'
            src='/images/website-standard/NarutoMain.webp'
            alt='Visit Forum'
            fill
            sizes='100%'
            priority
          />
           <p className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white font-rock text-stroke-p text-2xl md:text-4xl lg:text-5xl'>Forum</p>
        </div></Link>
        <Link href='/characters'><div className='relative h-[25vh] w-[30vw] sm:w-[25vw] sm:h-[33vh] md:w-[30vw] xl:h-[40vh] transition-transform duration-300 hover:scale-105 active:scale-95'>
          <Image
            className='object-cover'
            src='/images/website-standard/SakuraMain.webp'
            alt='Visit Read About'
            fill
            sizes='100%'
            priority
          />
           <p className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white font-rock drop-shadow-2xl text-stroke-2 text-2xl md:text-4xl lg:text-5xl'>Read</p>
        </div></Link>
      </section>

      <h2 className='text-white text-stroke drop-shadow-xl font-bold text-base md:text-xl lg:text-2xl font-notojp'>Unofficial & Non-Profit Project Made For Educational Purposes</h2>
    </div>
  );
}
