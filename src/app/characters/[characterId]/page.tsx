import React from 'react'
import Image from 'next/image'

export default function CharacterAbout() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className="mb-4 mt-4 text-xl sm:text-2xl md:text-4xl lg:text-xl landscape-md:text-xl landscape-lg:text-2xl landscape-xl:text-5xl font-rock text-white text-stroke-title text-shadow-xl">
        Character Info
      </h1>
      
      <section className='flex flex-col h-auto w-full max-w-[90vw] landscape-xl:max-w-[900px] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md mb-4'>
        <div className='flex flex-row h-auto w-full border-b border-black'>
          <div className='flex items-center justify-center w-[45%] mb-2'>
            <div className='w-[90%] h-[95%] border border-black rounded-md'>
              <Image src='/images/characters/Naruto.jpg' alt='Naruto' className='w-full h-full object-cover object-center rounded-md' width={1920} height={1080} />
            </div>
          </div>
          
          <div className='flex flex-col justify-evenly items-start w-[55%] mb-2'>
            <h2 className='font-bold text-xl landscape-sm:text-lg sm:text-2xl md:text-4xl landscape-md:text-3xl lg:text-4xl font-notojp text-white text-shadow-xl self-start'>
              
            </h2>
            <p className='font-notojp text-white text-xs landscape-sm:text-sm sm:text-sm md:text-2xl landscape-md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Gender: Male</p>
            <p className='font-notojp text-white text-xs landscape-sm:text-sm sm:text-sm md:text-2xl landscape-md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Age: 15</p>
            <p className='font-notojp text-white text-xs landscape-sm:text-sm sm:text-sm md:text-2xl landscape-md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Weight: 50kg</p>
            <p className='font-notojp text-white text-xs landscape-sm:text-sm sm:text-sm md:text-2xl landscape-md:text-2xl lg:text-3xl xl:text-xl text-stroke text-shadow-lg'>Fighting Style: Ninjutsu</p>
          </div>
        </div>

        <article className='w-full p-4 overflow-hidden'>
          <p className='font-notojp text-white text-xs landscape-sm:text-xs sm:text-sm md:text-xl landscape-md:text-xl lg:text-2xl xl:text-xl leading-6 text-stroke text-shadow-lg'>
            Naruto Uzumaki is a young ninja from the Hidden Leaf Village with dreams of becoming the strongest leader, the Hokage. Born with the burden of the Nine-Tails Fox, 
            a powerful beast sealed inside him, Naruto faced discrimination and loneliness from a young age. Despite this, he never wavered in his determination to earn the respect 
            of others and to protect his village. Known for his boundless optimism and unyielding spirit, Narutos journey is one of self-discovery, friendship, and immense growth. 
            With his deep sense of justice and desire to connect with others, he has earned the trust and loyalty of his friends, as well as his place among the greatest ninjas. 
            Throughout his adventures, Naruto learns to harness his inner power and unlock the secrets of his lineage, eventually mastering his unique abilities. Narutos resilience, 
            unwavering loyalty to his friends, and unshakeable belief in his own strength define him as a character who embodies the Will of Fire — the legacy of the Hokage. 
            His journey, filled with battles, victories, and losses, serves as a reminder that no matter how difficult the path, with enough determination and heart, anyone can achieve their dreams.
            From a mischievous troublemaker to a revered leader, Narutos story is one of transformation and hope, inspiring generations of ninjas who follow in his footsteps.
          </p>
        </article>
      </section>
    </div>
  )
}
