"use client"
import { FaMinus, FaPlus } from "react-icons/fa"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/app/store/store"
import { clearCart, addItem, removeItem } from "@/app/store/cartSlice"
import { IItemCart } from "../../../../types"
import { useRouter } from "next/navigation"

export default function Cart() {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const items: IItemCart[] = useSelector(
        (state: RootState) => state.cart.items,
    )

    if (!items || items.length === 0)
        return (
            <div className="flex w-full flex-col items-center justify-center p-4">
                <h1 className="mb-4 font-rock text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl">
                    Cart
                </h1>
                <section className="flex h-[50vh] w-full flex-col items-center justify-center overflow-y-auto rounded-md border border-black bg-[#A5A5A5] bg-opacity-75 sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]">
                    <p className="font-notojp text-base text-white sm:text-lg md:text-xl">
                        Cart Is Empty
                    </p>
                </section>
            </div>
        )

    const totalAmount = items.reduce(
        (acc, item) => acc + item.price * item.amount,
        0,
    )

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="mb-4 mt-4 font-rock text-2xl text-white md:text-4xl lg:text-5xl">
                Cart
            </h1>
            {items.map((item) => (
                <section
                    key={item._id}
                    className="flex h-auto w-full flex-col items-center justify-between border border-b-0 border-black bg-[#A5A5A5] bg-opacity-75 p-2 sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"
                >
                    <div className="flex w-full flex-col items-center justify-between sm:flex-row">
                        <div className="relative h-20 w-20 rounded-sm sm:h-24 sm:w-24">
                            <Image
                                src={item.image || "/path/to/default-image.jpg"}
                                alt="Product Image"
                                className="rounded object-cover"
                                fill
                                sizes="(max-width: 640px) 40vw, (max-width: 768px) 30vw, 25vw"
                            />
                        </div>
                        <div className="mb-2 flex w-full flex-row justify-between sm:w-[50%]">
                            <p className="font-notojp text-sm text-white sm:text-base md:text-lg">
                                {item.name}
                            </p>
                            <p className="font-notojp text-sm text-white opacity-0 sm:text-base sm:opacity-100 md:text-lg">
                                {item.amount}
                            </p>
                            <p className="font-notojp text-sm text-white sm:text-base md:text-lg">
                                {item.price * item.amount}$
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <button
                                className="flex items-center justify-center rounded border border-black bg-[#E19B1A] p-2 text-white transition hover:scale-105 active:scale-95"
                                onClick={() => dispatch(removeItem(item._id))}
                            >
                                <FaMinus />
                            </button>
                            <button
                                className="flex items-center justify-center rounded border border-black bg-[#E19B1A] p-2 text-white transition hover:scale-105 active:scale-95"
                                onClick={() => dispatch(addItem(item))}
                            >
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                </section>
            ))}
            <div className="flex w-full flex-col items-center gap-2 border border-black bg-[#A5A5A5] bg-opacity-75 p-4 sm:w-[70vw] sm:flex-row sm:justify-between md:w-[60vw] lg:w-[50vw] xl:w-[40vw]">
                <p className="font-notojp text-lg text-white">
                    Total: {totalAmount} $
                </p>
                <div className="flex flex-row gap-2">
                    <button
                        onClick={() => dispatch(clearCart())}
                        className="rounded border border-black bg-[#E19B1A] p-2 text-white transition hover:scale-105 active:scale-95"
                    >
                        Clear
                    </button>
                    <button
                        onClick={() => router.push("/shipping")}
                        className="rounded border border-black bg-[#E19B1A] p-2 text-white transition hover:scale-105 active:scale-95"
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    )
}
