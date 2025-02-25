"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axiosAPI from '@/app/lib/axios';

export default function SpecificForum() {

  interface IForumSpecific {
      _id: string
      pagetitle: string,
      title: string,
      content: string,
      by: string,
      createdAt: Date
      replies: number,
      updatedAt: Date,
      categoryId: string
  }

  const formatDate = (date: Date) => {
    const formattedDate = new Date(date).toLocaleDateString(navigator.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    return formattedDate;
  }

  const [specificForumData, setSpecificForumData] = useState<IForumSpecific[]>([])
  const params = useParams();
  const categoryId = params?.categoryId


  useEffect(() => {
    if(!categoryId) return;
    const fetchSpecificForum = async() => {
      try{
      const response = await axiosAPI.get(`/api/forum/${categoryId}`);
      if(response.status === 200){
        const data = response.data
        console.log("Fetched Data", data)
        console.log(data.posted)
        setSpecificForumData(data)
      } else {
        console.log("Problem fetching data from Forum API", response.status, response.statusText)
      }
      }
      catch(error){
        console.error("Could not fetch specific forum section", error)
      }
    }
    fetchSpecificForum()
  }, [categoryId])

  if(!specificForumData) return <div>Loading...</div>


  return (
    <div className='flex flex-col items-center h-full'>
      <h1 className="mb-4 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-rock text-white text-stroke-title text-shadow-xl">
        Forum
      </h1>
  
      <section className='flex flex-col bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md h-[60vh] landscape-lg:h-[80vh] landscape-xl:h-[75vh] w-[95vw] md:w-[80vw] mb-6 overflow-y-auto scrollbar-hide'>
        <ul id='forumPosts' className='h-full w-full'>
          {specificForumData.map((forum) => (
            <li key={forum._id} className='border-b border-black h-[15vh] sm:h-[20vh] md:h-[10vh] lg:h-[13.3333vh] xl:h-[12.5vh] last:border-b-0 w-full'>
  
              <Link href={`/forum/${forum._id}/${forum._id}`}>
                <div className='flex flex-col justify-start h-[50%] w-full p-2'>
                  <h2 className='font-notojp font-bold text-white text-stroke-title text-shadow-xl text-md sm:text-sm md:text-xl lg:text-3xl xl:text-2xl landscape-sm:text-sm landscape-md:text-md landscape-lg:text-xl landscape-xl:text-2xl'>
                    {forum.title}
                  </h2>
                  <p className='font-notojp text-white text-stroke text-shadow-xl text-xs sm:text-xs md:text-md lg:text-2xl xl:text-xl landscape-sm:text-sm landscape-lg:text-sm landscape-xl:text-lg'>
                    {forum.content.length > 75 ? forum.content.substring(0, 75) + "..." : forum.content}
                  </p>
                </div>
              </Link>
  
              <div className='flex flex-row justify-evenly items-center h-[50%] w-full'>
                <p className='font-notojp text-white text-stroke text-shadow-xl text-xxs sm:text-xs md:text-md lg:text-xl xl:text-lg landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-lg landscape-sm:mt-2 landscape-xl:mt-4'>
                  By: {forum.by}
                </p>
                <p className='font-notojp text-white text-stroke text-shadow-xl text-xxs sm:text-xs md:text-md lg:text-xl xl:text-lg landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-lg landscape-sm:mt-2 landscape-xl:mt-4'>
                  Posted: {formatDate(forum.createdAt)}
                </p>
                <p className='font-notojp text-white text-stroke text-shadow-xl text-xxs sm:text-xs md:text-md lg:text-xl xl:text-lg landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-lg landscape-sm:mt-2 landscape-xl:mt-4'>
                  Replies: {forum.replies}
                </p>
                <p className='font-notojp text-white text-stroke text-shadow-xl text-xxs sm:text-xs md:text-md lg:text-xl xl:text-lg landscape-sm:text-xs landscape-lg:text-sm landscape-xl:text-lg landscape-sm:mt-2 landscape-xl:mt-4'>
                  Latest Reply: {forum.updatedAt ? formatDate(forum.updatedAt) : ''}
                </p>
              </div>
  
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
  
  
}
