"use client"
import React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ITopCharacters } from "../../../types"

export default function Carousel({ topChar }: { topChar: ITopCharacters[] }) {
    const [visibleIndex, setVisibleIndex] = useState<number>(0)

    useEffect(() => {
        if (topChar.length === 0) return

        const interval = setInterval(() => {
            setVisibleIndex((prevIndex) => (prevIndex + 1) % 3)
        }, 6000)

        return () => {
            clearInterval(interval)
        }
    }, [topChar])

    return (
        <>
            {topChar &&
                topChar.map((char, index) => (
                    <div
                        key={char._id}
                        className={`absolute inset-0 -z-10 flex h-[25vh] w-full items-center justify-evenly bg-cover bg-top transition-opacity duration-1000 ${index === 0 ? "bg-[url('/images/favchar/First.webp')]" : index === 1 ? "bg-[url('/images/favchar/Second.webp')]" : index === 2 ? "bg-[url('/images/favchar/Third.webp')]" : ""} ${visibleIndex === index ? "opacity-100" : "opacity-0"}`}
                    >
                        <div className="relative h-[20vw] max-h-full w-[20vw] max-w-full overflow-hidden rounded-full border sm:h-[10vw] sm:w-[10vw] md:h-[15vw] md:w-[15vw] xl:h-[11vw] xl:w-[11vw]">
                            <Image
                                className="object-cover"
                                src={char.image}
                                alt="Top Characters Image"
                                fill
                                sizes="(max-width: 640px) 40vw, (max-width: 768px) 10vw, (max-width: 1280px) 15vw, (min-width: 1280px) 30vw"
                                priority
                            />
                        </div>

                        <p className="text-stroke-p font-rock text-xl font-bold text-white text-shadow-xl sm:text-lg md:text-4xl lg:text-5xl">
                            {`# ${index + 1}`}
                        </p>
                        <p className="text-stroke-p font-rock text-xl font-bold text-white text-shadow-xl sm:text-lg md:text-4xl lg:text-5xl">
                            {char.name}
                        </p>
                        <div className="mb-3 flex items-center sm:mb-2 md:mb-5">
                            <p className="text-stroke-p mr-2 text-2xl text-shadow-xl md:text-4xl lg:text-5xl">
                                &#10084;&#65039;
                            </p>
                            <p className="text-stroke-p font-rock text-xl font-bold text-white text-shadow-xl sm:text-lg md:text-4xl lg:text-5xl">
                                {char.likes}
                            </p>
                        </div>
                    </div>
                ))}
        </>
    )
}
