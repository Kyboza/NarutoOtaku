'use client'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import axiosAPI from '@/app/lib/axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Reset() {
  const router = useRouter()

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/
  const usernameRegex = /^[a-zA-Z0-9._%+-]{5,30}$/

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !username.trim()) {
      toast.error('Please Fill In All Fields', {
        id: 'reset',
      })
      return
    }

    if (!emailRegex.test(email) || !usernameRegex.test(username)) {
      toast.error('Please Do Not Include Non-Allowed Characters', {
        id: 'reset',
      })
      return
    }

    try {
      const data = { email, username }
      const response = await axiosAPI.post('/api/resetmail', data)
      if (response.status === 200) {
        toast.success('Successfully Sent Reset Mail', {
          id: 'reset',
        })
        setEmail('')
        setUsername('')
        router.push(
          `/verification?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`
        )
      }
    } catch (error) {
      handleErrorWithAxios(error)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
        Reset
      </h1>
      <form
        onSubmit={(e) => requestReset(e)}
        className="mb-2 flex h-auto min-h-[30vh] w-full flex-col items-center gap-4 rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] p-8 sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"
      >
        <label htmlFor="resetPasswordEmail" className="sr-only">
          Reset - Email
        </label>
        <input
          className="w-[95%] rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl"
          type="email"
          id="resetPasswordEmail"
          name="resetPasswordEmail"
          required
          placeholder="Enter Email"
          minLength={10}
          maxLength={30}
          autoComplete="off"
          spellCheck={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="resetPasswordUsername" className="sr-only">
          Reset - Username
        </label>
        <input
          className="w-[95%] rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl"
          type="text"
          id="resetPasswordUsername"
          name="resetPasswordUsername"
          required
          placeholder="Enter Username"
          minLength={5}
          maxLength={30}
          autoComplete="off"
          spellCheck={false}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="flex w-full flex-col items-center gap-1">
          <Link href="/login">
            <p className="font-notojp text-xs text-white text-shadow-xl sm:text-sm">
              Login
            </p>
          </Link>
          <Link href="/register">
            <p className="font-notojp text-xs text-white text-shadow-xl sm:text-sm">
              Register
            </p>
          </Link>
        </div>
        <div className="flex h-auto w-full flex-row justify-end">
          <button
            type="submit"
            className="text-stroke w-[40%] transform rounded-md border border-black bg-[#E19B1A] p-2 py-2 font-notojp text-sm text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95 sm:w-[30%] sm:text-base md:text-lg"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
