'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { loadFollowAmount, updateFollowAmount } from '../store/followSlice'
import { handleFollow } from '../store/followSlice'

type FollowButtonProps = {
  userProp: string
  visitingProp: string
  initialFollowers: number
  initialFollowing: string[]
}

export default function FollowButton({
  userProp,
  visitingProp,
  initialFollowers,
  initialFollowing,
}: FollowButtonProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { following, followers, loading, error } = useSelector(
    (state: RootState) => state.follow
  )
  const [isAlreadyFollowing, setIsAlreadyFollowing] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      if (userProp && visitingProp) {
        await dispatch(loadFollowAmount(userProp))
      }
    }

    fetchData()
  }, [dispatch, userProp, visitingProp])

  useEffect(() => {
    if (Array.isArray(following)) {
      const followingStatus = following.includes(visitingProp)
      setIsAlreadyFollowing(followingStatus)
    }
  }, [following, visitingProp])

  const displayedFollowers = followers ?? 0
  const buttonText = isAlreadyFollowing ? 'Unfollow -' : 'Follow +'
  const initialText = initialFollowing.includes(visitingProp)
    ? 'Unfollow -'
    : 'Follow +'

  if (!userProp || !visitingProp) return <p>Correct Props not provided</p>
  if (loading) {
    return (
      <>
        <button className="mb-2 h-10 w-28 transform border border-black font-notojp text-sm text-white transition-all duration-100 ease-in-out hover:scale-105 hover:cursor-pointer active:scale-95 md:text-base">
          {initialText}
        </button>
        <p className="text-stroke font-notojp text-sm text-white md:text-base">
          {initialFollowers} Followers
        </p>
      </>
    )
  }
  if (error) return <p>{error}</p>

  const handleFollowerUpdate = async () => {
    dispatch(handleFollow(visitingProp))
    try {
      await dispatch(updateFollowAmount({ userProp, visitingProp }))
    } catch (error) {
      dispatch(handleFollow(visitingProp))
      console.error(error)
    }
  }

  return (
    <>
      <button
        onClick={handleFollowerUpdate}
        className="mb-2 h-10 w-28 transform border border-black font-notojp text-sm text-white transition-all duration-100 ease-in-out hover:scale-105 hover:cursor-pointer active:scale-95 md:text-base"
      >
        {buttonText}
      </button>
      <p className="text-stroke font-notojp text-sm text-white md:text-base">
        {displayedFollowers} Followers
      </p>
    </>
  )
}
