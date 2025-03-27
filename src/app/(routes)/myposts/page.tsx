import React from 'react'
import { getMyPosts } from '@/app/actions/serverActions'
import { ObjectId } from 'mongoose'
import Link from 'next/link'
import PostEditDeleteButton from '@/app/components/PostDeleteButton'
import { formatDateSmall } from '@/app/utils/formatDate'

type IPost = {
  _id: ObjectId
  title: string
  content: string
  repliesAmount: string
  by: string
  comments: ObjectId[]
  createdAt: Date
}

export default async function MyPosts() {
  const posts: IPost[] | undefined = await getMyPosts()

  return (
    <section className="flex h-auto w-full flex-col items-center">
      <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
        Your Posts
      </h1>
      <ul className="scrollbar-hide flex h-auto max-h-[61vh] w-auto flex-col items-center overflow-y-auto rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] lg:min-w-[40vw]">
        {posts !== undefined && posts.length > 0 ? (
          posts
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((post) => (
              <li
                key={post._id.toString()}
                className="flex w-full flex-col border-b border-black p-2 last-of-type:border-b-0"
              >
                <div className="flex flex-col gap-1">
                  <Link href={`/forum/${post._id}/${post._id}`}>
                    <h3 className="text-stroke-p text-lg font-bold text-white md:text-xl lg:text-2xl xl:text-3xl">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-white text-shadow-xl md:text-sm lg:text-base xl:text-xl">
                    {post.content.substring(0, 50) + '...'}
                  </p>
                </div>
                <div className="mt-2 flex flex-row items-center justify-start gap-3">
                  <p className="text-stroke text-xxs text-white text-shadow-xl md:text-xs lg:text-sm xl:text-base">
                    Posted: {formatDateSmall(post.createdAt)}
                  </p>
                  <p className="text-stroke text-xxs text-white text-shadow-xl md:text-xs lg:text-sm xl:text-base">
                    Replies: {post.repliesAmount}
                  </p>
                </div>
                <div className="mt-1.5 flex w-[35%] flex-row items-center justify-between">
                  <PostEditDeleteButton postId={post._id.toString()} />
                </div>
              </li>
            ))
        ) : posts === undefined || posts.length === 0 ? (
          <li className="flex w-full flex-col items-center justify-center p-2">
            <p className="p-0.5 text-center text-lg text-white text-shadow-xl md:text-xl lg:text-2xl">
              No Posts Created
            </p>
          </li>
        ) : (
          <p className="p-2 text-center text-lg text-white text-shadow-xl md:text-xl lg:text-2xl">
            Something went wrong retrieving the posts
          </p>
        )}
      </ul>
    </section>
  )
}
