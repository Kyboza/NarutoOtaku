"use client"
import React from 'react';
import { useState, useEffect } from 'react';

export default function Forum() {

  interface IForum {
      _id: string
      title: string,
      content: string,
      amount: number,
      active: number,
      perday: number,
      latest: string
  }

  const [forumData, setForumData] = useState<IForum[]>([])

  useEffect(() => {
    const fetchForum = async() => {
      const response = await fetch('api/forum');
      if(response.ok){
        const data = await response.json()
        console.log("Fetched Data")
        setForumData(data)
      } else {
        console.log("Problem fetching data from Forum API")
      }
    }
    fetchForum()
  }, [])


  return (
    <div className='flex flex-col items-center h-full'>
      <h1 className="mb-4 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-5xl landscape-lg:text-4xl landscape-xl:text-5xl font-rock text-white text-stroke-title text-shadow-xl">Forum</h1>
      
      <section className='flex flex-col bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md h-[60vh] landscape-lg:h-[80vh] landscape-xl:h-[75vh] w-[95vw] md:w-[80vw] mb-6 overflow-y-auto scrollbar-hide'>
        <ul id='forum' className='h-full w-full'>
          {forumData.map((forum) => (
            <li key={forum._id} className='border-b border-black h-[15vh] landscape-sm:h-[20vh]  md:h-[10vh] landscape-md:h-[15vh] landscape-lg:h-[13.3333vh] landscape-xl:h-[12.5vh] w-full last:border-b-0'>
              <div className='flex flex-col justify-start h-[50%] w-full p-2'>
                <h2 className='font-notojp font-bold text-white text-stroke-title text-shadow-xl text-md md:text-xl lg:text-3xl sm:text-sm landscape-sm:text-sm landscape-md:text-md landscape-lg:text-xl landscape-xl:text-2xl'>
                  {forum.title}
                </h2>
                <p className='font-notojp text-white text-stroke text-shadow-xl text-xs md:text-md lg:text-2xl sm:text-xs landscape-sm:text-sm landscape-xl:text-xl'>
                  {forum.content.length > 75 ? forum.content.substring(0, 75) + "..." : forum.content}
                </p>
              </div>

              <div className='flex flex-row justify-evenly items-center h-[50%] w-full'>
                <p className='landscape-sm:mt-2 landscape-xl:mt-4 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-lg'>
                  Posts: {forum.amount}
                </p>
                <p className='landscape-sm:mt-2 landscape-xl:mt-4 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-lg'>
                  Active Users: {forum.active}
                </p>
                <p className='landscape-sm:mt-2 landscape-xl:mt-4 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-lg'>
                  Posts/Day: {forum.perday}
                </p>
                <p className='landscape-sm:mt-2 landscape-xl:mt-4 font-notojp text-white text-stroke text-shadow-xl text-xxs md:text-md lg:text-xl sm:text-xs landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-lg'>
                  Latest Post: {forum.latest}
                </p>
              </div>
            </li>
            ))}
        </ul>
      </section>
    </div>
  )
}
