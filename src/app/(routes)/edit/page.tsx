'use client'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useState, useRef } from 'react'
import { updateUserInfo } from '@/app/actions/userActions'
import { useRouter } from 'next/navigation'

export default function EditSettings() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement| null>(null)
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

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
      if(file && file.type === 'image/webp'){
        const path = `/images/profilepic/${file.name}`
        setImagePath(path)
        setImageFile(file)
      } else {
        console.log('Problem uploading image')
      }
    }

    const triggerFileInput = () => {
      if(fileInputRef && fileInputRef.current !== null)
      fileInputRef.current.click()
    }

    const submitInfo = async (e: React.FormEvent) => {
      try {
        e.preventDefault();
    
        if (
          gender !== null &&
          fighting !== null &&
          ageRegex.test(age) &&
          weightRegex.test(weight) &&
          aboutRegex.test(about) &&
          imageFile !== null &&
          pathRegex.test(imagePath)
        ) {
          const updatedData = { gender, fighting, age, weight, about, imageFile, imagePath };
          
          const data = await updateUserInfo(updatedData);
          console.log("Updated UserInfo successfully");
    
          router.push(`/users/${data}`);
    
          // Reset form fields
          setGender("");
          setFighting("");
          setAge("");
          setWeight("");
          setAbout("");
          setImageFile(null);
          setImagePath('')
        } else {
          throw new Error("Please fill in appropriate information");
        }
      } catch (error) {
        console.log('Could not update user info', error)
      }
    };
    
  
  return (
    <div className='flex flex-col items-center'>
        <h1 className='mb-4 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-rock text-white text-stroke-title text-shadow-xl'>Edit Profile</h1>
        <form onSubmit={(e) => submitInfo(e)} className='flex flex-col items-center h-auto w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md p-8 gap-4 mb-2'>
          <section className='w-[95%] flex relative items-start'>
              <div 
                role="listbox" 
                aria-label="Select Your Gender" 
                aria-expanded={isOpen} 
                onClick={() => {setIsOpen(prev => !prev); setIsOpen2(false)}} 
                className="flex flex-row justify-between w-full border border-black bg-transparent outline-none p-2 rounded-md text-white text-stroke text-shadow-lg cursor-pointer"
              >
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-stroke text-shadow-lg p-1">
                  {gender ? gender : 'Select Gender'}
                </p>
                <IoIosArrowDown />
              </div>
          
              <ul className={`w-full bg-[#A5A5A5] absolute top-14 rounded-md border border-black transition-all duration-300 ease-in-out z-10 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <li role='option' aria-selected={gender === 'Male'} onClick={() => {setGender('Male'); setIsOpen(false)}} className="text-white text-stroke text-shadow-lg min-h-[5vh] border-b border-black p-2 cursor-pointer hover:bg-[#E19B1A] first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-br-md last-of-type:rounded-bl-md last-of-type:border-b-0">Male</li>
                <li role='option' aria-selected={gender === 'Female'} onClick={() => {setGender('Female'); setIsOpen(false)}} className="text-white text-stroke text-shadow-lg min-h-[5vh] border-b border-black p-2 cursor-pointer hover:bg-[#E19B1A] first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-br-md last-of-type:rounded-bl-md last-of-type:border-b-0">Female</li>
              </ul>
          </section>

          <section className='w-[95%] flex relative items-start'>
              <div 
                role="listbox" 
                aria-label="Select Your Gender" 
                aria-expanded={isOpen2} 
                onClick={() => {setIsOpen2(prev => !prev); setIsOpen(false)}} 
                className="flex flex-row justify-between w-full border border-black bg-transparent outline-none p-2 rounded-md text-white text-stroke text-shadow-lg cursor-pointer"
              >
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-stroke text-shadow-lg p-1">
                  {fighting ? fighting : 'Select Fighting Style'}
                </p>
                <IoIosArrowDown />
              </div>
          
              <ul className={`w-full bg-[#A5A5A5] absolute top-14 rounded-md border border-black transition-all duration-300 ease-in-out z-10 ${isOpen2 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <li role='option' aria-selected={fighting === 'Ninjutsu'} onClick={() => {setFighting('Ninjutsu'); setIsOpen2(false)}} className="text-white text-stroke text-shadow-lg min-h-[5vh] border-b border-black p-2 cursor-pointer hover:bg-[#E19B1A] first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-br-md last-of-type:rounded-bl-md last-of-type:border-b-0">Ninjutsu</li>
                <li role='option' aria-selected={fighting === 'Taijutsu'} onClick={() => {setFighting('Taijutsu'); setIsOpen2(false)}} className="text-white text-stroke text-shadow-lg min-h-[5vh] border-b border-black p-2 cursor-pointer hover:bg-[#E19B1A] first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-br-md last-of-type:rounded-bl-md last-of-type:border-b-0">Taijutsu</li>
                <li role='option' aria-selected={fighting === 'Genjutsu'} onClick={() => {setFighting('Genjutsu'); setIsOpen2(false)}} className="text-white text-stroke text-shadow-lg min-h-[5vh] border-b border-black p-2 cursor-pointer hover:bg-[#E19B1A] first-of-type:rounded-tl-md first-of-type:rounded-tr-md last-of-type:rounded-br-md last-of-type:rounded-bl-md last-of-type:border-b-0">Genjutsu</li>
              </ul>
          </section>

            <label htmlFor="userAge" className='sr-only'>User Age</label>
            <input
                className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                type='number'
                id='userAge'
                name='userAge'
                required
                placeholder='Age'
                minLength={1}
                maxLength={3}
                autoComplete='off'
                spellCheck={false}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                />

            <label htmlFor="userWeight" className='sr-only'>User Weight</label>
            <input
                className='border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                type='number'
                id='userWeight'
                name='userWeight'
                required
                placeholder='Weight (KG)'
                minLength={1}
                maxLength={3}
                autoComplete='off'
                spellCheck={false}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                />

              <label className='sr-only' htmlFor="userAbout">User About</label>
              <textarea
                className='min-h-[25vh] overflow-y-auto resize-none border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:font-notojp placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl'
                name="userAbout" 
                id="userAbout"
                placeholder='About'
                required
                minLength={40}
                maxLength={400}
                autoComplete='off'
                spellCheck={false}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                />
                 <section className="w-[95%] flex flex-row relative justify-between items-center">
                  <label htmlFor="profileImage" className='sr-only'>Upload Profile Picture</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/webp"
                    required
                    onChange={handleFileChange}
                    className="hidden border border-black outline-none w-[95%] rounded-md bg-gray-400/20 placeholder:text-white text-white text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 text-shadow-xl"
                  />
                  <button onClick={triggerFileInput} className='p-2 w-[40%] sm:w-[30%] py-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white text-xxs sm:text-sm md:text-base text-stroke text-shadow-xl transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Image</button>
                  <p className='text-white text-sm sm:text-base md:text-lg p-2 sm:p-3 text-shadow-xl'>{imagePath ? imagePath : ''}</p>
                 </section>

            <div className='flex flex-row justify-end h-auto w-full'>
                <button type='submit' className='p-2 w-[40%] sm:w-[30%] py-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white text-sm sm:text-base md:text-lg text-stroke text-shadow-xl transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Save</button>
            </div>
        </form>
    </div>
  )
}
