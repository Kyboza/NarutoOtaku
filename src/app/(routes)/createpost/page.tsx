'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IoIosArrowDown } from 'react-icons/io'
import axiosAPI from '@/app/lib/axios'
import { toast } from 'sonner'

type IForum = {
  _id: string
  title: string
  content: string
  amount: number
  active: number
  perday: number
  latest: string
}

export default function CreatePost() {
  const router = useRouter()
  const titleRegex = /^[a-zA-Z0-9!_\-&]{2,20}$/
  const contentRegex = /^[a-zA-Z0-9!_\-&\s]{10,400}$/

  const [collectedData, setCollectedData] = useState<IForum[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [categoryTitle, setCategoryTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const response = await axiosAPI.get('api/forum')
        if (response.status === 200) {
          const data = response.data
          setCollectedData(data)
        } else {
          toast.error('Error Occurred While Loading Posts')
          return
        }
      } catch (error) {
        toast.error('Error Occurred While Loading Posts')
        handleError(error)
      }
    }
    loadCategory()
  }, [])

  const menuChange = (id: string, title: string) => {
    setCategoryId(id)
    setCategoryTitle(title)
    setIsOpen(false)
  }

  const postHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = { categoryId, postTitle, postContent }
    try {
      if (
        !categoryId.trim() ||
        !postTitle.trim() ||
        !postContent.trim() ||
        titleRegex.test(postTitle) ||
        contentRegex.test(postContent)
      ) {
        toast.error('Please fill in all values')
        return
      }
      const response = await axiosAPI.post('api/forum/submit-post', data)
      if (response.status === 200) {
        toast.success('Successfully Created Post')
        router.push('/')
        setCategoryTitle('')
        setCategoryId('')
        setPostTitle('')
        setPostContent('')
      } else {
        toast.error('Error Occurred While Creating Post')
      }
    } catch (error) {
      toast.error('Error Occurred While Creating Post')
      handleErrorWithAxios(error)
    }
  }

  return (
    <div className="flex w-full max-w-[80%] flex-col items-center gap-4 xl:max-w-[50%]">
      <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
        Create A Post
      </h1>
      <form
        onSubmit={(e) => postHandler(e)}
        className="flex w-full flex-col items-center gap-4 rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] p-4"
      >
        <section className="relative flex w-[90%] items-start">
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-stroke flex w-full flex-row justify-between rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg"
          >
            <p>{categoryTitle ? `${categoryTitle}` : 'Select Post Category'}</p>
            <IoIosArrowDown />
          </div>

          <ul
            className={`absolute top-10 w-full rounded-md border border-black bg-[#A5A5A5] transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
          >
            {collectedData.map((col) => (
              <li
                key={col._id}
                onClick={() => menuChange(col._id, col.title)}
                className="text-stroke min-h-[5vh] cursor-pointer border-b border-black p-2 text-white text-shadow-lg first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-bl-md last-of-type:rounded-br-md last-of-type:border-b-0 hover:bg-[#E19B1A]"
              >
                {col.title}
              </li>
            ))}
          </ul>
        </section>

        <label htmlFor="postTitle" className="sr-only">
          Post Title
        </label>
        <input
          className="placeholder:text-stroke text-stroke w-[90%] rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg placeholder:text-white placeholder:text-shadow-xl"
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="Enter Post Title"
          required
          autoComplete="off"
          minLength={2}
          maxLength={20}
          aria-required="true"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postContent" className="sr-only">
          Post Content
        </label>
        <textarea
          className="placeholder:text-stroke text-stroke w-[90%] resize-none rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg placeholder:text-white placeholder:text-shadow-xl xl:min-h-[40vh]"
          name="postContent"
          id="postContent"
          placeholder="Enter Post Content"
          required
          autoComplete="off"
          minLength={10}
          maxLength={400}
          aria-label="Post Content"
          aria-required="true"
          rows={10}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <div className="flex w-[90%] justify-end">
          <button
            type="submit"
            className="text-stroke flex w-1/4 transform justify-center rounded-md border border-black bg-[#E19B1A] px-4 py-2 text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
