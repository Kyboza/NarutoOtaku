import React from 'react'
import Image from 'next/image'

export default function Users() {
  return (
    <div className='flex flex-col items-center'>
        <section className='flex flex-col h-auto max-h-[80vh] landscape-lg:h-auto landscape-lg:max-h-[60vh] landscape-xl:max-h-[80vh] w-[90vw] mt-6 bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md overflow-y-auto scrollbar-hide mb-6'>
            <div className='flex flex-row h-[40%] landscape-sm:h-[100%] landscape-xl:h-[40%]'>
                <div className='flex justify-center items-center w-[50%]'>
                    <div className='relative h-[85%] w-[85%] border rounded-md border-black'>
                        <Image
                            src="/images/profilepic/Obito.jpg"
                            alt='Profile Picture'
                            className='object-cover rounded-md'
                            fill
                        >
                        </Image>
                    </div>
                </div>

                <div className='flex flex-col justify-between w-[50%] landscape-xl:w-[40%] h-full'>
                    <h1 className='text-2xl sm:text-xl md:text-3xl lg:text-6xl landscape-sm:text-3xl landscape-lg:text-5xl landscape-xl:text-4xl font-notojp text-white text-stroke text-shadow-xl mb-2'>Martin</h1>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm sm:text-lg md:text-xl lg:text-3xl landscape-sm:text-xl landscape-lg:text-2xl landscape-xl:text-2xl font-notojp text-white text-stroke text-shadow-xl'>Gender: Male</p>
                        <p className='text-sm sm:text-lg md:text-xl lg:text-3xl landscape-sm:text-xl landscape-lg:text-2xl landscape-xl:text-2xl font-notojp text-white text-stroke text-shadow-xl'>Age: 25</p>
                        <p className='text-sm sm:text-lg md:text-xl lg:text-3xl landscape-sm:text-xl landscape-lg:text-2xl landscape-xl:text-2xl font-notojp text-white text-stroke text-shadow-xl'>Weight: 80kg</p>
                        <p className='text-sm sm:text-lg md:text-xl lg:text-3xl landscape-sm:text-xl landscape-lg:text-2xl landscape-xl:text-2xl font-notojp text-white text-stroke text-shadow-xl'>Fighting Style: Taijutsu</p>
                    </div>
                    <div className='flex flex-row items-center landscape-xl:hidden mt-4 mb-4'>
                        <button className='w-[15vw] landscape-sm:w-[17.5vw] h-[4vh] landscape-sm:h-[6vw] landscape-xl:h-[4vw] landscape-xl:w-[8vw] border border-black text-xs md:text-sm lg:text-xl landscape-sm:text-lg landscape-xl:text-2xl font-notojp text-white text-stroke text-shadow-xl mr-6'>Follow+</button>
                        <p className='text-xs md:text-sm lg:text-xl landscape-sm:text-lg landscape-xl:text-2xl font-notojp text-white text-stroke text-shadow-xl'>34 Followers</p>
                    </div>
                </div>
                <div className='flex-row items-center w-[30%] hidden landscape-xl:flex'>
                    <button aria-label='Follow user' className='w-[15vw] landscape-sm:w-[17.5vw] h-[4vh] landscape-sm:h-[6vw] landscape-xl:h-[4vw] landscape-xl:w-[8vw] border border-black text-xs md:text-sm lg:text-xl landscape-sm:text-lg landscape-xl:text-2xl font-notojp text-white text-stroke text-shadow-xl mr-6'>Follow+</button>
                    <p className='text-xs md:text-sm lg:text-xl landscape-sm:text-lg landscape-xl:text-2xl font-notojp text-white text-stroke text-shadow-xl'>34 Followers</p>
                </div>
            </div>

            <div className='flex flex-col h-auto max-h-[40vh] landscape-sm:hidden landscape-xl:block p-2 mb-2'>
                <h2 className='text-3xl sm:text-xl md:text-4xl lg:text-4xl landscape-lg:text-3xl landscape-xl:text-4xl font-notojp text-white text-stroke text-shadow-xl mb-1'>About Me</h2>
                <p className='text-sm sm:text-lg md:text-xl lg:text-2xl landscape-lg:text-3xl landscape-xl:text-2xl font-notojp text-white text-stroke text-shadow-xl whitespace-pre-line overflow-y-scroll scrollbar-hide '>
                    A dedicated Naruto fan with a deep appreciation for the world of shinobi, from the emotional depth of character backstories to the intensity of high-stakes battles. Whether its analyzing Itach’s complex morality, debating the strongest Hokage, or ranking the most powerful jutsu, Im always eager to dive into discussions. I enjoy uncovering hidden details, exploring fan theories, and reliving the most iconic moments from the series. Narutos themes of perseverance, friendship, and destiny resonate deeply with me, and I love connecting with fellow fans who share the same passion. Believe it  A dedicated Naruto fan with a deep appreciation for the world of shinobi, from the emotional depth of character backstories to the intensity of high-stakes battles. Whether its analyzing Itachis complex morality, debating the strongest Hokage, or ranking the most powerful jutsu, Im always eager to dive into discussions. I enjoy uncovering hidden details, exploring fan theories, and reliving the most iconic moments from the series. Narutos themes of perseverance, friendship, and destiny resonate deeply with me, and I love connecting with fellow fans who share the same passion. Believe it  A dedicated Naruto fan with a deep appreciation for the world of shinobi, from the emotional depth of character backstories to the intensity of high-stakes battles. Whether its analyzing Itachis complex morality, debating the strongest Hokage, or ranking the most powerful jutsu, Im always eager to dive into discussions. I enjoy uncovering hidden details, exploring fan theories, and reliving the most iconic moments from the series. Narutos themes of perseverance, friendship, and destiny resonate deeply with me, and I love connecting with fellow fans who share the same passion. Believe it  A dedicated Naruto fan with a deep appreciation for the world of shinobi, from the emotional depth of character backstories to the intensity of high-stakes battles. Whether its analyzing Itachis complex morality, debating the strongest Hokage, or ranking the most powerful jutsu, Im always eager to dive into discussions. I enjoy uncovering hidden details, exploring fan theories, and reliving the most iconic moments from the series. Narutos themes of perseverance, friendship, and destiny resonate deeply with me, and I love connecting with fellow fans who share the same passion. Believe it.
                </p>
            </div>
        </section>
    </div>
  )
}
