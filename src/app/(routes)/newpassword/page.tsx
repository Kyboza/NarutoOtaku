"use client"
import React from 'react'
import { useState } from 'react'
import axiosAPI from '@/app/lib/axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'


export default function NewPassword() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? '';
  const username = searchParams.get('username') ?? ''

  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const passwordRegex = /^[a-zA-Z0-9._%+!-]{15,}$/



  const updatePassword = async(e:React.FormEvent) => {
    e.preventDefault()
    const isValidInput = passwordRegex.test(newPassword) && newPassword === confirmNewPassword;

    if (!isValidInput) {
        toast.error('Passwords Do Not Match', {
          id: 'new-password'
        });
        return;
    }

    try{
        const data = {email, username, newPassword}
        const response = await axiosAPI.post('/api/newpassword', data);
        if(response.status === 200){
          toast.success('Error Occurred While Changing Password', {
            id: 'new-password'
          });
          setNewPassword('')
          setConfirmNewPassword('')
          router.push('/')
        } else {
          toast.error('Error Occurred While Changing Password', {
            id: 'new-password'
          });
          return
        }
      } 
    catch(error){
     handleErrorWithAxios(error)
  }
  }

  return (
    <div className='flex flex-col items-center'>
    <h1 className='mb-4 mt-4 text-2xl md:text-4xl lg:text-5xl font-rock text-white text-stroke-2 text-shadow-xl'>New Password</h1>
    <form onSubmit={(e) => updatePassword(e)} className='flex flex-col items-center h-auto w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md p-8 gap-4 mb-2'>
        <label htmlFor="newPassword" className='sr-only'>New Password</label>
        <input
            className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl'
            type="password"
            id='newPassword'
            name='newPassword'
            required
            placeholder='Enter New Password'
            minLength={5}
            maxLength={30}
            autoComplete='off'
            spellCheck={false}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            />
        <label htmlFor="confirmNewPassword" className='sr-only'>Confirm New Password</label>
        <input
            className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl'
            type="password"
            id='confirmNewPassword'
            name='confirmNewPassword'
            required
            placeholder='Confirm New Password'
            minLength={5}
            maxLength={30}
            autoComplete='off'
            spellCheck={false}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
        <div className='flex flex-row justify-end h-auto w-full'>
            <button type='submit' className='p-2 w-[40%] sm:w-[30%] py-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white text-sm sm:text-base md:text-lg text-stroke text-shadow-xl transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Submit</button>
        </div>
    </form>
</div>
  )
}
