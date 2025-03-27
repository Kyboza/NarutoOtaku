"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { fetchLikeInfo, updateLikeInfo } from '../store/characterSlice'
import { handleLike } from '../store/characterSlice'


type LikeProps = {
    visitingUser: string,
    characterName: string,
    initialLikes: number,
    initialLikers: string[]
}


export default function LikeButton({visitingUser, characterName, initialLikes, initialLikers}: LikeProps) {
    const dispatch = useDispatch<AppDispatch>()
    const {userWhoLike, likes, loading, error} = useSelector((state: RootState) => state.character)

    const [isAlreadyLiking, setIsAlreadyLiking] = useState<boolean>(false)

    useEffect(() => {
        if(characterName){
            dispatch(fetchLikeInfo(characterName))
        }
    }, [dispatch, characterName])


    useEffect(() => {
          if (Array.isArray(userWhoLike)) {
            const followingStatus = userWhoLike.includes(visitingUser);
            setIsAlreadyLiking(followingStatus);
          }
        }, [userWhoLike, visitingUser]);


    const updateLikes = async() => {
        if(visitingUser) {
            const data = {visitingUser, characterName}
            dispatch(handleLike(visitingUser))
            try {
                dispatch(updateLikeInfo(data))
            } catch(error){
                dispatch(handleLike(visitingUser))
                console.log(error)
            }
        }
    }

    if(loading) {
        return (
            <>
            <button className='flex flex-row items-center bg-[#737373] h-[33%] sm:h-[50%] md:h-[25%] xl:h-[25%] border border-black rounded-md p-1'>
                <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                {initialLikers.includes(visitingUser) ? '🖤' : '❤️'}
                </p>
                <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                {initialLikes}
                </p>
            </button>
        </>
    )
    }
    
    if(error) return <p>{error}</p>

    const displayedLikes = likes ?? 0
    const buttonText = isAlreadyLiking ? '🖤' : '❤️'

  return (
    <div>
      <button onClick={updateLikes} className='flex flex-row items-center bg-[#737373] h-[33%] sm:h-[50%] md:h-[25%] border border-black rounded-md p-1 transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>
              <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                {buttonText}
              </p>
              <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                {displayedLikes}
              </p>
        </button>
    </div>
  )
}
