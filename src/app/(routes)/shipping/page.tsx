"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store/store"
import axiosAPI from "@/app/lib/axios"
import { toast } from "sonner"

type ShippingFormData = {
    shippingFirstName: string
    shippingLastName: string
    shippingEmail: string
    shippingAddressOne: string
    shippingAddressAdditional?: string
    shippingCity: string
    shippingState: string
    shippingZIP: number
}

export default function Shipping() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingFormData>()

    const items = useSelector((state: RootState) => state.cart.items)
    const itemSeparation = items.map((item) => ({
        itemId: item._id,
        name: item.name,
        price: item.price,
        amount: item.amount,
    }))

    const onSubmit = async (data: ShippingFormData) => {
        try {
            const response = await axiosAPI.post("/api/comparison", {
                itemSeparation,
            })
            if (response.status === 200) {
                const orderResponse = await axiosAPI.post("/api/orders", {
                    items: itemSeparation,
                    shipping: data,
                })

                if (orderResponse.status !== 200)
                    toast.error("Error Occurred While Preparing Order", {
                        id: "address",
                    })

                const orderId = orderResponse.data.id

                const stripeResponse = await axiosAPI.post("/api/checkout", {
                    itemSeparation,
                    orderId,
                })
                if (stripeResponse.status === 200) {
                    toast.success("Redirecting to Payment", {
                        id: "address",
                    })
                    window.location.href = stripeResponse.data.url
                } else {
                    toast.error("Error Occurred While Redirecting To Payment", {
                        id: "address",
                    })
                }
            } else {
                toast.error("Error Occured While Checking Warehouse Stock", {
                    id: "address",
                })
            }
        } catch (error) {
            handleErrorWithAxios(error)
        }
    }

    return (
        <div className="flex h-auto w-full flex-col items-center p-4">
            <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
                Shipping Information
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col items-center gap-4 rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] p-4 sm:w-[50%]"
            >
                <label htmlFor="shippingFirstName" className="sr-only">
                    Firstname
                </label>
                <input
                    className="placeholder:text-stroke text-stroke w-[90%] rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg placeholder:text-white placeholder:text-shadow-xl"
                    type="text"
                    id="shippingFirstName"
                    aria-required="true"
                    placeholder="Firstname"
                    autoComplete="off"
                    {...register("shippingFirstName", {
                        required: "Firstname is Required",
                        minLength: {
                            value: 2,
                            message:
                                "Firstname needs to be atleast 2 characters",
                        },
                        maxLength: {
                            value: 30,
                            message: "Firstname cannot exceed 30 characters",
                        },
                        pattern: {
                            value: /^[a-zA-ZåäöÅÄÖ0-9]{2,30}$/,
                            message:
                                "Firstname: Min 2, Max 30 Characters. Only a-ö and 0-9 allowed",
                        },
                    })}
                />
                {errors.shippingFirstName && (
                    <span className="text-stroke font-semibold italic text-red-600 drop-shadow-xl">
                        {errors.shippingFirstName.message}
                    </span>
                )}

                <label htmlFor="shippingLastName" className="sr-only">
                    Lastname
                </label>
                <input
                    className="placeholder:text-stroke text-stroke w-[90%] rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg placeholder:text-white placeholder:text-shadow-xl"
                    type="text"
                    id="shippingLastName"
                    placeholder="Lastname"
                    autoComplete="off"
                    aria-required="true"
                    {...register("shippingLastName", {
                        required: "Lastname is required",
                        minLength: {
                            value: 2,
                            message:
                                "Lastname needs to be atleast 2 characters",
                        },
                        maxLength: {
                            value: 30,
                            message: "Lastname cannot exceed 30 characters",
                        },
                        pattern: {
                            value: /^[a-zA-ZåäöÅÄÖ0-9]{2,30}$/,
                            message:
                                "Lastname: Min 2, Max 30 Characters. Only a-ö and 0-9 allowed",
                        },
                    })}
                />
                {errors.shippingLastName && (
                    <span className="text-stroke font-semibold italic text-red-600 drop-shadow-xl">
                        {errors.shippingLastName.message}
                    </span>
                )}

                <label htmlFor="shippingEmail" className="sr-only">
                    Email
                </label>
                <input
                    className="placeholder:text-stroke text-stroke w-[90%] rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg placeholder:text-white placeholder:text-shadow-xl"
                    type="email"
                    id="shippingEmail"
                    autoComplete="off"
                    aria-required="true"
                    placeholder="Email"
                    {...register("shippingEmail", {
                        required: "Email is required",
                        minLength: {
                            value: 10,
                            message: "Email needs to be atleast 10 characters",
                        },
                        maxLength: {
                            value: 50,
                            message: "Email cannot exceed 40 characters",
                        },
                        pattern: {
                            value: /^[a-zA-ZåäöÅÄÖ0-9!_-]+@[a-zA-ZåäöÅÄÖ0-9_-]+\.[a-zA-Z0-9]{2,10}$/,
                            message:
                                "Email: Min 2, Max 50 Characters. Only a-ö, 0-9 and !_- allowed between @ and TLD min 2 characters",
                        },
                    })}
                />
                {errors.shippingEmail && (
                    <span className="text-stroke font-semibold italic text-red-600 drop-shadow-xl">
                        {errors.shippingEmail.message}
                    </span>
                )}

                <label htmlFor="shippingAddressOne" className="sr-only">
                    Street Address
                </label>
                <input
                    className="placeholder:text-stroke text-stroke w-[90%] rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg placeholder:text-white placeholder:text-shadow-xl"
                    type="text"
                    id="shippingAddressOne"
                    placeholder="Street Address"
                    autoComplete="off"
                    aria-required="true"
                    {...register("shippingAddressOne", {
                        required: "Street address is required",
                        minLength: {
                            value: 10,
                            message:
                                "Street address needs to be atleast 8 characters",
                        },
                        maxLength: {
                            value: 35,
                            message:
                                "Street address cannot exceed 35 characters",
                        },
                        pattern: {
                            value: /^[a-zA-ZåäöÅÄÖ0-9\s,.-]{10,35}$/,
                            message:
                                "Street Address: Min 2, Max 35 Characters. Only a-ö, 0-9 and (space),.-",
                        },
                    })}
                />
                {errors.shippingAddressOne && (
                    <span className="text-stroke font-semibold italic text-red-600 drop-shadow-xl">
                        {errors.shippingAddressOne.message}
                    </span>
                )}

                <label htmlFor="shippingAddressAdditional" className="sr-only">
                    Additional Address Information Optional
                </label>
                <input
                    className="placeholder:text-stroke text-stroke w-[90%] rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg placeholder:text-white placeholder:text-shadow-xl"
                    type="text"
                    id="shippingAddressAdditional"
                    placeholder="Apartment/ Suite/ Floor (Optional)"
                    autoComplete="off"
                    aria-required="true"
                    {...register("shippingAddressAdditional", {
                        minLength: {
                            value: 2,
                            message:
                                "Additional Address needs to be atleast 2 characters",
                        },
                        maxLength: {
                            value: 10,
                            message:
                                "Additional Address cannot exceed 10 characters",
                        },
                        pattern: {
                            value: /^[a-zA-ZåäöÅÄÖ0-9\s,.-]{2,10}$/,
                            message:
                                "Street Address Additional: Min 2, Max 10 Characters. Only a-ö, 0-9 and (space),.-",
                        },
                    })}
                />
                {errors.shippingAddressAdditional && (
                    <span className="text-stroke font-semibold italic text-red-600 drop-shadow-xl">
                        {errors.shippingAddressAdditional.message}
                    </span>
                )}

                <label htmlFor="shippingCity" className="sr-only">
                    City
                </label>
                <input
                    className="placeholder:text-stroke text-stroke w-[90%] rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg placeholder:text-white placeholder:text-shadow-xl"
                    type="text"
                    id="shippingCity"
                    placeholder="City"
                    autoComplete="off"
                    aria-required="true"
                    {...register("shippingCity", {
                        required: "City is required",
                        minLength: {
                            value: 2,
                            message: "City needs to be atleast 2 characters",
                        },
                        maxLength: {
                            value: 25,
                            message: "City cannot exceed 25 characters",
                        },
                        pattern: {
                            value: /^[a-zA-ZåäöÅÄÖ\s]{2,25}$/,
                            message:
                                "City: Min 2, Max 25 Characters. Only a-ö and (space) allowed",
                        },
                    })}
                />
                {errors.shippingCity && (
                    <span className="text-stroke font-semibold italic text-red-600 drop-shadow-xl">
                        {errors.shippingCity.message}
                    </span>
                )}

                <label htmlFor="shippingState" className="sr-only">
                    State/Province/Region
                </label>
                <input
                    className="placeholder:text-stroke text-stroke w-[90%] rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg placeholder:text-white placeholder:text-shadow-xl"
                    type="text"
                    id="shippingState"
                    placeholder="State/ Province/ Region"
                    autoComplete="off"
                    aria-required="true"
                    {...register("shippingState", {
                        required: "State/Province/Region is required",
                        minLength: {
                            value: 2,
                            message:
                                "State/Province/Region needs to be atleast 2 characters",
                        },
                        maxLength: {
                            value: 25,
                            message:
                                "State/Province/Region cannot exceed 25 characters",
                        },
                        pattern: {
                            value: /^[a-zA-ZåäöÅÄÖ\s]{2,25}$/,
                            message:
                                "State: Min 2, Max 25 Characters. Only a-ö and (space) allowed",
                        },
                    })}
                />
                {errors.shippingState && (
                    <span className="text-stroke font-semibold italic text-red-600 drop-shadow-xl">
                        {errors.shippingState.message}
                    </span>
                )}

                <label htmlFor="shippingZIP" className="sr-only">
                    ZIP Code
                </label>
                <input
                    className="placeholder:text-stroke text-stroke w-[90%] rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg placeholder:text-white placeholder:text-shadow-xl"
                    type="text"
                    id="shippingZIP"
                    placeholder="ZIP Code"
                    autoComplete="off"
                    aria-required="true"
                    {...register("shippingZIP", {
                        required: "ZIP Code is required",
                        minLength: {
                            value: 5,
                            message:
                                "Zip Code needs to be atleast 5 characters",
                        },
                        maxLength: {
                            value: 5,
                            message: "Zip Code cannot exceed 5 characters",
                        },
                        pattern: {
                            value: /^\d{5}$/,
                            message:
                                "ZIP Code: Needs to be 5 characters and only numbers 0-9",
                        },
                    })}
                />
                <div className="flex w-[90%] justify-end">
                    <button
                        type="submit"
                        className="text-stroke flex w-auto transform justify-center rounded-md border border-black bg-[#E19B1A] px-4 py-2 text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95"
                    >
                        Stripe Checkout
                    </button>
                </div>
            </form>
        </div>
    )
}
