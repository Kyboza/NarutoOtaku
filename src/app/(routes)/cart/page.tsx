'use client'
import { FaMinus, FaPlus } from 'react-icons/fa'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/app/store/store'
import { clearCart, addItem, removeItem } from '@/app/store/cartSlice'
import { IItemCart } from '../../../../types'
import { useRouter } from 'next/navigation'

export default function Cart() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const items: IItemCart[] = useSelector((state: RootState) => state.cart.items)

  if (!items || items.length === 0)
    return (
      <div className="flex w-full flex-col items-center justify-center p-4">
        <h1 className="text-stroke-p mb-4 font-rock text-xl text-white text-shadow-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Cart
        </h1>
        <section className="flex h-[50vh] w-full flex-col items-center justify-center overflow-y-auto rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]">
          <p className="text-stroke font-notojp text-base text-white text-shadow-xl sm:text-lg md:text-xl">
            Cart Is Empty
          </p>
        </section>
      </div>
    )

  const removeItemCart = (itemId: string) => {
    try {
      dispatch(removeItem(itemId))
    } catch (error) {
      console.error(error)
    }
  }

  const addItemCart = (item: IItemCart) => {
    try {
      dispatch(addItem(item))
    } catch (error) {
      console.error(error)
    }
  }

  const totalAmount = items
    .map((item) => item.price * item.amount)
    .reduce((acc, curr) => acc + curr, 0)

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
        Cart
      </h1>
      {items.map((item) => (
        <section
          key={item._id}
          className="flex w-full flex-col overflow-y-auto rounded-b-none rounded-t-none border border-b-0 border-black bg-[#A5A5A5] bg-opacity-[75%] first-of-type:rounded-t-md sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"
        >
          <div className="flex flex-row items-center justify-between py-4">
            <div className="ml-1 h-[60%] w-[25%] rounded-sm">
              <Image
                src={item.image ? item.image : '/path/to/default-image.jpg'}
                alt="Product Image"
                className="h-full w-full object-contain"
                width={1300}
                height={1300}
              />
            </div>
            <p className="text-stroke font-notojp text-sm text-white text-shadow-xl sm:text-base md:text-lg">
              {item.amount}
            </p>
            <p className="text-stroke font-notojp text-sm text-white text-shadow-xl sm:text-base md:text-lg">
              {item.name}
            </p>
            <p className="text-stroke font-notojp text-sm text-white text-shadow-xl sm:text-base md:text-lg">
              {item.price * item.amount}$
            </p>
            <div className="flex flex-row items-center">
              <button
                className="text-stroke mr-1 flex items-center justify-center rounded-md border border-black bg-[#E19B1A] p-1 text-sm text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95 sm:text-base md:text-lg"
                onClick={() => removeItemCart(item._id)}
              >
                <FaMinus className="text-xxs sm:text-sm" />
              </button>
              <button
                className="text-stroke mr-1 flex items-center justify-center rounded-md border border-black bg-[#E19B1A] p-1 text-sm text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95 sm:text-base md:text-lg"
                onClick={() => addItemCart(item)}
              >
                <FaPlus className="text-xxs sm:text-sm" />
              </button>
            </div>
          </div>
        </section>
      ))}
      {items && (
        <div className="flex w-full items-center justify-between rounded-b-md border border-black bg-[#A5A5A5] bg-opacity-[75%] p-2">
          <p className="text-stroke w-[30%] font-notojp text-lg text-white text-shadow-xl">{`Total: ${totalAmount} $`}</p>
          <div className="mt-2 flex w-[70%] flex-row justify-end gap-2">
            <button
              onClick={() => dispatch(clearCart())}
              className="text-stroke flex w-auto transform justify-center rounded-md border border-black bg-[#E19B1A] px-4 py-2 text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95"
            >
              Clear Cart
            </button>
            <button
              onClick={() => router.push('/shipping')}
              className="text-stroke flex w-auto transform justify-center rounded-md border border-black bg-[#E19B1A] px-4 py-2 text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
