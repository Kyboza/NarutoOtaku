import React from 'react'
import Image from 'next/image'
import Reply from '@/app/components/Reply'
import Link from 'next/link'
import { fetchSpecificPost } from '@/app/actions/userActions'

interface IUser {
  _id: string;
  username: string;
  imgPath: string;
}

interface IPost {
  _id: string
  title: string,
  content: string,
  posted: string,
  replies: number,
  latest: string,
  userId: IUser,
  categoryId: string
}

export default async function Post({params}: {params: {postId: string}}) {
const {postId} = await params;
const post: IPost | null = await fetchSpecificPost(postId)
if(!post) return <p>No Post Found</p>

return (

    <div className='flex flex-col items-center justify-top h-auto overflow-y-scroll scrollbar-hide'>
       <h1 className=" mt-4 mb-4 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-rock text-white text-stroke-title text-shadow-xl">
          {post.title}
        </h1>
    {/* Forum Inlägg */}
    <article className='w-[80vw] mb-4 mt-4 h-auto flex flex-col bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md'>
      
      {/* Profil & Namn */}
      <div className='h-[15vh] py-1 w-full flex flex-row justify-evenly items-center border-b border-[#505050]'>
        <Link href={`/users/${post.userId.username}`}><div className='relative w-[10vh] h-[10vh] aspect-square border border-[#505050] rounded-full overflow-hidden'>
          <Image className='object-cover' src={post.userId.imgPath} alt='Profile picture' fill />
        </div></Link>
        <Link href={`/users/${post.userId.username}`}><h2 className='mb-4 mt-4 text-xl sm:text-xl md:text-4xl lg:text-4xl font-rock text-white text-stroke text-shadow-xl'>
          {post.userId.username}
        </h2></Link>
      </div>

      {/* Innehåll */}
      <div className='h-full w-full overflow-y-scroll scrollbar-hide'>
        <p className='p-2 mt-1 text-sm md:text-xl font-notojp text-white text-stroke leading-5 text-shadow-xl whitespace-pre-line break-words'>
          {post.content}
        </p>
      </div>
    </article>
    <Reply postId={postId}/>
    </div>
);
}
