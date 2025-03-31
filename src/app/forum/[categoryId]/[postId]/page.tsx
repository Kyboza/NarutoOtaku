import React from "react"
import Image from "next/image"
import Reply from "@/app/components/Reply"
import Link from "next/link"
import { fetchSpecificPost } from "@/app/actions/serverActions"

type IUser = {
    _id: string
    username: string
    imgPath: string
}

type IPost = {
    _id: string
    title: string
    content: string
    posted: string
    replies: number
    latest: string
    userId: IUser
    categoryId: string
}

export default async function Post({
    params,
}: {
    params: Promise<{ postId: string }>
}) {
    const { postId } = await params
    const post: IPost | null = await fetchSpecificPost(postId)
    if (!post) return <p>No Post Found</p>

    return (
        <div className="justify-top scrollbar-hide flex h-auto flex-col items-center overflow-y-scroll">
            <h1 className="text-stroke-p mb-4 mt-4 font-rock text-xl text-white text-shadow-xl sm:text-2xl md:text-4xl lg:text-5xl">
                {post.title}
            </h1>
            <article className="mb-4 mt-4 flex h-auto w-[80vw] flex-col rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%]">
                <div className="flex h-[15vh] w-full flex-row items-center justify-evenly border-b border-[#505050] py-1">
                    <Link href={`/users/${post.userId.username}`}>
                        <div className="relative aspect-square h-[10vh] w-[10vh] overflow-hidden rounded-full border border-[#505050]">
                            <Image
                                className="object-cover"
                                src={post.userId.imgPath}
                                alt="Profile picture"
                                fill
                                sizes="(max-width: 640px) 30vh, 20vh"
                            />
                        </div>
                    </Link>
                    <Link href={`/users/${post.userId.username}`}>
                        <h2 className="text-stroke mb-4 mt-4 font-rock text-xl text-white text-shadow-xl sm:text-xl md:text-4xl lg:text-4xl">
                            {post.userId.username}
                        </h2>
                    </Link>
                </div>

                <div className="scrollbar-hide h-full w-full overflow-y-scroll">
                    <p className="text-stroke mt-1 whitespace-pre-line break-words p-2 font-notojp text-sm leading-5 text-white text-shadow-xl md:text-xl">
                        {post.content}
                    </p>
                </div>
            </article>
            <Reply postId={postId} />
        </div>
    )
}
