"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'

export default function Login() {

    // const usernameRegex = /^[a-zA-Z0-9._%+-]{5,20}$/
    // const passwordRegex = /^[a-zA-Z0-9._%+!-]{15,}$/

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

  return (
    <div className='flex flex-col items-center'>
        <h1 className='mb-4 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-rock text-white text-stroke-title text-shadow-xl'>Login</h1>
        <form className='flex flex-col items-center h-auto w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md p-8 gap-4 mb-2'>
            <label htmlFor="loginName" className='sr-only'>Login Username</label>
            <input
                className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl'
                type="text"
                id='loginName'
                name='loginName'
                required
                placeholder='Enter Username'
                minLength={5}
                maxLength={20}
                autoComplete='off'
                spellCheck={false}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            <label htmlFor="loginPassword" className='sr-only'>Login Password</label>
            <input
                className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl'
                type="password"
                id='loginPassword'
                name='loginPassword'
                required
                placeholder='Enter Password'
                minLength={15}
                autoComplete='off'
                spellCheck={false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            <div className='flex flex-col items-center w-full gap-1'>
                <Link href='/register'><p className='font-notojp text-white opacity-75 text-xs sm:text-sm text-shadow-xl'>Register</p></Link>
                <Link href='/reset'><p className='font-notojp text-white opacity-75 text-xs sm:text-sm text-shadow-xl'>Forgot Password?</p></Link>
            </div>
        </form>
        <div className='flex flex-row justify-end h-auto w-full'>
            <button type='submit' className='p-2 w-[40%] sm:w-[30%] py-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white text-sm sm:text-base md:text-lg text-stroke text-shadow-xl transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Login</button>
        </div>
    </div>
  )
}

