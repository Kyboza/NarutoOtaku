'use client'
import React, { FormEvent } from 'react'
import { useState, useRef } from 'react'
import axiosAPI from '@/app/lib/axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export default function Verification() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const username = searchParams.get('username') ?? ''

  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const [code, setCode] = useState('')
  const codeRegex = /^[a-z0-9]{4}$/

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.target as HTMLInputElement
    inputsRef.current[index] = input
    const newCode = inputsRef.current
      .map((input) => input?.value || '')
      .join('')
    setCode(newCode)

    if (input.value.length > 0 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.target as HTMLInputElement
    if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const submitCode = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (codeRegex.test(code)) {
        const data = { email, username, code }
        const response = await axiosAPI.post('/api/verifycode', data)
        if (response.status === 200) {
          toast.success('Successfully Validated Code', {
            id: 'validate',
          })
          setCode('')
          router.push(
            `/newpassword?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`
          )
        } else {
          toast.error('Error Occurred While Validating Code', {
            id: 'validate',
          })
        }
      } else {
        toast.error('Please Fill In The Full Code', {
          id: 'validate',
        })
      }
    } catch (error) {
      handleErrorWithAxios(error)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
        Verification Code
      </h1>
      <form
        onSubmit={(e) => submitCode(e)}
        className="mb-2 flex h-auto min-h-[20vh] max-w-[90vw] flex-col items-center justify-between gap-6 rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] p-8 sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"
      >
        <div className="flex max-h-14 w-full flex-row justify-around gap-12">
          {[0, 1, 2, 3].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <label
                htmlFor={`enterVerificationCode-${index}`}
                className="sr-only"
              >
                Enter Verification Code
              </label>
              <input
                className="text-stroke min-h-10 w-[90%] rounded-md border border-black bg-gray-400/20 text-center text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl"
                type="text"
                id={`enterVerificationCode-${index}`}
                name="enterVerificationCode"
                required
                maxLength={1}
                autoComplete="off"
                spellCheck={false}
                ref={(el) => {
                  inputsRef.current[index] = el
                }}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            </div>
          ))}
        </div>

        <div className="flex h-auto w-full flex-row justify-center">
          <button
            type="submit"
            className="text-stroke w-[40%] transform rounded-md border border-black bg-[#E19B1A] p-2 py-2 font-notojp text-xs text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95 sm:w-[30%] sm:text-base md:text-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
