import React from 'react'

export default function CreatePost() {
  return (
    <div className='flex flex-col items-center w-full max-w-[80%] xl:max-w-[50%] gap-4'>
        <h1 className="mb-2 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-rock text-white text-stroke-title text-shadow-xl">Create A Post</h1>
        <form className='flex flex-col items-center w-full bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md p-4 gap-4'>
            <label htmlFor='postTitle' className='offscreen'>Post Title</label>
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
                />
                <label htmlFor='postContent' className='offscreen'>Post Content</label>
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
                    ></textarea>
        </form>
        <div className='w-full flex justify-end'>
          <button className='flex justify-center text-white text-stroke text-shadow-xl py-2 px-4 border border-black rounded-md bg-[#E19B1A] w-1/4'>Submit</button>
        </div>
    </div>
  )
}

