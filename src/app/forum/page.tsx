import React from 'react'
import Link from 'next/link'
import { fetchFrontForum } from '../actions/serverActions'
import { formatDateFull } from '../utils/formatDate'

type IForum = {
  _id: string
  title: string
  content: string
  amount: number
  active: number
  perday: number
  latest: string
}

export default async function Forum() {
  const forumData: IForum[] | undefined = await fetchFrontForum()
  if (!forumData) {
    return <p>Loading..</p>
  } else if (forumData.length === 0) {
    return <p>No Forum Categories Found</p>
  }

  return (
    <div className="flex h-full flex-col items-center">
      <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
        Forum
      </h1>

      <section className="scrollbar-hide mb-6 flex h-[60vh] w-[95vw] flex-col overflow-y-auto rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] md:w-[80vw] lg:h-[80vh] xl:h-[75vh]">
        <ul id="forum" className="h-full w-full">
          {forumData.map((forum) => (
            <li
              key={forum._id}
              className="h-[15vh] w-full border-b border-black last:border-b-0 sm:h-[20vh] md:h-[13.3333vh] lg:h-[13.3333vh] xl:h-[15vh]"
            >
              <Link href={`/forum/${forum._id}`}>
                <div className="flex h-[50%] w-full flex-col justify-start p-2">
                  <h2 className="text-stroke-p font-notojp text-base font-bold text-white text-shadow-xl sm:text-sm md:text-2xl lg:text-2xl xl:text-3xl">
                    {forum.title}
                  </h2>
                  <p className="text-stroke font-notojp text-xs text-white text-shadow-xl sm:text-xs md:text-lg lg:text-xl xl:text-xl">
                    {forum.content.length > 75
                      ? forum.content.substring(0, 75) + '...'
                      : forum.content}
                  </p>
                </div>
              </Link>

              <div className="mt-2 flex h-[50%] w-full flex-row items-center justify-evenly">
                <p className="text-stroke font-notojp text-xxs text-white text-shadow-xl sm:text-xs md:text-base lg:text-lg">
                  Posts: {forum.amount}
                </p>
                <p className="text-stroke font-notojp text-xxs text-white text-shadow-xl sm:text-xs md:text-base lg:text-lg">
                  Posts/Day: {forum.perday}
                </p>
                <p className="text-stroke font-notojp text-xxs text-white text-shadow-xl sm:text-xs md:text-base lg:text-lg">
                  Latest Post:{' '}
                  {forum.latest ? formatDateFull(new Date(forum.latest)) : '-'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
