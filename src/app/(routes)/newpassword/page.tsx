'use client'
import React from 'react'
import { useState } from 'react'
import axiosAPI from '@/app/lib/axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export default function NewPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const username = searchParams.get('username') ?? ''

  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const passwordRegex = /^[a-zA-Z0-9._%+!-]{15,}$/

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValidInput =
      passwordRegex.test(newPassword) && newPassword === confirmNewPassword

    if (!isValidInput) {
      toast.error('Passwords Do Not Match', {
        id: 'new-password',
      })
      return
    }

    try {
      const data = { email, username, newPassword }
      const response = await axiosAPI.post('/api/newpassword', data)
      if (response.status === 200) {
        toast.success('Error Occurred While Changing Password', {
          id: 'new-password',
        })
        setNewPassword('')
        setConfirmNewPassword('')
        router.push('/')
      } else {
        toast.error('Error Occurred While Changing Password', {
          id: 'new-password',
        })
      }
    } catch (error) {
      handleErrorWithAxios(error)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
        New Password
      </h1>
      <form
        onSubmit={(e) => updatePassword(e)}
        className="mb-2 flex h-auto w-full flex-col items-center gap-4 rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] p-8 sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"
      >
        <label htmlFor="newPassword" className="sr-only">
          New Password
        </label>
        <input
          className="w-[95%] rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl"
          type="password"
          id="newPassword"
          name="newPassword"
          required
          placeholder="Enter New Password"
          minLength={5}
          maxLength={30}
          autoComplete="off"
          spellCheck={false}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label htmlFor="confirmNewPassword" className="sr-only">
          Confirm New Password
        </label>
        <input
          className="w-[95%] rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl"
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          required
          placeholder="Confirm New Password"
          minLength={5}
          maxLength={30}
          autoComplete="off"
          spellCheck={false}
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <div className="flex h-auto w-full flex-row justify-end">
          <button
            type="submit"
            className="text-stroke w-[40%] transform rounded-md border border-black bg-[#E19B1A] p-2 py-2 font-notojp text-sm text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95 sm:w-[30%] sm:text-base md:text-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
