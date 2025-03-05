"use client"
import React from 'react'
import { useState } from 'react'
import axiosAPI from '@/app/lib/axios'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'


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
        console.error('Check for invalid characters or make sure that both passwords are the same');
        return;
    }

    try{
        const data = {email, username, newPassword}
        const response = await axiosAPI.post('/api/newpassword', data);
        if(response.status === 200){
          console.log('Password has been updated for user')
          setNewPassword('')
          setConfirmNewPassword('')
          router.push('/')
        } else {
          console.log('Failed to update password on server')
        }
      } 
    catch(error){
      if(axios.isAxiosError(error)){
          console.log(error.response?.data?.message || 'Unknown Axios Error')
      } else if(error instanceof Error){
          console.log('Unknown Error of type Error', error)
      } else {
          console.log('Unknown Error', error)
      }
  }
  }

  return (
    <div className='flex flex-col items-center'>
    <h1 className='mb-4 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-rock text-white text-stroke-title text-shadow-xl'>New Password</h1>
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
            <button type='submit' className='p-2 w-[40%] sm:w-[30%] py-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white text-sm sm:text-base md:text-lg text-stroke text-shadow-xl transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Login</button>
        </div>
    </form>
</div>
  )
}
