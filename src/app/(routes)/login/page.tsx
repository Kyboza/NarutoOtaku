'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useState } from 'react'
import axiosAPI from '@/app/lib/axios'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/app/store/store'
import { toggleStatus, getUserId } from '@/app/store/statusSlice'
import { toast } from 'sonner'

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const usernameRegex = /^[a-zA-Z0-9._%+-]{5,30}$/
  const passwordRegex = /^[a-zA-Z0-9._%+!-]{15,}$/

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
      toast.error('Invalid Characters In Username Or Password')
      return
    }

    if (!username.trim() || !password.trim()) {
      toast.error('Please Fill In Both Username & Password')
      return
    }

    try {
      const response = await axiosAPI.post('/api/login', { username, password })
      const toastId = toast.loading('Loading...')
      if (response.status === 200) {
        toast.success('Successfully Logged In', { id: toastId })
        setUsername('')
        setPassword('')
        const userName = response.data.userName
        dispatch(toggleStatus(true))
        dispatch(getUserId(userName))
        router.push('/')
      } else {
        toast.error('Failed To Log In', { id: toastId })
        return
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed To Log In')
    }
  }

  const { active, loading, error } = useSelector(
    (state: RootState) => state.status
  ) // Läser Redux state

  useEffect(() => {
    if (active) {
      router.push('/')
    }
  }, [active, router])

  if (loading) return <p>Loading...</p>
  if (error) return <p>No Character Found</p>

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
        Login
      </h1>
      <form
        onSubmit={(e) => loginUser(e)}
        className="mb-2 flex h-auto w-full flex-col items-center gap-4 rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] p-8 sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"
      >
        <label htmlFor="loginName" className="sr-only">
          Login Username
        </label>
        <input
          className="w-[95%] rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl"
          type="text"
          id="loginName"
          name="loginName"
          required
          placeholder="Enter Username"
          minLength={5}
          maxLength={30}
          autoComplete="off"
          spellCheck={false}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="loginPassword" className="sr-only">
          Login Password
        </label>
        <input
          className="w-[95%] rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl"
          type="password"
          id="loginPassword"
          name="loginPassword"
          required
          placeholder="Enter Password"
          minLength={15}
          autoComplete="off"
          spellCheck={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex w-full flex-col items-center gap-1">
          <Link href="/register">
            <p className="font-notojp text-xs text-white text-shadow-xl sm:text-sm">
              Register
            </p>
          </Link>
          <Link href="/reset">
            <p className="font-notojp text-xs text-white text-shadow-xl sm:text-sm">
              Forgot Password?
            </p>
          </Link>
        </div>
        <div className="flex h-auto w-full flex-row justify-end">
          <button
            type="submit"
            className="text-stroke w-[40%] transform rounded-md border border-black bg-[#E19B1A] p-2 py-2 font-notojp text-sm text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95 sm:w-[30%] sm:text-base md:text-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
