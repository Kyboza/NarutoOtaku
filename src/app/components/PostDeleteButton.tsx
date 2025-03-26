"use client"
import React from 'react'
import axiosAPI from '../lib/axios'
import { revalidate } from '../actions/userActions'
import { toast } from 'sonner'

type TId = {
  postId: string
}

export default function PostDeleteButton({postId}: TId) {
  const path = '/myposts'

  const deletePost = async () => {
    try {
      const response = await axiosAPI.delete('/api/forum/deletePost', {params: {postId}})
      if(response.status === 200){
        toast.success('Post Deleted Successfully')
        await revalidate(path)
      } else {
        toast.error('Error Occurred While Deleting Post')
        return
      }
    } catch(error){
      toast.error('Error Occurred While Deleting Post')
      handleError(error)
    }
  }

  const areYouSure = () => {
    toast('Delete Post?', {
      id: 'delete-post',
      action: {
        label: 'Yes',
        onClick: () => deletePost()
      },
      cancel: {
        label: 'No',
        onClick: () => toast.message('Post Was Not Deleted')
      }
    });
  };

  return (
    <>
     <button onClick={areYouSure} className='text-white text-xxs md:text-xs lg:text-sm xl:text-base text-center text-shadow-xl p-0.5 border border-black rounded-md bg-[#DC2626] w-[45%] transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Delete</button>
    </>
  )
}
