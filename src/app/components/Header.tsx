'use client'
import React, { useState, useEffect, useRef } from 'react'
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { fetchUserStatus, toggleStatus } from '../store/statusSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import axiosAPI from '../lib/axios'
import { useRouter } from 'next/navigation'
import TopRevalidation from '../hooks/TopRevalidation'
import { toast } from 'sonner'

export default function Header() {
  const router = useRouter()
  const listRef = useRef<HTMLUListElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  const [isOpen, setIsOpen] = useState(false)

  const { active, userName } = useSelector((state: RootState) => state.status)
  const items = useSelector((state: RootState) => state.cart.items)
  const itemsLength = items
    .filter((item) => item.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0)

  const logoutUser = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    try {
      const response = await axiosAPI.delete('/api/logout')
      if (response.status === 200) {
        toast.success('Successfully Logged Out')
        dispatch(toggleStatus(false))
        router.push('/')
      } else {
        toast.error('Failed To Logout')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed To Logout')
    }
  }

  useEffect(() => {
    if (!active) {
      dispatch(fetchUserStatus())
    }
  }, [dispatch, active])

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        (isOpen &&
          listRef.current &&
          !listRef.current.contains(e.target as Node)) ||
        listRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isOpen])

  TopRevalidation()

  return (
    <header className="relative top-0 z-10 flex h-[10vh] w-full items-center justify-between border-b border-black border-opacity-25 bg-[#D48900] drop-shadow-xl">
      <button
        className="relative z-20 ml-1 flex h-[4vh] w-[20vw] cursor-pointer items-center justify-center sm:h-[6vh] lg:h-[7.5vh]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`absolute top-[25%] h-[0.5vh] w-[3vh] rounded-md bg-white transition-all xl:w-[5vh] ${
            isOpen ? 'animate-hamburgerOpen' : 'animate-hamburgerClose'
          }`}
        ></div>
        <div
          className={`absolute top-[50%] h-[0.5vh] w-[3vh] rounded-md bg-white transition-all xl:w-[5vh] ${
            isOpen ? 'animate-hamburgerOpen' : 'animate-hamburgerClose'
          }`}
        ></div>
        <div
          className={`absolute top-[75%] h-[0.5vh] w-[3vh] rounded-md bg-white transition-all xl:w-[5vh] ${
            isOpen ? 'animate-hamburgerOpen' : 'animate-hamburgerClose'
          }`}
        ></div>
      </button>

      <Link href="/">
        <figure className="relative flex h-[10vh] w-[60vw] items-center justify-center sm:w-[40vw] md:w-[30vw] lg:w-[20vw]">
          <Image
            className="h-full object-contain"
            src="/images/website-standard/NarutoLogo.svg"
            alt="Naruto Otaku Website Logo"
            priority
            fill
            sizes="(max-width: 640px) 60vw, (max-width: 748px) 40vw, (max-width: 1024px) 30vw, (min-width: 1024px) 25vw"
          />
          <figcaption className="sr-only">Naruto Website Logo</figcaption>
        </figure>
      </Link>

      <div className="flex items-center justify-center gap-4 sm:w-[40vw] md:w-[30vw] lg:w-[20vw]">
        <Link href="/cart">
          <div className="relative">
            <FaShoppingCart className="text-2xl text-white drop-shadow-xl md:text-3xl lg:text-4xl" />
            <div
              className={`${itemsLength ? 'flex' : 'hidden'} absolute bottom-0 left-0 max-h-4 max-w-4 items-center justify-center rounded-full border border-white bg-[#D72C2C] p-0.5 text-xxs text-white sm:max-h-5 sm:max-w-5 sm:p-2`}
            >
              {itemsLength}
            </div>
          </div>
        </Link>
        <Link href={active ? `/users/${userName}` : '/login'}>
          <FaUserAlt className="text-2xl text-white drop-shadow-xl md:text-3xl lg:text-4xl mr-2" />
        </Link>
      </div>

      <ul
        ref={listRef}
        className={`min-h[25vh] absolute left-0 top-[100%] flex h-auto w-screen flex-col items-center justify-evenly rounded-md rounded-tl-none rounded-tr-none border border-black bg-[#A5A5A5] bg-opacity-90 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
      >
        <Link className="w-full border-b border-b-black" href="/forum">
          <li className="text-stroke flex justify-center p-2 font-notojp leading-5 text-white text-shadow-xl md:text-lg lg:text-xl">
            Forum
          </li>
        </Link>
        <Link className="w-full border-b border-b-black" href="/shop">
          <li className="text-stroke flex justify-center p-2 font-notojp leading-5 text-white text-shadow-xl md:text-lg lg:text-xl">
            Shop
          </li>
        </Link>
        <Link className="w-full border-b border-b-black" href="/characters">
          <li className="text-stroke flex justify-center p-2 font-notojp leading-5 text-white text-shadow-xl md:text-lg lg:text-xl">
            Characters
          </li>
        </Link>
        {active && (
          <>
            <Link
              className="w-full border-b border-b-black"
              href={`/users/${userName}`}
            >
              <li className="text-stroke flex w-full justify-center p-2 font-notojp leading-5 text-white text-shadow-xl md:text-lg lg:text-xl">
                My Profile
              </li>
            </Link>
            <Link className="w-full border-b border-b-black" href="/edit">
              <li className="text-stroke flex w-full justify-center p-2 font-notojp leading-5 text-white text-shadow-xl md:text-lg lg:text-xl">
                Edit Profile
              </li>
            </Link>
            <li
              onClick={(e) => logoutUser(e)}
              className="text-stroke flex w-full cursor-pointer justify-center border-b border-b-black p-2 font-notojp leading-5 text-white text-shadow-xl md:text-lg lg:text-xl"
            >
              Logout
            </li>
          </>
        )}
      </ul>
    </header>
  )
}
