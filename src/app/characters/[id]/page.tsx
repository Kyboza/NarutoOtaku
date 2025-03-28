import React from 'react'
import Image from 'next/image'
import { getCharacter } from '@/app/actions/serverActions'
import LikeButton from '@/app/components/LikeButton'

export default async function CharacterAbout({params}: { params: Promise<{ id: string }>}) {
  const { id } = await params
  
  let visitingUser = null
  const response = await getCharacter(id)

  visitingUser = response?.visitingUser?.username
  const character = response?.character
  const characterName = character.name
  const initialLikes = character.likes
  const initialLikers = character.userWhoLike

  if (!character) return <p>Failed to get character info</p>
  
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-stroke-p mb-4 mt-4 font-rock text-xl text-white text-shadow-xl sm:text-2xl md:text-4xl lg:text-5xl">
        Character Info
      </h1>
      <section className="mb-4 flex h-auto w-full max-w-[90vw] flex-col rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] lg:max-w-[900px]">
        <div className="flex h-auto w-full flex-row border-b border-black">
          <div className="mb-2 flex w-[40%] items-center justify-center">
            <div className="h-[95%] w-[90%] rounded-md border border-black">
              <Image
                src={character.image}
                alt={character.name}
                className="h-full w-full rounded-md object-cover object-center"
                width={1920}
                height={1080}
              />
            </div>
          </div>

          <div className="mb-2 flex w-[40%] flex-col items-start justify-evenly">
            <h2 className="self-start font-notojp text-xl font-bold text-white text-shadow-xl sm:text-2xl md:text-4xl lg:text-4xl landscape-sm:text-lg landscape-md:text-3xl">
              {character.name}
            </h2>
            <p className="text-stroke font-notojp text-xs text-white text-shadow-lg sm:text-sm md:text-2xl lg:text-3xl xl:text-xl">
              Gender: {character.gender}
            </p>
            <p className="text-stroke font-notojp text-xs text-white text-shadow-lg sm:text-sm md:text-2xl lg:text-3xl xl:text-xl">
              Age: {character.age}
            </p>
            <p className="text-stroke font-notojp text-xs text-white text-shadow-lg sm:text-sm md:text-2xl lg:text-3xl xl:text-xl">
              Weight: {character.weight}
            </p>
            <p className="text-stroke font-notojp text-xs text-white text-shadow-lg sm:text-sm md:text-2xl lg:text-3xl xl:text-xl">
              Fighting Style: {character.style}
            </p>
          </div>

          <div className="mb-1 mr-1 flex w-[20%] items-center justify-center">
            <LikeButton
              visitingUser={visitingUser}
              characterName={characterName}
              initialLikes={initialLikes}
              initialLikers={initialLikers}
            />
          </div>
        </div>

        <article className="w-full overflow-hidden p-4">
          <p className="text-stroke font-notojp text-xs leading-6 text-white text-shadow-lg sm:text-xs md:text-xl lg:text-2xl xl:text-xl">
            {character.content}
          </p>
        </article>
      </section>
    </div>
  )
}
