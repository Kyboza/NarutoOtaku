"use client"
import React, { FormEvent } from 'react'
import { useState, useRef } from 'react'
import axiosAPI from '@/app/lib/axios'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Verification() {
    const router = useRouter()
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])
    const [code, setCode] = useState('')
    const codeRegex = /^[a-z0-9]{4}$/

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, index: number) => {
        const input = e.target as HTMLInputElement;
        inputsRef.current[index] = input;
        const newCode = inputsRef.current.map(input => input?.value || '').join('')
        setCode(newCode)

        if(input.value.length > 0 && index < inputsRef.current.length -1) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const input = e.target as HTMLInputElement
        if(e.key === 'Backspace' && input.value.length === 0 && index > 0){
            inputsRef.current[index - 1]?.focus()
        }
    }

    const submitCode = async (e:FormEvent, code:string) => {
        e.preventDefault()
        try{
            if(codeRegex.test(code)){
                const response = await axiosAPI.post('/api/verifycode', code);
                if(response.status === 200){
                    setCode('')
                    console.log('Code is correct')
                    router.push('/newpassword')
                }
            } else{
                console.log('Please provide 4 characters for the Code')
            }
        } catch(error){
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
        <h1 className='mb-4 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-rock text-white text-stroke-title text-shadow-xl'>Verification Code</h1>
        <form onSubmit={(e) => submitCode(e, code)} className='flex flex-col justify-between items-center h-auto min-h-[30vh] w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md p-8 gap-6 mb-2'>
        <div className='flex flex-row justify-around w-full max-h-14 flex-grow gap-12'>
            {[0, 1, 2, 3].map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                <label htmlFor={`enterVerificationCode-${index}`} className='sr-only'>
                    Enter Verification Code
                </label>
                <input
                    className='text-center border border-black outline-none w-[50%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl sm:p-3 text-shadow-xl text-stroke'
                    type='text'
                    id={`enterVerificationCode-${index}`}
                    name='enterVerificationCode'
                    required
                    maxLength={1}
                    autoComplete='off'
                    spellCheck={false}
                    ref={(el) => {inputsRef.current[index] = el}}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
                </div>
            ))}
        </div>

             
            <div className='flex flex-row justify-center h-auto w-full'>
                <button type='submit' className='p-2 w-[40%] sm:w-[30%] py-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white text-xs sm:text-base md:text-lg text-stroke text-shadow-xl transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Submit</button>
            </div>
        </form>
    </div>
  )
}
