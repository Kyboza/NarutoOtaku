import React from 'react';

export default function OrderSuccess() {
  return (
    <div className='flex flex-col h-full items-center'>
      {/* Title */}
      <h1 className="mt-4 mb-4 
                     text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 
                     landscape-sm:text-3xl landscape-md:text-4xl landscape-lg:text-5xl landscape-xl:text-6xl
                     font-rock text-white text-stroke-title text-shadow-xl">
        Order Success
      </h1>

      <section 
        className="flex flex-col justify-center items-center
                   w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw] 2xl:w-[40vw] 
                   landscape-sm:w-[75vw] landscape-md:w-[65vw] landscape-lg:w-[55vw] landscape-xl:w-[50vw] 
                   bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md p-6 mb-6 shadow-lg"
      >
        {/* Grid layout for proper alignment */}
        <div className='w-[65%]'>
        <div className="grid grid-cols-[40%_60%] gap-x-6 gap-y-3 w-full">
          <p className='font-notojp text-white text-stroke text-shadow-xl text-left pr-2 
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                        landscape-sm:text-base landscape-md:text-lg landscape-lg:text-xl landscape-xl:text-2xl'>
            Name:
          </p>
          <p className='font-notojp text-white text-stroke text-shadow-xl text-left  
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                        landscape-sm:text-base landscape-md:text-lg landscape-lg:text-xl landscape-xl:text-2xl'>
            Johan Clifford
          </p>

          <p className='font-notojp text-white text-stroke text-shadow-xl text-left pr-2 
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                        landscape-sm:text-base landscape-md:text-lg landscape-lg:text-xl landscape-xl:text-2xl'>
            Address:
          </p>
          <p className='font-notojp text-white text-stroke text-shadow-xl text-left  
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                        landscape-sm:text-base landscape-md:text-lg landscape-lg:text-xl landscape-xl:text-2xl'>
            Spejarvägen 17
          </p>

          <p className='font-notojp text-white text-stroke text-shadow-xl text-left pr-2 
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                        landscape-sm:text-base landscape-md:text-lg landscape-lg:text-xl landscape-xl:text-2xl'>
            Zip:
          </p>
          <p className='font-notojp text-white text-stroke text-shadow-xl text-left  
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                        landscape-sm:text-base landscape-md:text-lg landscape-lg:text-xl landscape-xl:text-2xl'>
            72240
          </p>

          <p className='font-notojp text-white text-stroke text-shadow-xl text-left pr-2 
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                        landscape-sm:text-base landscape-md:text-lg landscape-lg:text-xl landscape-xl:text-2xl'>
            City:
          </p>
          <p className='font-notojp text-white text-stroke text-shadow-xl text-left  
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                        landscape-sm:text-base landscape-md:text-lg landscape-lg:text-xl landscape-xl:text-2xl'>
            Vasteras
          </p>

          <p className='font-notojp text-white text-stroke text-shadow-xl text-left pr-2 
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                        landscape-sm:text-base landscape-md:text-lg landscape-lg:text-xl landscape-xl:text-2xl'>
            Country:
          </p>
          <p className='font-notojp text-white text-stroke text-shadow-xl text-left  
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                        landscape-sm:text-base landscape-md:text-lg landscape-lg:text-xl landscape-xl:text-2xl'>
            Sweden
          </p>

          <p className='font-notojp text-white text-stroke text-shadow-xl text-left pr-2 
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                        landscape-sm:text-base landscape-md:text-lg landscape-lg:text-xl landscape-xl:text-2xl'>
            Email:
          </p>
          <p className='font-notojp text-white text-stroke text-shadow-xl text-left  
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 
                        landscape-sm:text-base landscape-md:text-lg landscape-lg:text-xl landscape-xl:text-2xl'>
            cjfc@hotmail.se
          </p>
        </div>
        </div>
      </section>

      <button className="w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw] 2xl:w-[40vw] 
                         landscape-sm:w-[75vw] landscape-md:w-[65vw] landscape-lg:w-[55vw] landscape-xl:w-[50vw] 
                         py-2 bg-[#E19B1A] border border-black rounded-md 
                         font-notojp text-white text-stroke text-shadow-xl 
                         text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 
                         landscape-sm:text-lg landscape-md:text-xl landscape-lg:text-2xl landscape-xl:text-3xl
                         hover:bg-[#d18a15] transition-all">
          Okay
      </button>
      
    </div>
    
  );
}
