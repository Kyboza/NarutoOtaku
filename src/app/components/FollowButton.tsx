"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { loadFollowAmount, updateFollowAmount } from '../store/followSlice'
import { handleFollow } from '../store/followSlice'

interface FollowButtonProps {
    userProp: string,
    visitingProp: string
}

export default function FollowButton({userProp, visitingProp}: FollowButtonProps) {
    const dispatch = useDispatch<AppDispatch>()
    const {following, followers, loading, error} = useSelector((state:RootState) => state.follow)
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState<boolean>(false)
    
    useEffect(() => {
        if (userProp) {
            dispatch(loadFollowAmount(userProp));
        }
    }, [dispatch, userProp]);
    
    useEffect(() => {
        if (Array.isArray(following)) {
          setIsAlreadyFollowing(following.includes(visitingProp));
        }
    }, [following, visitingProp]);
    

    
    if(!userProp || !visitingProp) return <p>Correct Props not provided</p>
    if(loading) return <p>Loading..</p>
    if(error) return <p>{error}</p>

    const displayedFollowers = followers ?? 0;

    const handleFollowerUpdate = async() => {
        dispatch(handleFollow(visitingProp))
        try {
           await dispatch(updateFollowAmount({ userProp, visitingProp }));
        } catch(error){
            dispatch(handleFollow(visitingProp))
            handleError(error)
        }
    }


  return (
    <>
    {isAlreadyFollowing ? (
        <>
      <button onClick={handleFollowerUpdate} className="w-28 h-10 border border-black text-sm md:text-base font-notojp text-white hover:cursor-pointer mb-2 transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95">
        Unfollow -
      </button>
      <p className="text-sm md:text-base text-white font-notojp text-stroke">{displayedFollowers} Followers</p>
      </>
    ) : (
    <>
      <button onClick={handleFollowerUpdate} className="w-28 h-10 border border-black text-sm md:text-base font-notojp text-white hover:cursor-pointer mb-2 transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95">
        Follow +
      </button>
      <p className="text-sm md:text-base text-white font-notojp text-stroke">{displayedFollowers} Followers</p>
    </>
    )}
  </>
  )
}
