import React from 'react';
import Image from 'next/image';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Character Selection - Naruto Otaku Shop", // Title for character selection page
    description: "Explore your favorite Naruto characters! Select a character to learn more about their story, powers, and collectibles available at the Naruto Otaku Shop.",
    keywords: "Naruto, Characters, Otaku, Anime, Character Selection, Naruto Shop, Anime Collectibles, Read About Characters",
    openGraph: {
        title: "Character Selection - Naruto Otaku Shop", // Open Graph title for social sharing
        description: "Discover and explore the world of Naruto characters. Select your favorite character to dive deeper into their story and view related anime collectibles.",
        url: "http://localhost:3000/characters", // URL for character selection page
        type: "website", // Type of content
        siteName: "Naruto Otaku Shop",
    },
};


export default function Characters() {
  return (
    <div className='flex flex-col items-center'>
      <h1 className="mb-2 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl landscape-lg:text-4xl landscape-xl:text-5xl font-rock text-white text-stroke-title text-shadow-xl">
        Characters
      </h1>
      <section className='flex flex-col h-[60vh] w-[80vw] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md overflow-y-scroll scrollbar-hide'>

      <div className='flex flex-col h-[50%] w-full border-b border-black'>
        <div className='flex flex-row h-[70%] w-full justify-between items-start'>
            <div className='w-[45%] h-full flex items-center justify-center'>
                <div className='border border-black rounded-md h-[80%] w-[75%]'>
                    <Image src="/images/characters/Naruto.jpg" alt="Naruto About Image" className="w-full h-full object-cover object-center rounded-md" width={1920} height={1080} />
                </div>
            </div>
            
            <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
                <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                    Naruto
                </h2>
                <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                    Naruto Uzumaki is a young ninja chasing his dreams of becoming Hokage.
                </p>
            </div>
        </div>

        <div className='flex flex-row h-[30%] w-full justify-between items-center'>
            <div className='w-[45%] flex justify-center'>
                <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1'>
                    Read More
                </p>
            </div>
            <div className='w-[55%] h-full flex justify-center items-center'>
                <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                    <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                        &#10084;&#65039;
                    </p>
                    <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                        320
                    </p>
                </button>
            </div>
        </div>
    </div>




        <div className='flex flex-col h-[50%] w-full border-b border-black'>
            <div className='flex flex-row h-[70%] w-full justify-between items-start'>
                <div className='w-[45%] h-full flex items-center justify-center'>
                    <div className='border border-black rounded-md h-[80%] w-[75%]'>
                        <Image src="/images/characters/Kakashi.webp" alt="Kakashi About Image" className="w-full h-full object-cover object-center rounded-md" width={1439} height={1076} />
                    </div>
                </div>
                
                <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
                    <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                        Kakashi
                    </h2>
                    <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                        Kakashi Hatake is a skilled ninja shaped by his past and loyalty to his comrades.
                    </p>
                </div>
            </div>

            <div className='flex flex-row h-[30%] w-full justify-between items-center'>
                <div className='w-[45%] flex justify-center'>
                    <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1'>
                        Read More
                    </p>
                </div>
                <div className='w-[55%] h-full flex justify-center items-center'>
                    <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                        <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                            &#10084;&#65039;
                        </p>
                        <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                            432
                        </p>
                    </button>
                </div>
            </div>
        </div>

        <div className='flex flex-col h-[50%] w-full border-b border-black'>
            <div className='flex flex-row h-[70%] w-full justify-between items-start'>
                <div className='w-[45%] h-full flex items-center justify-center'>
                    <div className='border border-black rounded-md h-[80%] w-[75%]'>
                        <Image src="/images/characters/Sasuke.webp" alt="Sasuke About Image" className="w-full h-full object-cover object-center rounded-md" width={1280} height={720} />
                    </div>
                </div>
                
                <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
                    <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                        Sasuke
                    </h2>
                    <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                        Sasuke Uchiha is driven by vengeance, seeking justice for his family.
                    </p>
                </div>
            </div>

            <div className='flex flex-row h-[30%] w-full justify-between items-center'>
                <div className='w-[45%] flex justify-center'>
                    <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1'>
                        Read More
                    </p>
                </div>
                <div className='w-[55%] h-full flex justify-center items-center'>
                    <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                        <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                            &#10084;&#65039;
                        </p>
                        <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                            431
                        </p>
                    </button>
                </div>
            </div>
        </div>

        <div className='flex flex-col h-[50%] w-full border-b border-black'>
            <div className='flex flex-row h-[70%] w-full justify-between items-start'>
                <div className='w-[45%] h-full flex items-center justify-center'>
                    <div className='border border-black rounded-md h-[80%] w-[75%]'>
                        <Image src="/images/characters/Sakura.jpg" alt="Sakura About Image" className="w-full h-full object-cover object-center rounded-md" width={1280} height={720} />
                    </div>
                </div>
                
                <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
                    <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                        Sakura
                    </h2>
                    <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                        Sakura Haruno is determined to protect her loved ones and grows stronger every day.
                    </p>
                </div>
            </div>

            <div className='flex flex-row h-[30%] w-full justify-between items-center'>
                <div className='w-[45%] flex justify-center'>
                    <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1'>
                        Read More
                    </p>
                </div>
                <div className='w-[55%] h-full flex justify-center items-center'>
                    <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                        <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                            &#10084;&#65039;
                        </p>
                        <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                            123
                        </p>
                    </button>
                </div>
            </div>
        </div>

        <div className='flex flex-col h-[50%] w-full border-b border-black'>
            <div className='flex flex-row h-[70%] w-full justify-between items-start'>
                <div className='w-[45%] h-full flex items-center justify-center'>
                    <div className='border border-black rounded-md h-[80%] w-[75%]'>
                        <Image src="/images/characters/Shikamaru.webp" alt="Shikamaru About Image" className="w-full h-full object-cover object-center rounded-md" width={1920} height={1081} />
                    </div>
                </div>
                
                <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
                    <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                        Shikamaru
                    </h2>
                    <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                        Shikamaru is a brilliant strategist who prefers a calm life but rises to any challenge.
                    </p>
                </div>
            </div>

            <div className='flex flex-row h-[30%] w-full justify-between items-center'>
                <div className='w-[45%] flex justify-center'>
                    <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1'>
                        Read More
                    </p>
                </div>
                <div className='w-[55%] h-full flex justify-center items-center'>
                    <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                        <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                            &#10084;&#65039;
                        </p>
                        <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                            175
                        </p>
                    </button>
                </div>
            </div>
        </div>

        <div className='flex flex-col h-[50%] w-full border-b border-black'>
            <div className='flex flex-row h-[70%] w-full justify-between items-start'>
                <div className='w-[45%] h-full flex items-center justify-center'>
                    <div className='border border-black rounded-md h-[80%] w-[75%]'>
                        <Image src="/images/characters/Jiraya.webp" alt="Jiraya About Image" className="w-full h-full object-cover object-center rounded-md" width={1262} height={710} />
                    </div>
                </div>
                
                <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
                    <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                        Jiraya
                    </h2>
                    <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                        Jiraiya is a wise and legendary ninja, always protecting the future of the next generation.
                    </p>
                </div>
            </div>

            <div className='flex flex-row h-[30%] w-full justify-between items-center'>
                <div className='w-[45%] flex justify-center'>
                    <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1'>
                        Read More
                    </p>
                </div>
                <div className='w-[55%] h-full flex justify-center items-center'>
                    <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                        <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                            &#10084;&#65039;
                        </p>
                        <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                            572
                        </p>
                    </button>
                </div>
            </div>
        </div>




        <div className='flex flex-col h-[50%] w-full border-b border-black'>
    <div className='flex flex-row h-[70%] w-full justify-between items-start'>
        <div className='w-[45%] h-full flex items-center justify-center'>
            <div className='border border-black rounded-md h-[80%] w-[75%]'>
                <Image src="/images/characters/LadyTsunade.webp" alt="Lady Tsunade About Image" className="w-full h-full object-cover object-center rounded-md" width={1481} height={1080} />
            </div>
        </div>
        <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                Lady Tsunade
            </h2>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                Lady Tsunade is a powerful healer and leader, dedicated to her village and loved ones.
            </p>
        </div>
    </div>
    <div className='flex flex-row h-[30%] w-full justify-between items-center'>
        <div className='w-[45%] flex justify-center'>
            <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1'>
                Read More
            </p>
        </div>
        <div className='w-[55%] h-full flex justify-center items-center'>
            <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                    &#10084;&#65039;
                </p>
                <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                    321
                </p>
            </button>
        </div>
    </div>
</div>

<div className='flex flex-col h-[50%] w-full border-b border-black'>
    <div className='flex flex-row h-[70%] w-full justify-between items-start'>
        <div className='w-[45%] h-full flex items-center justify-center'>
            <div className='border border-black rounded-md h-[80%] w-[75%]'>
                <Image src="/images/characters/Asuma.png" alt="Asuma About Image" className="w-full h-full object-cover object-center rounded-md" width={1600} height={1074} />
            </div>
        </div>
        <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                Asuma
            </h2>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                Asuma Sarutobi is a wise and strong shinobi, known for his leadership and dedication.
            </p>
        </div>
    </div>
    <div className='flex flex-row h-[30%] w-full justify-between items-center'>
        <div className='w-[45%] flex justify-center'>
            <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1'>
                Read More
            </p>
        </div>
        <div className='w-[55%] h-full flex justify-center items-center'>
            <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                    &#10084;&#65039;
                </p>
                <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                    124
                </p>
            </button>
        </div>
    </div>
</div>

<div className='flex flex-col h-[50%] w-full border-b border-black'>
    <div className='flex flex-row h-[70%] w-full justify-between items-start'>
        <div className='w-[45%] h-full flex items-center justify-center'>
            <div className='border border-black rounded-md h-[80%] w-[75%]'>
                <Image src="/images/characters/Sasori.webp" alt="Sasori About Image" className="w-full h-full object-cover object-center rounded-md" width={1423} height={1069} />
            </div>
        </div>
        <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                Sasori
            </h2>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                Sasori is a master puppeteer, using his creations to manipulate and control his foes.
            </p>
        </div>
    </div>
    <div className='flex flex-row h-[30%] w-full justify-between items-center'>
        <div className='w-[45%] flex justify-center'>
            <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1'>
                Read More
            </p>
        </div>
        <div className='w-[55%] h-full flex justify-center items-center'>
            <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                    &#10084;&#65039;
                </p>
                <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                    242
                </p>
            </button>
        </div>
    </div>
</div>

<div className='flex flex-col h-[50%] w-full border-b border-black'>
    <div className='flex flex-row h-[70%] w-full justify-between items-start'>
        <div className='w-[45%] h-full flex items-center justify-center'>
            <div className='border border-black rounded-md h-[80%] w-[75%]'>
                <Image src="/images/characters/Kakazu.webp" alt="Kakazu About Image" className="w-full h-full object-cover object-center rounded-md" width={1440} height={1080} />
            </div>
        </div>
        <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                Kakazu
            </h2>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                Kakazu is a cold-hearted and greedy ninja, seeking wealth and power with his deadly abilities.
            </p>
        </div>
    </div>
    <div className='flex flex-row h-[30%] w-full justify-between items-center'>
        <div className='w-[45%] flex justify-center'>
            <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1'>
                Read More
            </p>
        </div>
        <div className='w-[55%] h-full flex justify-center items-center'>
            <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                    &#10084;&#65039;
                </p>
                <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                    86
                </p>
            </button>
        </div>
    </div>
</div>




<div className='flex flex-col h-[50%] w-full border-b border-black'>
    <div className='flex flex-row h-[70%] w-full justify-between items-start'>
        <div className='w-[45%] h-full flex items-center justify-center'>
            <div className='border border-black rounded-md h-[80%] w-[75%]'>
                <Image src="/images/characters/Hidan.jpg" alt="Hidan About Image" className="w-full h-full object-cover object-center rounded-md" width={1440} height={1080} />
            </div>
        </div>
        <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                Hidan
            </h2>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                Hidan is a sadistic and unpredictable ninja, whose twisted beliefs fuel his immortality.
            </p>
        </div>
    </div>
    <div className='flex flex-row h-[30%] w-full justify-between items-center'>
        <div className='w-[45%] flex justify-center'>
            <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1'>
                Read More
            </p>
        </div>
        <div className='w-[55%] h-full flex justify-center items-center'>
            <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                    &#10084;&#65039;
                </p>
                <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                    72
                </p>
            </button>
        </div>
    </div>
</div>

<div className='flex flex-col h-[50%] w-full border-b border-black'>
    <div className='flex flex-row h-[70%] w-full justify-between items-start'>
        <div className='w-[45%] h-full flex items-center justify-center'>
            <div className='border border-black rounded-md h-[80%] w-[75%]'>
                <Image src="/images/characters/Orochimaru.webp" alt="Orochimaru About Image" className="w-full h-full object-cover object-center rounded-md" width={1440} height={1080} />
            </div>
        </div>
        <div className='flex flex-col justify-start w-[55%] h-[80%] mb-4'>
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-notojp text-white text-shadow-lg'>
                Orochimaru
            </h2>
            <p className='font-notojp text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-stroke text-shadow-lg'>
                A sinister and ambitious rogue ninja, seeking immortality through forbidden jutsu.
            </p>
        </div>
    </div>
    <div className='flex flex-row h-[30%] w-full justify-between items-center'>
        <div className='w-[45%] flex justify-center'>
            <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-notojp font-bold text-white text-stroke text-shadow-lg mb-1'>
                Read More
            </p>
        </div>
        <div className='w-[55%] h-full flex justify-center items-center'>
            <button className='flex flex-row items-center bg-[#737373] h-[50%] sm:h-[50%] md:h-[50%] lg:h-[60%] xl:h-[70%] landscape-sm:h-[5vh] border border-black rounded-md p-1'>
                <p className='text-shadow-lg mr-0.5 text-sm sm:text-sm md:text-xl lg:text-3xl'>
                    &#10084;&#65039;
                </p>
                <p className='font-notojp text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-white text-shadow-lg'>
                    298
                </p>
            </button>
        </div>
    </div>
</div>

      </section>
    </div>
  );
}
