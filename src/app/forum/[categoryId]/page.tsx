import React from "react"
import Link from "next/link"
import { fetchSpecificForum } from "@/app/actions/serverActions"
import PostButton from "@/app/components/PostButton"
import { formatDateSmall } from "@/app/utils/formatDate"

type IForumSpecific = {
    _id: string
    pagetitle: string
    title: string
    content: string
    by: string
    createdAt: Date
    repliesAmount: number
    updatedAt: Date
    categoryId: string
}

export default async function SpecificForum({
    params,
}: {
    params: Promise<{ categoryId: string }>
}) {
    const { categoryId } = await params
    const specificForumData: IForumSpecific[] | undefined =
        await fetchSpecificForum(categoryId)
    if (!specificForumData) {
        return <p>Loading...</p>
    } else if (specificForumData.length === 0) {
        return <p>No Specific Forums Exist</p>
    }

    return (
        <div className="flex h-full flex-col items-start">
            <div className="mb-4 mt-4 flex flex-row items-center justify-center">
                <PostButton />
            </div>

            <section className="scrollbar-hide landscape-lg:h-[80vh] landscape-xl:h-[80vh] mb-6 flex h-[60vh] w-[95vw] flex-col overflow-y-auto rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] md:w-[80vw]">
                <ul id="forumPosts" className="h-full w-full">
                    {specificForumData.map((forum) => (
                        <li
                            key={forum._id}
                            className="h-[20vh] w-full border-b border-black last:border-b-0 md:h-[10vh] lg:h-[13.3333vh] xl:h-[13.33vh]"
                        >
                            <Link href={`/forum/${forum._id}/${forum._id}`}>
                                <div className="flex h-[50%] w-full flex-col justify-start p-2">
                                    <h2 className="text-stroke-p text-md  font-notojp font-bold text-white text-shadow-xl sm:text-sm md:text-xl lg:text-3xl xl:text-2xl">
                                        {forum.title}
                                    </h2>
                                    <p className="text-stroke md:text-md font-notojp text-xs text-white text-shadow-xl sm:text-xs lg:text-xl">
                                        {forum.content.length > 60
                                            ? forum.content.substring(0, 60) +
                                              "..."
                                            : forum.content}
                                    </p>
                                </div>
                            </Link>

                            <div className="flex h-[50%] w-full flex-row items-center justify-evenly mt-2">
                                <p className="text-stroke md:text-md font-notojp text-xxs text-white text-shadow-xl sm:text-xs lg:text-lg">
                                    By: {forum.by}
                                </p>
                                <p className="text-stroke md:text-md font-notojp text-xxs text-white text-shadow-xl sm:text-xs lg:text-lg">
                                    Posted: {formatDateSmall(forum.createdAt)}
                                </p>
                                <p className="text-stroke md:text-md font-notojp text-xxs text-white text-shadow-xl sm:text-xs lg:text-lg">
                                    Replies: {forum.repliesAmount}
                                </p>
                                <p className="text-stroke md:text-md font-notojp text-xxs text-white text-shadow-xl sm:text-xs lg:text-lg">
                                    Latest Reply:{" "}
                                    {forum.updatedAt
                                        ? formatDateSmall(forum.updatedAt)
                                        : ""}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}
