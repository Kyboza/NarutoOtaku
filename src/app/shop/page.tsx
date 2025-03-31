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
            <section className="grid-auto-rows-[minmax(200px,_auto)] grid h-auto w-full max-w-[80vw] grid-cols-1 overflow-hidden rounded-md border border-black bg-[#A5A5A5] bg-opacity-75 sm:max-w-[80vw] sm:grid-cols-2 md:grid-cols-3 lg:max-w-[60vw]">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="relative min-h-[200px] min-w-[200px] border-b border-black sm:border-r md:min-h-[300px]"
                    >
                        <div className="absolute inset-0 h-full w-full">
                            <Image
                                src={item.image}
                                alt="Product"
                                className="object-cover"
                                fill
                                sizes="(max-width: 640px) 40vw, (max-width: 768px) 30vw, 25vw"
                                priority={item.image.includes(
                                    "KakashiFunko.webp",
                                )}
                            />
                        </div>

                        <div
                            className="absolute inset-0 cursor-pointer opacity-0 transition-opacity duration-300 hover:opacity-100"
                            style={
                                item.bgimage
                                    ? {
                                          backgroundImage: `url(${item.bgimage})`,
                                          backgroundSize: "cover",
                                          backgroundPosition: "center",
                                      }
                                    : {}
                            }
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-around bg-[rgba(140,140,140,0.75)]">
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
