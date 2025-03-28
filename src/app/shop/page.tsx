import Image from "next/image"
import CartButton from "../components/CartButton"
import { loadShopItems } from "../actions/serverActions"
import { IItemCart } from "../../../types"

export default async function Shop() {
    const items: IItemCart[] = (await loadShopItems()) || []
    if (!items || items.length === 0)
        return <p>Could not get Items from Database</p>

    return (
        <div className="flex h-auto flex-col items-center">
            <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
                Store
            </h1>
            <section className="grid h-auto w-full max-w-[80vw] grid-cols-1 overflow-hidden rounded-md border border-black bg-[#A5A5A5] bg-opacity-75 sm:grid-cols-2 md:grid-cols-3 lg:max-w-[60vw] xl:max-w-[35vw]">
                {items &&
                    items.map((item) => (
                        <div
                            key={item._id}
                            className="relative rounded-tl-md border-b border-black sm:border-r"
                        >
                            <Image
                                src={item.image}
                                alt="Product"
                                className="h-full w-full object-cover"
                                width={1300}
                                height={1300}
                                priority
                            />
                            <div
                                className="absolute inset-0 cursor-pointer rounded-tl-md bg-cover bg-center opacity-0 transition-opacity duration-300 hover:opacity-100"
                                style={
                                    item.bgimage
                                        ? {
                                              backgroundImage: `url(${item.bgimage})`,
                                          }
                                        : {}
                                }
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-around rounded-tl-md bg-[rgba(140,140,140,0.75)]">
                                    <p className="text-stroke font-notojp text-sm text-white text-shadow-xl md:text-2xl xl:text-xl">
                                        {item.name} - {item.price + "$"}
                                    </p>
                                    <CartButton item={item} />
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
        </div>
    )
}
