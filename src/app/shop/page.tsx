import Image from "next/image";
import CartButton from "../components/CartButton";
import { loadShopItems } from "../actions/userActions";
import { IItemCart } from "../../../types";


export default async function Shop() {
  const items: IItemCart[] = (await loadShopItems()) || []
  if(!items || items.length === 0) return <p>Could not get Items from Database</p>

  return (
    <div className="flex flex-col h-auto items-center">
      <h1 className="mt-4 mb-4 text-2xl md:text-3xl font-rock text-white text-stroke-title text-shadow-xl">
        Store
      </h1>
      <section className="w-full max-w-[80vw] lg:max-w-[60vw] xl:max-w-[35vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-auto bg-[#A5A5A5] bg-opacity-75 border border-black rounded-md overflow-hidden">
        {items && items.map((item) => (
          <div key={item._id} className="relative rounded-tl-md border-b sm:border-r border-black">
           <Image
             src={item.image}
             alt="Naruto doll"
             className="w-full h-full object-cover"
             width={1300}
             height={1300}
            //  priority={item.image === '/images/storeitems/GaaraFunko.webp' ? true : false} Kan vara bakgrunden och inte funko vänta på error igen
           />
           <div
            className="bg-cover bg-center cursor-pointer absolute inset-0 rounded-tl-md opacity-0 transition-opacity duration-300 hover:opacity-100"
            style={item.bgimage ? { backgroundImage: `url(${item.bgimage})` } : {}}
           >
             <div className="bg-[rgba(140,140,140,0.75)] absolute inset-0 flex flex-col justify-around items-center rounded-tl-md">
               <p className="font-notojp text-white text-stroke text-shadow-xl text-sm md:text-2xl xl:text-xl">
                 {item.name} - {item.price + '$'}
               </p>
               <CartButton item={item}/>
             </div>
           </div>
         </div>
        ))}
      </section>
    </div>
  );
}
