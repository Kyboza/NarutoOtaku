"use client"
import React, { useEffect } from 'react'
import { useState, useRef} from 'react'
import Image from 'next/image'
import { loadReplies, submitReply } from '../actions/userActions'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

interface IComment {
    _id: string
    commentContent:  string,
    commentUsername: string,
    commentImg: string
}

const Reply = ({postId}: {postId: string}) => {
    const ref = useRef<HTMLFormElement>(null);
    const {active} = useSelector((state: RootState) => state.status)
    const [comment, setComment] = useState<IComment[]| null>(null)
    const [replyContent, setReplyContent] = useState<string>('')
    const [replyActive, setReplyActive] = useState<boolean>(false)

    const replyRegex = /^[a-zA-Z0-9!-_&\s]{2,120}$/

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (!replyRegex.test(replyContent)) {
                throw new Error("Reply content does not match required format.");
            }
                await submitReply(postId, replyContent);
                setReplyActive(false);
                setReplyContent("");
            } 
            catch (error) {
              console.error("Failed to post comment:", error);
          }
        }

    useEffect(() => {
      const loadRepliesFromAction = async () => {
        try {
          const replies = await loadReplies(postId); // Hämta svar från backend
          if(replies) setComment(replies); // Sätt dem i state
        } catch (error) {
          console.error("Failed to load replies:", error);
        }
      };
  
      loadRepliesFromAction();
  
      // Event handler för att stänga reply fönster
      const refHandler = (e: MouseEvent) => {
        if (replyActive && ref.current && !ref.current.contains(e.target as Node)) {
          setReplyActive(false);
        }
      };
      document.addEventListener("click", refHandler);
  
      return () => {
        document.removeEventListener("click", refHandler);
      };
    }, [replyActive, postId]);

  return (
    <>
    <div className='flex flex-col items-center justify-top h-auto overflow-y-scroll scrollbar-hide relative'>
          <h2 className="mb-4 mt-4 text-xl sm:text-2xl md:text-5xl lg:text-5xl font-rock text-white text-stroke-title text-shadow-xl">
            Replies
          </h2>
          <article className="w-[80vw] h-auto flex flex-col bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md mt-4 mb-4">
            <div className='h-auto w-full flex flex-row items-start border-b border-black'>
              {active ? (
                <button onClick={() => {setReplyActive(true)}} className='text-white text-stroke text-shadow-xl m-1 py-1 px-2 border border-black rounded-md bg-[#E19B1A] w-1/8 transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>
                  Create a Reply
                </button>
              ): (
                <p className="mx-4 my-4 text-base sm:text-xl md:text-2xl lg:text-2xl font-rock text-white text-stroke-title text-shadow-xl">
                  Login to create a reply
                </p>
              )}
              
            </div>
            
            {comment ? comment !== null && comment.map(comment => (
            <div key={comment._id}>
            <div className="h-auto w-full flex flex-row items-center">
                <div className="relative w-[8vh] h-[8vh] aspect-square border border-[#505050] rounded-full overflow-hidden ml-2">
                  <Image className="object-cover" src={comment.commentImg} alt="Profile picture" fill />
                </div>
                <h2 className="mb-4 mt-4 ml-4 text-xl sm:text-xl md:text-4xl lg:text-4xl font-rock text-white text-stroke text-shadow-xl">
                  {comment.commentUsername}
                </h2>
              </div>
        
              {/* Reply Text */}
              <div className="flex flex-col w-full overflow-y-scroll scrollbar-hide border-b border-[#505050]">
                <p className="p-2 mt-1 text-sm md:text-xl font-notojp text-white text-stroke leading-5 text-shadow-xl break-words">
                  {comment.commentContent}
                </p>
              </div>
            </div>
            )): (
              <div className='flex flex-row justify-center'>
              <h2 className="mb-4 mt-4 ml-4 text-xl sm:text-xl md:text-4xl lg:text-4xl font-rock text-white text-stroke text-shadow-xl">
                No Reply Yet
              </h2>
              </div>
            )}
          
          
          </article>
          </div>
      
          <div className={`w-full flex flex-col items-center justify-center h-screen overflow-y-scroll scrollbar-hide absolute z-20 mt-2 transition-all duration-300 ease-out ${replyActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <form onSubmit={(e) => handleReply(e)} ref={ref} className='flex flex-col items-center w-[50%] h-[50%] bg-[#A5A5A5] bg-opacity-[95%] border border-black rounded-md'>
              <h2 className='flex justify-center mb-4 mt-4 text-base sm:text-xl md:text-2xl lg:text-3xl font-rock text-white text-stroke-title text-shadow-xl'>Create a Reply</h2>
              <label htmlFor="createReply" className='sr-only'>Create a Reply</label>
              <textarea 
                className='w-[80%] border border-black bg-transparent outline-none p-2 rounded-md placeholder:text-white placeholder:text-stroke-title placeholder:text-shadow-xl resize-none text-white text-stroke text-shadow-lg'
                name="createReply" 
                id="createReply"
                required
                minLength={2}
                maxLength={120}
                aria-label='Post Content'
                aria-required="true"
                rows={10}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className='h-auto w-[80%] flex flex-row justify-end items-center'>
              <button type='submit' className='flex items-center justify-center w-[40%] text-white text-sm text-stroke text-shadow-xl mt-2 mb-2 py-0.5 px-2 border border-black rounded-md bg-[#E19B1A] transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>
                Submit
              </button>
            </div>
            </form>
        </div>
    </>
  )
}

export default Reply
