import React from 'react'
import { getMyPosts } from '@/app/actions/serverActions'
import { ObjectId } from 'mongoose'
import Link from 'next/link'
import PostEditDeleteButton from '@/app/components/PostDeleteButton'
import { formatDateSmall } from '@/app/utils/formatDate'

type IPost = {
  _id: ObjectId,
  title: string,
  content: string,
  repliesAmount: string,
  by: string,
  comments: ObjectId[],
  createdAt: Date
}

export default async function MyPosts() {
  const posts: IPost[] | undefined = await getMyPosts()

  return (
    <section className='flex flex-col items-center w-full h-auto'>
      <h1 className="mb-4 mt-4 text-2xl md:text-4xl lg:text-5xl font-rock text-white text-stroke-2 text-shadow-xl">Your Posts</h1>
      <ul className='flex flex-col items-center h-auto max-h-[61vh] w-auto lg:min-w-[40vw] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md overflow-y-auto scrollbar-hide'>
        {posts !== undefined && posts.length > 0 ? posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((post) => (
           <li key={post._id.toString()} className='flex flex-col border-b border-black last-of-type:border-b-0 w-full p-2'>
           <div className='flex flex-col gap-1'>
             <Link href={`/forum/${post._id}/${post._id}`}><h3 className='text-white text-stroke-p text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold'>{post.title}</h3></Link>
             <p className='text-white text-xs md:text-sm lg:text-base xl:text-xl text-shadow-xl'>{post.content.substring(0, 50) + '...'}</p>
           </div>
           <div className='flex flex-row justify-start items-center mt-2 gap-3'>
             <p className='text-white text-stroke text-xxs md:text-xs lg:text-sm xl:text-base text-shadow-xl'>Posted: {formatDateSmall(post.createdAt)}</p>
             <p className='text-white text-stroke text-xxs md:text-xs lg:text-sm xl:text-base text-shadow-xl'>Replies: {post.repliesAmount}</p>
           </div>
           <div className='flex flex-row justify-between items-center mt-1.5 w-[35%]'>
             <PostEditDeleteButton postId={post._id.toString()}/>
           </div>
         </li>
        )) : posts === undefined || posts.length === 0 ? (
          <li className='flex flex-col justify-center items-center w-full p-2'>
           <p className='text-white text-lg md:text-xl lg:text-2xl text-center text-shadow-xl p-0.5'>No Posts Created</p>
         </li>
        ) : (<p className='text-white text-lg md:text-xl lg:text-2xl text-center text-shadow-xl p-2'>Something went wrong retrieving the posts</p>)}

    </ul>
    </section>
  )
}
