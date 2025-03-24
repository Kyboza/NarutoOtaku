"use client"
import React from 'react'
import axiosAPI from '../lib/axios'

type TId = {
  postId: string
}

export default function PostEditDeleteButton({postId}: TId) {

  const deletePost = async () => {
    try {
      const response = await axiosAPI.post('/api/forum/delete', {postId})
      if(response.status === 200){
        console.log('Post deleted successfully')
      }
    } catch(error){
      handleErrorWithAxios(error)
    }
  }

  const editPost = () => {

  }

  return (
    <>
     <button onClick={deletePost} className='text-white text-xxs md:text-xs lg:text-sm xl:text-base text-center text-shadow-xl p-0.5 border border-black rounded-md bg-[#DC2626] w-[45%] transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Delete</button>
     <button onClick={editPost} className='text-white text-xxs md:text-xs lg:text-sm xl:text-base text-center text-shadow-xl p-0.5 border border-black rounded-md bg-[#E19B1A] w-[45%]  transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95 '>Edit</button>
    </>
  )
}
