"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import axiosAPI from '@/app/lib/axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Register() {
    const router = useRouter()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/
    const usernameRegex = /^[a-zA-Z0-9._%+-]{5,30}$/
    const passwordRegex = /^[a-zA-Z0-9._%+!-]{15,}$/

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!email.trim() || !username.trim() || !password.trim()) {
            toast.error('Please fill in all fields', {
                id: 'register'
            })
            return;
        }
    
        if (!emailRegex.test(email) || !usernameRegex.test(username) || !passwordRegex.test(password)) {
            toast.error('Please Do Not Include Non-Allowed Characters', {
                id: 'register'
            })
            return;
        }
    
        try {
            const data = { email, username, password };
            const response = await axiosAPI.post('/api/register', data);
    
            if (response.status === 200) {
                toast.success('Successfully Registered Account', {
                    id: 'register'
                });
                setEmail('');
                setUsername('');
                setPassword('');
                
                router.push('/');
            } else {
                toast.error('Error Occurred While Registering User', {
                    id: 'register'
                })
                return
            }
        } catch (error) {
            handleErrorWithAxios(error);
        }
    };
    

  return (
    <div className='flex flex-col items-center'>
        <h1 className='mb-4 mt-4 text-2xl md:text-4xl lg:text-5xl font-rock text-white text-stroke-2 text-shadow-xl'>Register</h1>
        <form onSubmit={(e) => registerUser(e)} className='flex flex-col items-center h-auto min-h-[30vh] w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md p-8 gap-4 mb-2'>
            <label htmlFor="registerEmail" className='sr-only'>Register Email</label>
            <input
                className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl'
                type="email"
                id='registerEmail'
                name='registerEmail'
                required
                placeholder='Enter Email'
                minLength={10}
                maxLength={30}
                autoComplete='off'
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            <label htmlFor="registerName" className='sr-only'>Register Username</label>
            <input
                className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl'
                type="text"
                id='registerName'
                name='registerName'
                required
                placeholder='Enter Username'
                minLength={5}
                maxLength={30}
                autoComplete='off'
                spellCheck={false}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            <label htmlFor="registerPassword" className='sr-only'>Register Password</label>
            <input
                className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl'
                type="password"
                id='registerPassword'
                name='registerPassword'
                required
                placeholder='Enter Password'
                minLength={15}
                autoComplete='off'
                spellCheck={false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            <div className='flex flex-col items-center w-full gap-1'>
                <Link href='/reset'><p className='font-notojp text-white text-xs sm:text-sm text-shadow-xl'>Forgot Password?</p></Link>
                <Link href='/register'><p className='font-notojp text-white text-xs sm:text-sm text-shadow-xl'>Already Got An Account?</p></Link>
            </div>
            <div className='flex flex-row justify-end h-auto w-full'>
                <button type='submit' className=' p-2 w-[40%] sm:w-[30%] py-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white text-sm sm:text-base md:text-lg text-stroke text-shadow-xl transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Register</button>
            </div>
        </form>
    </div>
  )
}

