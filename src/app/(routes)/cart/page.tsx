"use client";
import { FaMinus, FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { clearCart, addItem, removeItem } from "@/app/store/cartSlice";
import { IItemCart } from "../../../../types";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const items: IItemCart[] = useSelector((state: RootState) => state.cart.items);

  if (!items || items.length === 0) return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <h1 className="mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-rock text-white text-stroke-p text-shadow-xl">Cart</h1>
      <section className="w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex flex-col h-[50vh] bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-md overflow-y-auto items-center justify-center">
        <p className="font-notojp text-white text-stroke text-shadow-xl text-base sm:text-lg md:text-xl">Cart Is Empty</p>
      </section>
    </div>
  ) 

  const removeItemCart = (itemId: string) => {
    try {
      dispatch(removeItem(itemId));
    } catch(error){
      handleError(error)
    }
  }

  const addItemCart = (item: IItemCart) => {
    try{
      dispatch(addItem(item))
    } catch(error){
      handleError(error)
    }
  }

  const totalAmount = items.map(item => item.price * item.amount).reduce((acc, curr) => acc + curr, 0)


  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 mt-4 text-2xl md:text-4xl lg:text-5xl font-rock text-white text-stroke-2 text-shadow-xl">
        Cart
      </h1>
      {items.map((item) => (
        <section
          key={item._id}
          className="w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex flex-col bg-[#A5A5A5] bg-opacity-[75%] border border-black overflow-y-auto rounded-b-none rounded-t-none border-b-0 first-of-type:rounded-t-md"
        >
          <div className="flex flex-row items-center justify-between py-4">
            <div className="w-[25%] h-[60%] rounded-sm ml-1">
              <Image
                src={item.image ? item.image : '/path/to/default-image.jpg'}
                alt="Product Image"
                className="w-full h-full object-contain"
                width={1300}
                height={1300}
              />
            </div>
            <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg">
              {item.amount}
            </p>
            <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg">
              {item.name}
            </p>
            <p className="font-notojp text-white text-stroke text-shadow-xl text-sm sm:text-base md:text-lg">
              {item.price * item.amount}$
            </p>
            <div className="flex flex-row items-center">
              <button
                className="bg-[#E19B1A] border border-black rounded-md flex items-center justify-center mr-1 text-white text-stroke text-sm sm:text-base md:text-lg text-shadow-xl p-1 transition-all duration-100 ease-in-out hover:scale-105 active:scale-95"
                onClick={() => removeItemCart(item._id)}
              >
                <FaMinus className="text-xxs sm:text-sm" />
              </button>
              <button
                className="bg-[#E19B1A] border border-black rounded-md flex items-center justify-center mr-1 text-white text-stroke text-sm sm:text-base md:text-lg text-shadow-xl p-1 transition-all duration-100 ease-in-out hover:scale-105 active:scale-95"
                onClick={() => addItemCart(item)}
              >
                <FaPlus className="text-xxs sm:text-sm" />
              </button>
            </div>
          </div>
        </section>
      ))}
      {items && (
      <div className='w-full flex justify-between items-center bg-[#A5A5A5] bg-opacity-[75%] border border-black rounded-b-md p-2 '>
        <p className="w-[30%] text-white text-lg text-stroke text-shadow-xl font-notojp">{`Total: ${totalAmount} $`}</p>
          <div className="w-[70%] flex flex-row justify-end mt-2 gap-2">
            <button onClick={() => dispatch(clearCart())} className='w-auto flex justify-center text-white text-stroke text-shadow-xl py-2 px-4 border border-black rounded-md bg-[#E19B1A] transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Clear Cart</button>
            <button onClick={() => router.push('/shipping')} className='w-auto flex justify-center text-white text-stroke text-shadow-xl py-2 px-4 border border-black rounded-md bg-[#E19B1A] transform transition-all duration-100 ease-in-out hover:scale-105 active:scale-95'>Proceed</button>
          </div>
      </div>
      )}
    </div>

  );
}
