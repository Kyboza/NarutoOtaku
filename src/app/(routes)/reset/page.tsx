"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import axiosAPI from '@/app/lib/axios'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Reset() {
    const router = useRouter()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/
    const usernameRegex = /^[a-zA-Z0-9._%+-]{5,30}$/

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')

    const requestReset = async(e:React.FormEvent) => {
        e.preventDefault()

        if(!emailRegex.test(email) || !usernameRegex.test(username)){
             console.error('Incorrect Format for Email or Username')
             return
        }

        try{
            const data = {email, username}
            const response = await axiosAPI.post('/api/resetmail', data)
            if(response.status === 200) {
                setEmail('')
                setUsername('')
                console.log('Mail sent successfully')
                router.push(`/verification?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`)
            }
        } 
        catch(error){
            if(axios.isAxiosError(error)){
                console.error(error.response?.data?.message || 'Unknown Axios Error')
            } else if(error instanceof Error){
                console.error('Unknown Error of type Error', error)
            } else {
                console.log('Unknown Error', error)
            }
        }
    }

  return (
    <div className='flex flex-col items-center'>
        <h1 className='mb-4 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-rock text-white text-stroke-title text-shadow-xl'>Login</h1>
        <form onSubmit={(e) => requestReset(e)} className='flex flex-col items-center h-auto min-h-[30vh] w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md p-8 gap-4 mb-2'>
        <label htmlFor="resetPasswordEmail" className='sr-only'>Reset - Email</label>
            <input
                className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl'
                type="email"
                id='resetPasswordEmail'
                name='resetPasswordEmail'
                required
                placeholder='Enter Email'
                minLength={10}
                maxLength={30}
                autoComplete='off'
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            <label htmlFor="resetPasswordUsername" className='sr-only'>Reset - Username</label>
            <input
                className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl'
                type="text"
                id='resetPasswordUsername'
                name='resetPasswordUsername'
                required
                placeholder='Enter Username'
                minLength={5}
                maxLength={30}
                autoComplete='off'
                spellCheck={false}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            <div className='flex flex-col items-center w-full gap-1'>
                <Link href='/login'><p className='font-notojp text-white opacity-75 text-xs sm:text-sm text-shadow-xl'>Login</p></Link>
                <Link href='/register'><p className='font-notojp text-white opacity-75 text-xs sm:text-sm text-shadow-xl'>Register</p></Link>
            </div>
            <div className='flex flex-row justify-end h-auto w-full'>
                <button type='submit' className='p-2 w-[40%] sm:w-[30%] py-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white text-sm sm:text-base md:text-lg text-stroke text-shadow-xl transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Reset</button>
            </div>
        </form>
    </div>
  )
}
