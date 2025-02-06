import { RxTriangleDown } from "react-icons/rx";
import Image from "next/image";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Cart - Naruto Otaku Shop",
    description: "View and manage the items in your cart at Naruto Otaku Shop. Review your selections and proceed to checkout for your anime collectibles.",
    keywords: "Naruto, Otaku, Anime, Cart, Checkout, Order, Purchase, Collectibles, Shop, Anime Goods",
    openGraph: {
      title: "Your Cart - Naruto Otaku Shop",
      description: "Manage your items in the cart at Naruto Otaku Shop. Review and proceed to checkout to complete your order for collectibles and anime merchandise!",
      url: "http://localhost:3000/cart",
      type: "website",
      siteName: "Naruto Otaku Shop",
    },
};


export const Cart: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className="mb-2 mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl landscape-lg:text-4xl landscape-xl:text-5xl 
                     font-rock text-white text-stroke-title text-shadow-xl">
        Cart
      </h1>

      <section className='w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] landscape-lg:w-[45vw] landscape-xl:w-[40vw] 
                          flex flex-col bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md overflow-y-scroll scrollbar-hide'>
        <div className='h-[15vh] landscape-sm:h-[20vh] flex flex-row justify-evenly items-center'>
            <div className='w-[25%] h-[60%] border border-black rounded-sm'>
                 <Image src="/images/storeitems/NarutoFunko.png" alt="Naruto doll" className="w-full h-full object-contain" width={1300} height={1300} />
            </div>
            <p className='font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'>1x</p>
            <p className='font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'>Naruto Funko</p>
            <p className='font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'>32$</p>
            <button className='w-[10%] sm:w-[10%] md:w-[10%] lg:w-[8%] landscape-xl:w-[8%] 
                               h-[3vh] sm:h-[6vh] md:h-[3vh] landscape-md:h-[6vh] landscape-lg:h-[4vh] landscape-xl:h-[4vh] flex flex-row items-center justify-center p-0.5 mt-1
                               bg-[#E19B1A] border border-black rounded-md font-notojp text-white text-sm sm:text-base md:text-lg 
                               text-shadow-xl'>
                <RxTriangleDown className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />
                <p className="mr-1 text-sm sm:text-base md:text-lg">{1}</p>
            </button>
        </div>
      </section>

      {/* Button container - Positioning it outside the section */}
      <div className='w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] landscape-lg:w-[45vw] landscape-xl:w-[40vw] 
                      flex justify-end items-end relative'>
        <button className='w-[40%] landscape-sm:w-[25%] py-1 mt-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white 
                           text-sm sm:text-base md:text-lg lg:text-xl landscape-lg:text-lg landscape-xl:text-lg text-stroke text-shadow-xl'>
          Proceed
        </button>
      </div>
    </div>
  );
}
