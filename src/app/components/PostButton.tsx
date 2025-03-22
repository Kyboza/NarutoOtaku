"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import Link from 'next/link'

export default function PostButton() {
    const {active} = useSelector((state: RootState) => state.status)
  return (
    <>
      {active ? (<Link href='/createpost'><button className='text-white text-stroke text-shadow-xl m-1 py-3 px-2 border border-black rounded-md bg-[#E19B1A] w-1/8 transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Create Post</button></Link>): 
      (<Link href='/login'><button className='text-white text-stroke text-shadow-xl m-1 py-3 px-2 border border-black rounded-md bg-[#E19B1A] w-1/8 transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Login To Post</button></Link>)}
    </>
  )
}
