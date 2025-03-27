'use client'
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/store/store'
import { clearCart } from '@/app/store/cartSlice'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { getCustomerName } from '@/app/actions/serverActions'

export default function OrderSuccess() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [username, setUsername] = useState('')
  const session_id = searchParams.get('session_id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session_id) return

        dispatch(clearCart())

        const response = await getCustomerName(session_id)

        if (response) {
          setUsername(response)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [session_id, dispatch])

  const endOrder = () => {
    router.push('/')
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
        {username ? 'Order Success' : ''}
      </h1>

      <section className="mb-6 flex w-full flex-col items-center gap-2 rounded-md border border-black bg-[#A5A5A5] bg-opacity-75 p-6 shadow-lg sm:w-[50vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw]">
        {username ? (
          <p className="text-stroke font-notojp text-lg font-semibold text-white text-shadow-xl xl:text-4xl">
            Thank you {username}!
          </p>
        ) : (
          <p className="text-stroke font-notojp text-lg font-semibold text-white text-shadow-xl xl:text-2xl">
            No Purchase Made
          </p>
        )}
        <div className="relative min-h-[20vh] w-1/4">
          <Image
            className="object-contain"
            src="/images/website-standard/Naruto.webp"
            alt="Purchase Success Image"
            layout="responsive"
            width={189}
            height={1750}
          />
        </div>
      </section>

      <button
        onClick={endOrder}
        className="text-stroke w-full rounded-md border border-black bg-[#E19B1A] py-2 font-notojp text-sm text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 hover:bg-[#d18a15] active:scale-95 sm:w-[50vw] sm:text-base md:w-[60vw] md:text-lg lg:w-[50vw] lg:text-xl xl:w-[45vw] xl:text-2xl"
      >
        Okay
      </button>
    </div>
  )
}
