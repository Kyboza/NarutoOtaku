"use client"
import React from 'react';

const Forum: React.FC = () => {
  return (
    <div className='flex flex-col items-center h-full'>
      <h1 className="mt-4 mb-4 text-2xl md:text-3xl font-rock text-white text-stroke-title text-shadow-xl">Forum</h1>
      
      <section className='flex flex-col bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md h-[60vh] landscape-lg:h-[80vh] w-[95vw] md:w-[80vw] mb-4 overflow-y-auto scrollbar-hide'>
        <ul id='forum' className='h-full w-full'>
            <li className='border-b border-black h-[15vh] landscape-sm:h-[20vh] md:h-[10vh] landscape-md:h-[10vh] landscape-lg:h-[13.3333vh] w-full'>
              <div className='flex flex-col justify-start h-[50%] w-full p-2'>
                <h2 className='font-notojp font-bold text-white text-stroke-title text-shadow-xl text-md md:text-xl lg:text-3xl sm:text-sm landscape-sm:text-sm landscape-md:text-md landscape-lg:text-xl landscape-xl:text-2xl'>
                  Title
                </h2>
                <p className='font-notojp text-white text-stroke text-shadow-xl text-xs md:text-md lg:text-2xl sm:text-xs landscape-sm:text-sm landscape-xl:text-xl'>
                  Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit
                </p>
              </div>

              <div className='flex flex-row justify-evenly items-center h-[50%] w-full'>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Posts: 242
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Active Users: 43
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Posts/Day: 3
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Latest Post: 01/21 - 16:51
                </p>
              </div>
            </li>

            <li className='border-b border-black h-[15vh] landscape-sm:h-[20vh] md:h-[10vh] landscape-md:h-[10vh] landscape-lg:h-[13.3333vh] w-full'>
              <div className='flex flex-col justify-start h-[50%] w-full p-2'>
                <h2 className='font-notojp font-bold text-white text-stroke-title text-shadow-xl text-md md:text-xl lg:text-3xl sm:text-sm landscape-sm:text-sm landscape-md:text-md landscape-lg:text-xl landscape-xl:text-2xl'>
                  Title
                </h2>
                <p className='font-notojp text-white text-stroke text-shadow-xl text-xs md:text-md lg:text-2xl sm:text-xs landscape-sm:text-sm landscape-xl:text-xl'>
                  Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit
                </p>
              </div>

              <div className='flex flex-row justify-evenly items-center h-[50%] w-full'>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Posts: 242
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Active Users: 43
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Posts/Day: 3
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Latest Post: 01/21 - 16:51
                </p>
              </div>
            </li>

            <li className='border-b border-black h-[15vh] landscape-sm:h-[20vh] md:h-[10vh] landscape-md:h-[10vh] landscape-lg:h-[13.3333vh] w-full'>
              <div className='flex flex-col justify-start h-[50%] w-full p-2'>
                <h2 className='font-notojp font-bold text-white text-stroke-title text-shadow-xl text-md md:text-xl lg:text-3xl sm:text-sm landscape-sm:text-sm landscape-md:text-md landscape-lg:text-xl landscape-xl:text-2xl'>
                  Title
                </h2>
                <p className='font-notojp text-white text-stroke text-shadow-xl text-xs md:text-md lg:text-2xl sm:text-xs landscape-sm:text-sm landscape-xl:text-xl'>
                  Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit
                </p>
              </div>

              <div className='flex flex-row justify-evenly items-center h-[50%] w-full'>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Posts: 242
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Active Users: 43
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Posts/Day: 3
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Latest Post: 01/21 - 16:51
                </p>
              </div>
            </li>

            <li className='border-b border-black h-[15vh] landscape-sm:h-[20vh] md:h-[10vh] landscape-md:h-[10vh] landscape-lg:h-[13.3333vh] w-full'>
              <div className='flex flex-col justify-start h-[50%] w-full p-2'>
                <h2 className='font-notojp font-bold text-white text-stroke-title text-shadow-xl text-md md:text-xl lg:text-3xl sm:text-sm landscape-sm:text-sm landscape-md:text-md landscape-lg:text-xl landscape-xl:text-2xl'>
                  Title
                </h2>
                <p className='font-notojp text-white text-stroke text-shadow-xl text-xs md:text-md lg:text-2xl sm:text-xs landscape-sm:text-sm landscape-xl:text-xl'>
                  Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit
                </p>
              </div>

              <div className='flex flex-row justify-evenly items-center h-[50%] w-full'>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Posts: 242
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Active Users: 43
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Posts/Day: 3
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Latest Post: 01/21 - 16:51
                </p>
              </div>
            </li>

            <li className='border-b border-black h-[15vh] landscape-sm:h-[20vh] md:h-[10vh] landscape-md:h-[10vh] landscape-lg:h-[13.3333vh] w-full'>
              <div className='flex flex-col justify-start h-[50%] w-full p-2'>
                <h2 className='font-notojp font-bold text-white text-stroke-title text-shadow-xl text-md md:text-xl lg:text-3xl sm:text-sm landscape-sm:text-sm landscape-md:text-md landscape-lg:text-xl landscape-xl:text-2xl'>
                  Title
                </h2>
                <p className='font-notojp text-white text-stroke text-shadow-xl text-xs md:text-md lg:text-2xl sm:text-xs landscape-sm:text-sm landscape-xl:text-xl'>
                  Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit
                </p>
              </div>

              <div className='flex flex-row justify-evenly items-center h-[50%] w-full'>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Posts: 242
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Active Users: 43
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Posts/Day: 3
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Latest Post: 01/21 - 16:51
                </p>
              </div>
            </li>

            <li className='border-b border-black h-[15vh] landscape-sm:h-[20vh] md:h-[10vh] landscape-md:h-[10vh] landscape-lg:h-[13.3333vh] w-full'>
              <div className='flex flex-col justify-start h-[50%] w-full p-2'>
                <h2 className='font-notojp font-bold text-white text-stroke-title text-shadow-xl text-md md:text-xl lg:text-3xl sm:text-sm landscape-sm:text-sm landscape-md:text-md landscape-lg:text-xl landscape-xl:text-2xl'>
                  Title
                </h2>
                <p className='font-notojp text-white text-stroke text-shadow-xl text-xs md:text-md lg:text-2xl sm:text-xs landscape-sm:text-sm landscape-xl:text-xl'>
                  Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit
                </p>
              </div>

              <div className='flex flex-row justify-evenly items-center h-[50%] w-full'>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Posts: 242
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Active Users: 43
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Posts/Day: 3
                </p>
                <p className='landscape-sm:mt-2 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-xl'>
                  Latest Post: 01/21 - 16:51
                </p>
              </div>
            </li>
        </ul>
      </section>
    </div>
  )
}

export default Forum;
