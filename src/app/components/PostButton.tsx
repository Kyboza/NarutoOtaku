'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import Link from 'next/link'

export default function PostButton() {
  const { active } = useSelector((state: RootState) => state.status)
  return (
    <>
      {active ? (
        <Link href="/createpost">
          <button className="text-stroke w-1/8 m-1 transform rounded-md border border-black bg-[#E19B1A] px-2 py-3 text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95">
            Create Post
          </button>
        </Link>
      ) : (
        <Link href="/login">
          <button className="text-stroke w-1/8 m-1 transform rounded-md border border-black bg-[#E19B1A] px-2 py-3 text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95">
            Login To Post
          </button>
        </Link>
      )}
    </>
  )
}
