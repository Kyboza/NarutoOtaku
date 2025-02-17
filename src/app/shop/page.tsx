import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naruto Otaku Shop",
  description:
    "Explore the Naruto Otaku Shop and purchase a variety of Naruto Funko Pop figures and other anime merchandise. Perfect for collectors and fans of the series!",
  keywords:
    "Naruto, Otaku, Manga, Anime, Shop, Funko Pop, Funko dolls, Collectibles, Naruto characters, Naruto merchandise",
  openGraph: {
    title: "Naruto Otaku Shop - Buy Funko Pops and Anime Merchandise",
    description:
      "Browse through our Naruto Funko Pop figures and other exclusive anime collectibles. Find your favorite Naruto character today!",
    url: "http://localhost:3000/shop", // Update this to the actual live URL
    type: "website",
    images:
      "http://localhost:3000/src/images/website-standard/HiddenLeafBackground.jpg", // Add an image for better engagement
    siteName: "Naruto Otaku Shop",
  },
};

export default function Shop() {
  return (
    <div className="flex flex-col h-full items-center">
      <h1 className="mt-4 mb-4 text-2xl md:text-3xl font-rock text-white text-stroke-title text-shadow-xl">
        Store
      </h1>
      <section
        className="w-full max-w-[80vw] lg:max-w-[60vw] 
                   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                   h-auto bg-[#A5A5A5] bg-opacity-75 border border-black rounded-md 
                   overflow-hidden"
      >
        {/* Grid Item 1 */}
        <div className="relative rounded-tl-md border-b sm:border-r border-black">
          <Image
            src="/images/storeitems/NarutoFunko.webp"
            alt="Naruto doll"
            className="w-full h-full object-cover"
            width={1300}
            height={1300}
          />
          <div
            className="bg-[url('/images/storeitems/NarutoFace.webp')] bg-cover bg-center 
                       cursor-pointer absolute inset-0 rounded-tl-md opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <div className="bg-[rgba(140,140,140,0.75)] absolute inset-0 flex flex-col justify-around items-center rounded-tl-md">
              <p className="font-notojp text-white text-stroke text-shadow-xl text-sm md:text-2xl">
                Naruto - 25$
              </p>
              <button className="w-[80%] bg-[#E19B1A] border p-0.5 border-black rounded-md font-notojp text-white text-stroke text-xs md:text-lg md:p-0">
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Grid Item 2 */}
        <div className="relative border-b sm:border-r border-black">
          <Image
            src="/images/storeitems/KakashiFunko.webp"
            alt="Kakashi doll"
            className="w-full h-full object-cover"
            width={1300}
            height={1300}
          />
          <div
            className="bg-[url('/images/storeitems/KakashiFace.webp')] bg-cover bg-center 
                       cursor-pointer absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <div className="bg-[rgba(140,140,140,0.75)] absolute inset-0 flex flex-col justify-around items-center">
              <p className="font-notojp text-white text-stroke text-shadow-xl text-sm md:text-2xl">
                Kakashi - 23$
              </p>
              <button className="w-[80%] bg-[#E19B1A] border p-0.5 border-black rounded-md font-notojp text-white text-stroke text-xs md:text-lg md:p-0">
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Grid Item 3 */}
        <div className="relative md:rounded-tr-md border-b sm:border-r md:border-r-0 border-black">
          <Image
            src="/images/storeitems/GaaraFunko.webp"
            alt="Gaara doll"
            className="w-full h-full object-cover"
            width={1300}
            height={1300}
          />
          <div
            className="bg-[url('/images/storeitems/GaaraFace.webp')] bg-cover bg-center 
                       cursor-pointer absolute inset-0 rounded-tr-md opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <div className="bg-[rgba(140,140,140,0.75)] absolute inset-0 flex flex-col justify-around items-center rounded-tr-md">
              <p className="font-notojp text-white text-stroke text-shadow-xl text-sm md:text-2xl">
                Gaara - 27$
              </p>
              <button className="w-[80%] bg-[#E19B1A] border p-0.5 border-black rounded-md font-notojp text-white text-stroke text-xs md:text-lg md:p-0">
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Grid Item 4 */}
        <div className="border-b sm:border-r border-black relative">
          <Image
            src="/images/storeitems/HaganeFunko.webp"
            alt="Hagane doll"
            className="w-full h-full object-cover"
            width={1300}
            height={1300}
          />
          <div
            className="bg-[url('/images/storeitems/HaganeFace.webp')] bg-cover bg-center 
                       cursor-pointer absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <div className="bg-[rgba(140,140,140,0.75)] absolute inset-0 flex flex-col justify-around items-center">
              <p className="font-notojp text-white text-stroke text-shadow-xl text-sm md:text-2xl">
                Hagane - 19$
              </p>
              <button className="w-[80%] bg-[#E19B1A] border p-0.5 border-black rounded-md font-notojp text-white text-stroke text-xs md:text-lg md:p-0">
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Grid Item 5 */}
        <div className="relative border-b sm:border-r border-black">
          <Image
            src="/images/storeitems/MinatoFunko.webp"
            alt="Minato doll"
            className="w-full h-full object-cover"
            width={1024}
            height={1024}
          />
          <div
            className="bg-[url('/images/storeitems/MinatoFace.webp')] bg-cover bg-center 
                       cursor-pointer absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <div className="bg-[rgba(140,140,140,0.75)] absolute inset-0 flex flex-col justify-around items-center">
              <p className="font-notojp text-white text-stroke text-shadow-xl text-sm md:text-2xl">
                Minato - 28$
              </p>
              <button className="w-[80%] bg-[#E19B1A] border p-0.5 border-black rounded-md font-notojp text-white text-stroke text-xs md:text-lg md:p-0">
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Grid Item 6 */}
        <div className="relative border-b border-black">
          <Image
            src="/images/storeitems/ObitoFunko.webp"
            alt="Obito doll"
            className="w-full h-full object-cover"
            width={1200}
            height={1200}
          />
          <div
            className="bg-[url('/images/storeitems/ObitoFace.webp')] bg-cover bg-center 
                       cursor-pointer absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <div className="bg-[rgba(140,140,140,0.75)] absolute inset-0 flex flex-col justify-around items-center">
              <p className="font-notojp text-white text-stroke text-shadow-xl text-sm md:text-2xl">
                Obito - 21$
              </p>
              <button className="w-[80%] bg-[#E19B1A] border p-0.5 border-black rounded-md font-notojp text-white text-stroke text-xs md:text-lg md:p-0">
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Grid Item 7 */}
        <div className="relative md:rounded-bl-md border-b sm:border-r md:border-b-0 border-black">
          <Image
            src="/images/storeitems/HidanFunko.webp"
            alt="Hidan doll"
            className="w-full h-full object-cover"
            width={1200}
            height={1200}
          />
          <div
            className="bg-[url('/images/storeitems/HidanFace.webp')] bg-cover bg-center 
                       cursor-pointer absolute inset-0 rounded-bl-md opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <div className="bg-[rgba(140,140,140,0.75)] absolute inset-0 flex flex-col justify-around items-center rounded-bl-md">
              <p className="font-notojp text-white text-stroke text-shadow-xl text-sm md:text-2xl">
                Hidan - 30$
              </p>
              <button className="w-[80%] bg-[#E19B1A] border p-0.5 border-black rounded-md font-notojp text-white text-stroke text-xs md:text-lg md:p-0">
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Grid Item 8 */}
        <div className="relative border-b md:border-b-0 sm:border-r border-black">
          <Image
            src="/images/storeitems/OrochiFunko.webp"
            alt="Orochimaru doll"
            className="w-full h-full object-cover"
            width={1280}
            height={1280}
          />
          <div
            className="bg-[url('/images/storeitems/OrochimaruFace.webp')] bg-cover bg-center 
                       cursor-pointer absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <div className="bg-[rgba(140,140,140,0.75)] absolute inset-0 flex flex-col justify-around items-center">
              <p className="font-notojp text-white text-stroke text-shadow-xl text-sm md:text-2xl">
                Orochimaru - 23$
              </p>
              <button className="w-[80%] bg-[#E19B1A] border p-0.5 border-black rounded-md font-notojp text-white text-stroke text-xs md:text-lg md:p-0">
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Grid Item 9 */}
        <div className="relative md:rounded-br-md sm:border-r md:border-r-0 border-black">
          <Image
            src="/images/storeitems/PainFunko.webp"
            alt="Pain doll"
            className="w-full h-full object-cover"
            width={1024}
            height={1024}
          />
          <div
            className="bg-[url('/images/storeitems/PainFace.webp')] bg-cover bg-center 
                       cursor-pointer absolute inset-0 rounded-br-md opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <div className="bg-[rgba(140,140,140,0.75)] absolute inset-0 flex flex-col justify-around items-center rounded-br-md">
              <p className="font-notojp text-white text-stroke text-shadow-xl text-sm md:text-2xl">
                Pain - 32$
              </p>
              <button className="w-[80%] bg-[#E19B1A] border p-0.5 border-black rounded-md font-notojp text-white text-stroke text-xs md:text-lg md:p-0">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
