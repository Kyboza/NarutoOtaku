import React from 'react'
import Image from 'next/image'
import { fetchSpecificPost } from '@/app/actions/userActions'

interface IPost {
  _id: string
  title: string,
  content: string,
  by: string,
  posted: string,
  replies: number,
  latest: string,
  categoryId: string
}

export default async function Post({params}: {params: {postId: string}}) {
  const {postId} = await params
  const post: IPost | undefined = await fetchSpecificPost(postId)
  if (!post) {
    return <p>No Post data found.</p>;
  }

return (
  <div className='flex flex-col items-center justify-top h-screen overflow-y-scroll scrollbar-hide'>

    {/* Titel */}
    <h1 className="mb-4 mt-4 text-xl sm:text-2xl md:text-5xl lg:text-5xl font-rock text-white text-stroke-title text-shadow-xl">
      {post.title}
    </h1>

    {/* Forum Inlägg */}
    <article className='w-[80vw] h-auto flex flex-col bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md'>
      
      {/* Profil & Namn */}
      <div className='h-[15vh] w-full flex flex-row justify-evenly items-center border-b border-[#505050]'>
        <div className='relative w-[10vh] h-[10vh] aspect-square border border-[#505050] rounded-full overflow-hidden'>
          <Image className='object-cover' src="/images/favchar/Orochimaru2.webp" alt='Profile picture' fill />
        </div>
        <h2 className='mb-4 mt-4 text-xl sm:text-xl md:text-4xl lg:text-4xl font-rock text-white text-stroke text-shadow-xl'>
          {post.by}
        </h2>
      </div>

      {/* Innehåll */}
      <div className='h-full w-full overflow-y-scroll scrollbar-hide'>
        <p className='p-2 mt-1 text-sm md:text-xl font-notojp text-white text-stroke leading-5 text-shadow-xl whitespace-pre-line break-words'>
          {post.content}
        </p>
      </div>
    </article>

    {/* Replies Titel */}
    <h2 className="mb-4 mt-4 text-xl sm:text-2xl md:text-5xl lg:text-5xl font-rock text-white text-stroke-title text-shadow-xl">
      Replies
    </h2>

    {/* Replies Box */}
    <article className="w-[80vw] h-auto flex flex-col bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md mt-4 mb-4">
      
      {/* Profil & Namn */}
      <div className="h-auto w-full flex flex-row items-center">
        <div className="relative w-[8vh] h-[8vh] aspect-square border border-[#505050] rounded-full overflow-hidden ml-2">
          <Image className="object-cover" src="/images/favchar/Orochimaru2.webp" alt="Profile picture" fill />
        </div>
        <h2 className="mb-4 mt-4 ml-4 text-xl sm:text-xl md:text-4xl lg:text-4xl font-rock text-white text-stroke text-shadow-xl">
          Luna
        </h2>
      </div>

      {/* Reply Text */}
      <div className="flex flex-col w-full overflow-y-scroll scrollbar-hide border-b border-[#505050]">
        <p className="p-2 mt-1 text-sm md:text-xl font-notojp text-white text-stroke leading-5 text-shadow-xl break-words">
          test Hello hello hleo Hello hello hleo Hello hello hleo Hello hello hleo hleo hleo...
        </p>
      </div>

    </article>

  </div>
);
}
