"use client"
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { clearCart } from '@/app/store/cartSlice';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { getCustomerName } from '@/app/actions/userActions';

export default function OrderSuccess() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [username, setUsername] = useState('')
  const session_id = searchParams.get('session_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session_id) return;
  
        dispatch(clearCart());
  
        const response = await getCustomerName(session_id);
  
        if (response) {
          setUsername(response);
        } else {
          return;
        }
      } catch (error) {
        handleError(error);
      }
    };
  
    fetchData();
  }, [session_id, dispatch]);

  const endOrder = () => {
    router.push('/')
  }
  

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 mt-4 text-2xl md:text-4xl lg:text-5xl font-rock text-white text-stroke-2 text-shadow-xl">
        {username ? 'Order Success' : ''}
      </h1>

      <section className="flex flex-col items-center w-full sm:w-[50vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw] bg-[#A5A5A5] bg-opacity-75 border border-black rounded-md p-6 mb-6 shadow-lg gap-2">
        {username ? <p className='text-white font-semibold text-lg xl:text-4xl text-stroke text-shadow-xl font-notojp'>Thank you {username}!</p> : <p className='text-white font-semibold text-lg xl:text-2xl text-stroke text-shadow-xl font-notojp'>No Purchase Made</p>}
        <div className='relative w-1/4 min-h-[20vh]'>
        <Image
          className='object-contain'
          src='/images/website-standard/Naruto.webp'
          alt='Purchase Success Image'
          layout='responsive'
          width={189}
          height={1750}
        />
        </div>
      </section>

      <button onClick={endOrder} className="w-full sm:w-[50vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw] py-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl hover:bg-[#d18a15] transition-all duration-100 ease-in-out hover:scale-105 active:scale-95">
        Okay
      </button>
    </div>
  );
}
