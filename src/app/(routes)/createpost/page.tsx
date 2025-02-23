"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import axiosAPI from '@/app/lib/axios'

export default function CreatePost() {

  interface IForum{
      _id: string,
      title: string,
      content: string,
      amount: number,
      active: number,
      perday: number,
      latest: string
  }

  const [collectedData, setCollectedData] = useState<IForum[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')

  useEffect(() => {
    const loadCategory = async() => {
      try{
        const response = await axiosAPI.get('api/forum');
        if(response.status === 200) {
          const data = response.data;
          setCollectedData(data)
        } else {
          console.log("Forum categories received:", response.data);
        }
      } catch(error){
        console.error("Could not contact or get data from Route", error)
      }
    }
    loadCategory()
  }, [])


  const menuChange = (title: string) => {
    setIsOpen((prev) => !prev)
    setSelectedCategory(title)
  }

  const postHandler = async() => {
    try{
      if(selectedCategory.length === 0 || postTitle.length === 0 || postContent.length === 0){
        console.log('Insufficient info for post')
        return
      }

      const data = {selectedCategory, postTitle, postContent}

      const response = await axiosAPI.post('api/forum/submit-post', data)
      if(response.status === 200){
        console.log("Post successfully uploaded to the Forum")
      } else {
        console.log("Could not upload post")
        return
      }
    }
    catch(error) {
      console.error('Error recieving a valid response', error)
    }
  }

  return (
    <div className='flex flex-col items-center w-full max-w-[80%] xl:max-w-[50%] gap-4'>
        <h1 className="mb-2 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-rock text-white text-stroke-title text-shadow-xl">Create A Post</h1>
        <form onSubmit={postHandler} className='flex flex-col items-center w-full bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md p-4 gap-4'>
           

            <section className='w-[90%] flex relative items-start'>
              <div onClick={() => setIsOpen(prev => !prev)} className='flex flex-row justify-between w-full border border-black bg-transparent outline-none p-2 rounded-md text-white text-stroke text-shadow-lg'>
                <p>{selectedCategory ? `${selectedCategory}` : "Select Post Category"}</p>
                <IoIosArrowDown />
              </div>

              <ul className={`w-full bg-[#A5A5A5] absolute top-10 rounded-md border border-black transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {collectedData.map((col) => (
                  <li
                    key={col._id}
                    onClick={() => menuChange(col.title)}
                    className="text-white text-stroke text-shadow-lg min-h-[5vh] border-b border-black p-2 cursor-pointer hover:bg-[#E19B1A] first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-br-md last-of-type:rounded-bl-md last-of-type:border-b-0"
                  >
                    {col.title}
                  </li>
                ))}
              </ul>
            </section>
            
            <label htmlFor='postTitle' className='sr-only'>Post Title</label>
            <input
                className='w-[90%] border border-black bg-transparent outline-none p-2 rounded-md placeholder:text-white placeholder:text-stroke-title placeholder:text-shadow-xl text-white text-stroke text-shadow-lg'
                type="text" 
                id='postTitle'
                name='postTitle'
                placeholder='Enter Post Title'
                required
                autoComplete='off'
                minLength={2}
                maxLength={25}
                aria-required="true"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor='postContent' className='sr-only'>Post Content</label>
                <textarea
                    className='w-[90%] border border-black bg-transparent outline-none p-2 rounded-md placeholder:text-white placeholder:text-stroke-title placeholder:text-shadow-xl resize-none text-white text-stroke text-shadow-lg'
                    typeof='text'
                    name="postContent" 
                    id="postContent"
                    placeholder='Enter Post Content'
                    required
                    autoComplete='off'
                    minLength={100}
                    maxLength={300}
                    aria-label='Post Content'
                    aria-required="true"
                    rows={10}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    ></textarea>
        </form>
        <div className='w-full flex justify-end'>
          <button type='submit' className='flex justify-center text-white text-stroke text-shadow-xl py-2 px-4 border border-black rounded-md bg-[#E19B1A] w-1/4'>Submit</button>
        </div>
    </div>
  )
}

