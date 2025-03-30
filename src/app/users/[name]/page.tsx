"// app/user/page.tsx"
import React from "react"
import Image from "next/image"
import { getUserFromParams } from "@/app/actions/serverActions"
import FollowButton from "@/app/components/FollowButton"
import Link from "next/link"

export default async function UserPage({
    params,
}: {
    params: Promise<{ name: string }>
}) {
    const parameters = await params
    const currentUser = parameters.name
    let user = null
    let visitingUser = null

    try {
        const response = await getUserFromParams(currentUser)
        user = response?.user
        visitingUser = response?.visitingUser
    } catch (error) {
        console.error("Error fetching user data:", error)
    }

    const userProp = user.username
    const visitingProp = visitingUser?.username
    const initialFollowers = user.followers
    const initialFollowing = user.following

    if (!user) {
        return <div>User not found or error fetching data</div>
    }

    return (
        <div className="flex flex-col items-center px-4">
            <section className="mt-6 flex w-full max-w-[90vw] flex-col overflow-hidden rounded-md border border-black bg-[#A5A5A5] bg-opacity-75 shadow-sm md:flex-row">
                <div className="flex w-full items-center justify-center p-4 md:w-1/3">
                    <div className="relative h-40 w-40 rounded-md border border-black">
                        <Image
                            src={
                                user.imgPath
                                    ? user.imgPath
                                    : "/images/profilepic/default.webp"
                            }
                            alt="Profile Picture"
                            className={`rounded-md ${user.imgPath ? "object-cover" : "object-contain"}`}
                            fill
                            sizes="(max-width: 640px) 40vw, (max-width: 768px) 30vw, (min-width: 1024px) 30vw"
                            priority
                        />
                    </div>
                </div>

                <div className="flex w-full flex-col items-center justify-center p-4 md:w-1/3">
                    <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-3xl text-white text-shadow-xl md:text-4xl lg:text-2xl">
                        {user.username}
                    </h1>
                    <div className="flex flex-col gap-1">
                        <p className="font-notojp text-base text-white md:text-base">
                            {" "}
                            {"Gender: "}
                            <span className="text-stroke font-bold">
                                {user.gender ? user.gender : "?"}
                            </span>
                        </p>
                        <p className="font-notojp text-base text-white md:text-base">
                            {"Age: "}
                            <span className="text-stroke font-bold">
                                {user.age ? user.age : "?"}
                            </span>
                        </p>
                        <p className="font-notojp text-base text-white md:text-base">
                            {"Weight: "}
                            <span className="text-stroke font-bold">
                                {user.weight ? user.weight + " Kg" : "?"}
                            </span>
                        </p>
                        <p className="font-notojp text-base text-white md:text-base">
                            {"Style: "}
                            <span className="text-stroke font-bold">
                                {user.style ? user.style : "?"}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="flex w-full flex-col items-center justify-center p-4 md:w-1/3">
                    {visitingUser && visitingUser.username === currentUser ? (
                        <Link href="/myposts">
                            <button className="text-stroke m-1 mb-2 w-24 transform rounded-md border border-black bg-[#E19B1A] px-2 py-1 text-sm text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95">
                                My Posts
                            </button>
                        </Link>
                    ) : null}
                    {visitingUser && visitingUser.username === currentUser ? (
                        <Link href="/edit">
                            <button className="text-stroke m-1 mb-2 w-24 transform rounded-md border border-black bg-[#E19B1A] px-2 py-1 text-sm text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95">
                                Edit Profile
                            </button>
                        </Link>
                    ) : null}

                    {visitingUser && visitingUser.username === currentUser ? (
                        <p className="text-stroke font-notojp text-base text-white text-shadow-xl md:text-lg">
                            {user.followers} Followers
                        </p>
                    ) : !visitingUser ? (
                        <p className="text-stroke font-notojp text-sm text-white md:text-base">
                            {user.followers} Followers
                        </p>
                    ) : (
                        <FollowButton
                            userProp={userProp}
                            visitingProp={visitingProp}
                            initialFollowers={initialFollowers}
                            initialFollowing={initialFollowing}
                        />
                    )}
                </div>
            </section>

            <section className="scrollbar-hide mb-6 mt-4 max-h-[40vh] w-full max-w-[90vw] overflow-y-auto rounded-md border border-black bg-[#A5A5A5] bg-opacity-75 p-4">
                <h2 className="text-stroke mb-2 font-notojp text-2xl text-white drop-shadow md:text-3xl">
                    About Me
                </h2>
                <p className="break-words font-notojp text-sm text-white md:text-base">
                    {user.about ? user.about : "No Content Yet"}
                </p>
            </section>
        </div>
    )
}
