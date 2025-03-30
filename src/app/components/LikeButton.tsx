"use client"
import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../store/store"
import { fetchLikeInfo, updateLikeInfo } from "../store/characterSlice"
import { handleLike } from "../store/characterSlice"
import { toast } from "sonner"

type LikeProps = {
    visitingUser: string
    characterName: string
    initialLikes: number
    initialLikers: string[]
}

export default function LikeButton({
    visitingUser,
    characterName,
    initialLikes,
    initialLikers,
}: LikeProps) {
    const dispatch = useDispatch<AppDispatch>()
    const { userWhoLike, likes, loading, error } = useSelector(
        (state: RootState) => state.character,
    )
    const { active } = useSelector((state: RootState) => state.status)

    const [isAlreadyLiking, setIsAlreadyLiking] = useState<boolean>(false)

    useEffect(() => {
        if (characterName) {
            dispatch(fetchLikeInfo(characterName))
        }
    }, [dispatch, characterName])

    useEffect(() => {
        if (Array.isArray(userWhoLike)) {
            const followingStatus = userWhoLike.includes(visitingUser)
            setIsAlreadyLiking(followingStatus)
        }
    }, [userWhoLike, visitingUser])

    const updateLikes = async () => {
        if (visitingUser) {
            const data = { visitingUser, characterName }
            dispatch(handleLike(visitingUser))
            try {
                dispatch(updateLikeInfo(data))
            } catch (error) {
                dispatch(handleLike(visitingUser))
                console.error(error)
            }
        } else {
            toast.error("Login To Like Character", {
                id: "like-character",
            })
        }
    }

    if (loading) {
        return (
            <div className="flex w-full flex-col items-center justify-center">
                <button className="flex h-[33%] flex-row items-center rounded-md border border-black bg-[#737373] p-1 sm:h-[50%] md:h-[25%] xl:h-[25%]">
                    <p className="mr-0.5 text-sm text-shadow-lg sm:text-sm md:text-xl lg:text-3xl">
                        {initialLikers.includes(visitingUser) ? "🖤" : "❤️"}
                    </p>
                    <p className="font-notojp text-sm text-white text-shadow-lg sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        {initialLikes}
                    </p>
                </button>
                {!active && (
                    <p className="mt-2 font-notojp text-xxs text-white text-shadow-lg sm:text-sm md:text-base lg:text-xl">
                        Login To Like
                    </p>
                )}
            </div>
        )
    }

    if (error) return <p>{error}</p>

    const displayedLikes = likes ?? 0
    const buttonText = isAlreadyLiking ? "🖤" : "❤️"

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <button
                onClick={updateLikes}
                className="flex h-[33%] flex-row items-center rounded-md border border-black bg-[#737373] p-1 transition-all duration-100 ease-in-out hover:scale-105 active:scale-95 sm:h-[50%] md:h-[25%]"
            >
                <p className="mr-0.5 text-sm text-shadow-lg sm:text-sm md:text-xl lg:text-3xl">
                    {buttonText}
                </p>
                <p className="font-notojp text-sm text-white text-shadow-lg sm:text-sm md:text-base lg:text-lg xl:text-xl">
                    {displayedLikes}
                </p>
            </button>
            {!active && (
                <p className="mt-2 font-notojp text-xxs text-white text-shadow-lg sm:text-sm md:text-base lg:text-xl">
                    Login To Like
                </p>
            )}
        </div>
    )
}
