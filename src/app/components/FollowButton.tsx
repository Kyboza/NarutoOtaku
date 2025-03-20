"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { loadFollowAmount, updateFollowAmount } from '../store/followSlice'
import { handleFollow } from '../store/followSlice'

interface FollowButtonProps {
    userProp: string,
    visitingProp: string,
    initialFollowers: number,
    initialFollowing: string[]
}

export default function FollowButton({userProp, visitingProp, initialFollowers, initialFollowing}: FollowButtonProps) {
    const dispatch = useDispatch<AppDispatch>()
    const {following, followers, loading, error} = useSelector((state:RootState) => state.follow)
    const [isAlreadyFollowing, setIsAlreadyFollowing] = useState<boolean>(false)
    
    useEffect(() => {
      const fetchData = async () => {
        if (userProp && visitingProp) {
          await dispatch(loadFollowAmount(userProp)); // Wait for the action to complete
        }
      };
    
      fetchData(); // Call the async function
    }, [dispatch, userProp, visitingProp]);

    useEffect(() => {
      if (Array.isArray(following)) {
        const followingStatus = following.includes(visitingProp);
        setIsAlreadyFollowing(followingStatus);
      }
    }, [following, visitingProp]);
    
    const displayedFollowers = followers ?? 0;
    const buttonText = isAlreadyFollowing ? 'Unfollow -' : 'Follow +'
    const initialText = initialFollowing.includes(visitingProp) ? 'Unfollow -' : 'Follow +'
    
    if(!userProp || !visitingProp) return <p>Correct Props not provided</p>
    if (loading) {
      return (
            <>
              <button className="w-28 h-10 border border-black text-sm md:text-base font-notojp text-white hover:cursor-pointer mb-2 transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95">
                {initialText}
              </button>
              <p className="text-sm md:text-base text-white font-notojp text-stroke">{initialFollowers} Followers</p>
            </>
      );
    }
    if(error) return <p>{error}</p>


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
      <button onClick={handleFollowerUpdate} className="w-28 h-10 border border-black text-sm md:text-base font-notojp text-white hover:cursor-pointer mb-2 transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95">
        {buttonText}
      </button>
      <p className="text-sm md:text-base text-white font-notojp text-stroke">{displayedFollowers} Followers</p>
      </>
  )
}
