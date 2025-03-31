import React from "react"
import Carousel from "./Carousel"
import { favorite } from "../actions/serverActions"
import { ITopCharacters } from "../../../types"
import Image from "next/image"
import Link from "next/link"

export default async function HomePage() {
    const topChar: ITopCharacters[] | null = await favorite()
    if (!topChar || topChar === undefined)
        return <p>Could not get top characters</p>

    return (
        <div className="flex flex-col items-center justify-between">
            <section className="relative flex h-[25vh] w-screen items-end justify-center border border-black">
                <Carousel topChar={topChar} />
            </section>

            <section className="mt-4 flex h-auto w-screen animate-homeNavigation flex-row items-center justify-center gap-2 rounded-md p-4 sm:gap-4">
                <Link href="/shop">
                    <div className="relative h-[25vh] w-[30vw] transition-transform duration-300 hover:scale-105 active:scale-95 sm:h-[33vh] sm:w-[25vw] md:w-[30vw] xl:h-[40vh]">
                        <Image
                            className="object-cover"
                            src="/images/website-standard/SasukeMain.webp"
                            alt="Visit Shop"
                            fill
                            sizes="(max-width: 640px) 40vw, 30vw"
                            priority
                        />
                        <p className="text-stroke-2 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-rock text-2xl text-white md:text-4xl lg:text-5xl">
                            Shop
                        </p>
                    </div>
                </Link>
                <Link href="/forum">
                    <div className="relative h-[25vh] w-[30vw] transition-transform duration-150 hover:scale-105 active:scale-95 sm:h-[33vh] sm:w-[25vw] md:w-[30vw] xl:h-[40vh]">
                        <Image
                            className="object-cover"
                            src="/images/website-standard/NarutoMain.webp"
                            alt="Visit Forum"
                            fill
                            sizes="(max-width: 640px) 40vw, 30vw"
                            priority
                        />
                        <p className="text-stroke-p absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-rock text-2xl text-white md:text-4xl lg:text-5xl">
                            Forum
                        </p>
                    </div>
                </Link>
                <Link href="/characters">
                    <div className="relative h-[25vh] w-[30vw] transition-transform duration-300 hover:scale-105 active:scale-95 sm:h-[33vh] sm:w-[25vw] md:w-[30vw] xl:h-[40vh]">
                        <Image
                            className="object-cover"
                            src="/images/website-standard/SakuraMain.webp"
                            alt="Visit Read About"
                            fill
                            sizes="(max-width: 640px) 40vw, 30vw"
                            priority
                        />
                        <p className="text-stroke-2 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-rock text-2xl text-white drop-shadow-2xl md:text-4xl lg:text-5xl">
                            Read
                        </p>
                    </div>
                </Link>
            </section>

            <h2 className="text-stroke font-notojp text-xs font-bold text-white drop-shadow-xl md:text-xl lg:text-2xl">
                Unofficial & Non-Profit Project Made For Educational Purposes
            </h2>
        </div>
    )
}
