'use client'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useState, useRef } from 'react'
import { updateUserInfo } from '@/app/actions/serverActions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function EditSettings() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const ageRegex = /^\d{1,3}$/
  const weightRegex = /^\d{1,3}$/
  const aboutRegex = /^[a-zA-Z0-9!-_.\s]{40,400}$/
  const pathRegex = /^\/images\/profilepic\/[a-zA-Z0-9-_.]+\.webp$/

  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [gender, setGender] = useState('')
  const [fighting, setFighting] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [about, setAbout] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePath, setImagePath] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (
      file &&
      (file.type === 'image/webp' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/heic')
    ) {
      const path = `/images/profilepic/${file.name}`
      setImagePath(path)
      setImageFile(file)
    } else {
      console.error('Problem uploading image')
      toast.error('Error Occurred While Uploading Image', {
        id: 'edit-user',
      })
      return
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef && fileInputRef.current !== null)
      fileInputRef.current.click()
  }

  const submitInfo = async (e: React.FormEvent) => {
    try {
      e.preventDefault()

      if (
        gender !== null &&
        fighting !== null &&
        weight !== null &&
        about !== null &&
        imageFile !== null &&
        ageRegex.test(age) &&
        weightRegex.test(weight) &&
        aboutRegex.test(about) &&
        pathRegex.test(imagePath)
      ) {
        const updatedData = {
          gender,
          fighting,
          age,
          weight,
          about,
          imageFile,
          imagePath,
        }

        const data = await updateUserInfo(updatedData)
        toast.success('Successfully Updated Profile', {
          id: 'edit-user',
        })

        router.push(`/users/${data}`)

        // Reset form fields
        setGender('')
        setFighting('')
        setAge('')
        setWeight('')
        setAbout('')
        setImageFile(null)
        setImagePath('')
      } else {
        toast.error('Fill In All Info & Picture Can Only Be Webp', {
          id: 'edit-user',
        })
        toast.error('Fill In All Info & Picture Can Only Be Webp', {
          id: 'edit-user',
        })
      }
    } catch (error) {
      handleError(error)
      toast.error('Fill In All Info & Picture Can Only Be Webp', {
        id: 'edit-user',
      })
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-stroke-p mb-4 mt-4 font-rock text-xl text-white text-shadow-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Edit Profile
      </h1>
      <form
        onSubmit={(e) => submitInfo(e)}
        className="mb-2 flex h-auto w-full flex-col items-center gap-4 rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] p-8 sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"
      >
        <section className="relative flex w-[95%] items-start">
          <div
            role="listbox"
            aria-label="Select Your Gender"
            aria-expanded={isOpen}
            onClick={() => {
              setIsOpen((prev) => !prev)
              setIsOpen2(false)
            }}
            className="text-stroke flex w-full cursor-pointer flex-row justify-between rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg"
          >
            <p className="text-stroke p-1 text-sm text-white text-shadow-lg sm:text-base md:text-lg lg:text-xl">
              {gender ? gender : 'Select Gender'}
            </p>
            <IoIosArrowDown />
          </div>

          <ul
            className={`absolute top-14 z-10 w-full rounded-md border border-black bg-[#A5A5A5] transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
          >
            <li
              role="option"
              aria-selected={gender === 'Male'}
              onClick={() => {
                setGender('Male')
                setIsOpen(false)
              }}
              className="text-stroke min-h-[5vh] cursor-pointer border-b border-black p-2 text-white text-shadow-lg first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-bl-md last-of-type:rounded-br-md last-of-type:border-b-0 hover:bg-[#E19B1A]"
            >
              Male
            </li>
            <li
              role="option"
              aria-selected={gender === 'Female'}
              onClick={() => {
                setGender('Female')
                setIsOpen(false)
              }}
              className="text-stroke min-h-[5vh] cursor-pointer border-b border-black p-2 text-white text-shadow-lg first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-bl-md last-of-type:rounded-br-md last-of-type:border-b-0 hover:bg-[#E19B1A]"
            >
              Female
            </li>
          </ul>
        </section>

        <section className="relative flex w-[95%] items-start">
          <div
            role="listbox"
            aria-label="Select Your Gender"
            aria-expanded={isOpen2}
            onClick={() => {
              setIsOpen2((prev) => !prev)
              setIsOpen(false)
            }}
            className="text-stroke flex w-full cursor-pointer flex-row justify-between rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg"
          >
            <p className="text-stroke p-1 text-sm text-white text-shadow-lg sm:text-base md:text-lg lg:text-xl">
              {fighting ? fighting : 'Select Fighting Style'}
            </p>
            <IoIosArrowDown />
          </div>

          <ul
            className={`absolute top-14 z-10 w-full rounded-md border border-black bg-[#A5A5A5] transition-all duration-300 ease-in-out ${isOpen2 ? 'max-h-[500px] opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
          >
            <li
              role="option"
              aria-selected={fighting === 'Ninjutsu'}
              onClick={() => {
                setFighting('Ninjutsu')
                setIsOpen2(false)
              }}
              className="text-stroke min-h-[5vh] cursor-pointer border-b border-black p-2 text-white text-shadow-lg first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-bl-md last-of-type:rounded-br-md last-of-type:border-b-0 hover:bg-[#E19B1A]"
            >
              Ninjutsu
            </li>
            <li
              role="option"
              aria-selected={fighting === 'Taijutsu'}
              onClick={() => {
                setFighting('Taijutsu')
                setIsOpen2(false)
              }}
              className="text-stroke min-h-[5vh] cursor-pointer border-b border-black p-2 text-white text-shadow-lg first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-bl-md last-of-type:rounded-br-md last-of-type:border-b-0 hover:bg-[#E19B1A]"
            >
              Taijutsu
            </li>
            <li
              role="option"
              aria-selected={fighting === 'Genjutsu'}
              onClick={() => {
                setFighting('Genjutsu')
                setIsOpen2(false)
              }}
              className="text-stroke min-h-[5vh] cursor-pointer border-b border-black p-2 text-white text-shadow-lg first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-bl-md last-of-type:rounded-br-md last-of-type:border-b-0 hover:bg-[#E19B1A]"
            >
              Genjutsu
            </li>
          </ul>
        </section>

        <label htmlFor="userAge" className="sr-only">
          User Age
        </label>
        <input
          className="w-[95%] appearance-none rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
          id="userAge"
          name="userAge"
          required
          placeholder="Age"
          minLength={1}
          maxLength={3}
          autoComplete="off"
          spellCheck={false}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label htmlFor="userWeight" className="sr-only">
          User Weight
        </label>
        <input
          className="w-[95%] appearance-none rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
          id="userWeight"
          name="userWeight"
          required
          placeholder="Weight (KG)"
          minLength={1}
          maxLength={3}
          autoComplete="off"
          spellCheck={false}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <label className="sr-only" htmlFor="userAbout">
          User About
        </label>
        <textarea
          className="min-h-[25vh] w-[95%] resize-none overflow-y-auto rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl"
          name="userAbout"
          id="userAbout"
          placeholder="About"
          required
          minLength={40}
          maxLength={400}
          autoComplete="off"
          spellCheck={false}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <section className="relative flex w-[95%] flex-row items-center justify-between">
          <label htmlFor="profileImage" className="sr-only">
            Upload Profile Picture
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/webp"
            required
            onChange={handleFileChange}
            className="hidden w-[95%] rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl"
          />
          <button
            onClick={triggerFileInput}
            className="text-stroke w-[40%] transform rounded-md border border-black bg-[#E19B1A] p-2 py-2 font-notojp text-xxs text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95 sm:w-[30%] sm:text-sm md:text-base"
          >
            Webp Image
          </button>
          <p className="p-2 text-sm text-white text-shadow-xl sm:p-3 sm:text-base md:text-lg">
            {imagePath ? imagePath : ''}
          </p>
        </section>

        <div className="flex h-auto w-full flex-row justify-end">
          <button
            type="submit"
            className="text-stroke w-[40%] transform rounded-md border border-black bg-[#E19B1A] p-2 py-2 font-notojp text-sm text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95 sm:w-[30%] sm:text-base md:text-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
