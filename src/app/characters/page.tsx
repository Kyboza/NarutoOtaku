import React from "react"
import Image from "next/image"
import Link from "next/link"
import { fetchCharacters } from "../actions/serverActions"

type ICharacter = {
    _id: string
    name: string
    description: string
    image: string
    gender: string
    age: number
    likes: number
    weight: number
    style: string
    content: string
}

export default async function CharactersPage() {
    const characters: ICharacter[] | undefined = await fetchCharacters()
    if (!characters) {
        return <p>Loading..</p>
    } else if (characters.length === 0) {
        return <p>No Characters Found</p>
    }

    return (
        <div className="mb-4 flex flex-col items-center">
            <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
                Characters
            </h1>
            <section className="scrollbar-hide flex h-[60vh] w-[80vw] flex-col overflow-y-scroll rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] xl:h-[70vh]">
                {characters.map((character) => (
                    <div
                        key={character._id}
                        className="flex h-[50%] w-full flex-col border-b border-black last-of-type:border-none xl:h-[33.3333%]"
                    >
                        <div className="flex h-[70%] w-full flex-row items-start justify-between">
                            <div className="flex h-full w-[45%] items-center justify-center">
                                <div className="relative h-[80%] w-[75%] rounded-md border border-black">
                                    <Image
                                        src={character.image}
                                        alt={character.name}
                                        className="h-full w-full rounded-md object-cover object-center"
                                        fill
                                        sizes="(max-width: 640px) 40vw, (max-width: 768px) 20vw, 30vw"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 flex h-[80%] w-[55%] flex-col justify-start">
                                <h2 className="font-notojp text-xl text-white text-shadow-lg sm:text-2xl md:text-3xl lg:text-4xl">
                                    {character.name}
                                </h2>
                                <p className="text-stroke font-notojp text-xs text-white text-shadow-lg sm:text-sm md:text-base lg:text-lg xl:text-xl">
                                    <span className="block lg:hidden">
                                        {character.description.substring(
                                            0,
                                            100,
                                        )}
                                        ...
                                    </span>
                                    <span className="landscape-lg:block hidden lg:block">
                                        {character.description}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex h-[30%] w-full flex-row items-center justify-between">
                            <div className="flex w-[45%] justify-center">
                                <Link
                                    className="text-stroke mb-1 font-notojp text-xl font-bold text-white text-shadow-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                                    href={`/characters/${character._id}`}
                                >
                                    Read More
                                </Link>
                            </div>
                            <div className="flex h-full w-[55%] items-center justify-center"></div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}
