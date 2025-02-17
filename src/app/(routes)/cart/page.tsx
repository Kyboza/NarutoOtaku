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

export default function Cart() {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-rock text-white text-stroke-title text-shadow-xl">
        Cart
      </h1>

      <section className="w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] 
                          flex flex-col bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md overflow-y-auto">
        <div className="flex flex-row items-center justify-between py-4">
          <div className="w-[25%] h-[60%] border border-black rounded-sm ml-1">
            <Image
              src="/images/storeitems/NarutoFunko.png"
              alt="Naruto doll"
              className="w-full h-full object-contain"
              width={1300}
              height={1300}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-6">
            <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg">1x</p>
            <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg">Naruto Funko</p>
            <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg">32$</p>
          </div>
          <button className="w-[10%] h-[4vh] bg-[#E19B1A] border border-black rounded-md flex items-center justify-center mt-1 mr-1
                             text-white text-sm sm:text-base md:text-lg text-shadow-xl">
            <RxTriangleDown className="text-lg sm:text-xl md:text-2xl" />
          </button>
        </div>
      </section>

      {/* Button container - Positioning it outside the section */}
      <div className="w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex justify-end items-center mt-4">
        <button className="w-[40%] sm:w-[30%] py-2 bg-[#E19B1A] border border-black rounded-md font-notojp text-white 
                          text-sm sm:text-base md:text-lg text-stroke text-shadow-xl">
          Proceed
        </button>
      </div>
    </div>
  );
}

