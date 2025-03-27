'use client'
import React from 'react'
import axiosAPI from '../lib/axios'
import { revalidate } from '../actions/serverActions'
import { toast } from 'sonner'

type TId = {
  postId: string
}

export default function PostDeleteButton({ postId }: TId) {
  const path = '/myposts'

  const deletePost = async () => {
    try {
      const response = await axiosAPI.delete('/api/forum/deletePost', {
        params: { postId },
      })
      if (response.status === 200) {
        toast.success('Post Deleted Successfully')
        await revalidate(path)
      } else {
        toast.error('Error Occurred While Deleting Post')
      }
    } catch (error) {
      toast.error('Error Occurred While Deleting Post')
      handleErrorWithAxios(error)
    }
  }

  const areYouSure = () => {
    toast('Delete Post?', {
      id: 'delete-post',
      action: {
        label: 'Yes',
        onClick: () => deletePost(),
      },
      cancel: {
        label: 'No',
        onClick: () => toast.message('Post Was Not Deleted'),
      },
    })
  }

  return (
    <>
      <button
        onClick={areYouSure}
        className="w-[45%] transform rounded-md border border-black bg-[#DC2626] p-0.5 text-center text-xxs text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95 md:text-xs lg:text-sm xl:text-base"
      >
        Delete
      </button>
    </>
  )
}
