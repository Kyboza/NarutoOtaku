import React from 'react';
import Link from 'next/link';
import { fetchSpecificForum } from '@/app/actions/userActions';

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

export default async function SpecificForum({params}: {params: {categoryId: string}}) {
    const {categoryId} = await params
    const specificForumData: IForumSpecific[] | undefined = await fetchSpecificForum(categoryId)
    if(!specificForumData){
      return <p>Loading...</p>
    } else if(specificForumData.length === 0) {
      return <p>No Specific Forums Exist</p>
    }


  const formatDate = (date: Date) => {
    const formattedDate = new Date(date).toLocaleString(navigator.language, {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    return formattedDate;
  }




  return (
    <div className='flex flex-col items-center h-full'>
      <h1 className="mb-4 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-rock text-white text-stroke-title text-shadow-xl">
        Forum
      </h1>
  
      <section className='flex flex-col bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md h-[60vh] landscape-lg:h-[80vh] landscape-xl:h-[80vh] w-[95vw] md:w-[80vw] mb-6 overflow-y-auto scrollbar-hide'>
        <ul id='forumPosts' className='h-full w-full'>
          {specificForumData.map((forum) => (
            <li key={forum._id} className='border-b border-black h-[20vh] md:h-[10vh] lg:h-[13.3333vh] xl:h-[13.33vh] last:border-b-0 w-full'>
  
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
