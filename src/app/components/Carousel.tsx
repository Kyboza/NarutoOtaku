"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ITopCharacters } from '../../../types';



export default function Carousel({topChar}: {topChar: ITopCharacters[]}) {
    const [visibleIndex, setVisibleIndex] = useState<number>(0)
    
      useEffect(() => {
        if(topChar.length === 0) return;
    
        const interval = setInterval(() => {
          setVisibleIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 6000);
    
        return () =>{
            clearInterval(interval);
        } 
      }, [ topChar])
    
  return (
    <>
       {topChar && topChar.map((char, index) => (
                <div key={char._id} 
                className={`absolute flex w-full h-[25vh] inset-0 justify-evenly items-center bg-cover bg-top -z-10 transition-opacity duration-1000 ${index === 0 ? "bg-[url('/images/favchar/First.webp')]" : index === 1 ? "bg-[url('/images/favchar/Second.webp')]" : index === 2 ? "bg-[url('/images/favchar/Third.webp')]" : ''}
                ${visibleIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                  <div className='relative w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[15vw] md:h-[15vw] xl:w-[11vw] xl:h-[11vw] border rounded-full overflow-hidden'>
                    <Image
                      className='object-cover'
                      src={char.image}
                      alt='Top Characters Image'
                      fill
                    />
                  </div>
                  
                  <p className='font-rock text-white font-bold text-stroke-title text-shadow-xl text-xl sm:text-lg md:text-4xl lg:text-5xl'>
                    {`# ${index + 1}`}
                  </p>
                  <p className='font-rock text-white font-bold text-stroke-title text-shadow-xl text-xl sm:text-lg md:text-4xl lg:text-5xl'>
                    {char.name}
                  </p>
                  <div className='flex items-center mb-3 sm:mb-2 md:mb-5'>
                      <p className='text-2xl mr-2 text-stroke-title text-shadow-xl md:text-4xl lg:text-5xl'>
                        &#10084;&#65039;
                      </p>
                      <p className='font-rock text-white font-bold text-stroke-title text-shadow-xl text-xl sm:text-lg md:text-4xl lg:text-5xl'>
                        {char.likes}
                      </p>
                  </div>
                </div>
              ))}
    </>
  )
}
