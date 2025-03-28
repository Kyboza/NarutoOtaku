"use client"
import React from "react"
import Link from "next/link"
import { useState } from "react"
import axiosAPI from "@/app/lib/axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Register() {
    const router = useRouter()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/
    const usernameRegex = /^[a-zA-Z0-9._%+-]{5,30}$/
    const passwordRegex = /^[a-zA-Z0-9._%+!-]{15,}$/

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email.trim() || !username.trim() || !password.trim()) {
            toast.error("Please fill in all fields", {
                id: "register",
            })
            return
        }

        if (
            !emailRegex.test(email) ||
            !usernameRegex.test(username) ||
            !passwordRegex.test(password)
        ) {
            toast.error("Please Do Not Include Non-Allowed Characters", {
                id: "register",
            })
            return
        }

        try {
            const data = { email, username, password }
            const response = await axiosAPI.post("/api/register", data)

            if (response.status === 200) {
                toast.success("Successfully Registered Account", {
                    id: "register",
                })
                setEmail("")
                setUsername("")
                setPassword("")

                router.push("/")
            } else {
                toast.error("Error Occurred While Registering User", {
                    id: "register",
                })
            }
        } catch (error) {
            handleErrorWithAxios(error)
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-stroke-2 mb-4 mt-4 font-rock text-2xl text-white text-shadow-xl md:text-4xl lg:text-5xl">
                Register
            </h1>
            <form
                onSubmit={(e) => registerUser(e)}
                className="mb-2 flex h-auto min-h-[30vh] w-full flex-col items-center gap-4 rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%] p-8 sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"
            >
                <label htmlFor="registerEmail" className="sr-only">
                    Register Email
                </label>
                <input
                    className="w-[95%] rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl"
                    type="email"
                    id="registerEmail"
                    name="registerEmail"
                    required
                    placeholder="Enter Email"
                    minLength={10}
                    maxLength={30}
                    autoComplete="off"
                    spellCheck={false}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="registerName" className="sr-only">
                    Register Username
                </label>
                <input
                    className="w-[95%] rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl"
                    type="text"
                    id="registerName"
                    name="registerName"
                    required
                    placeholder="Enter Username"
                    minLength={5}
                    maxLength={30}
                    autoComplete="off"
                    spellCheck={false}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="registerPassword" className="sr-only">
                    Register Password
                </label>
                <input
                    className="w-[95%] rounded-md border border-black bg-gray-400/20 p-2 text-sm text-white outline-none text-shadow-xl placeholder:font-notojp placeholder:text-white sm:p-3 sm:text-base md:text-lg lg:text-xl"
                    type="password"
                    id="registerPassword"
                    name="registerPassword"
                    required
                    placeholder="Enter Password"
                    minLength={15}
                    autoComplete="off"
                    spellCheck={false}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex w-full flex-col items-center gap-1">
                    <Link href="/reset">
                        <p className="font-notojp text-xs text-white text-shadow-xl sm:text-sm">
                            Forgot Password?
                        </p>
                    </Link>
                    <Link href="/register">
                        <p className="font-notojp text-xs text-white text-shadow-xl sm:text-sm">
                            Already Got An Account?
                        </p>
                    </Link>
                </div>
                <div className="flex h-auto w-full flex-row justify-end">
                    <button
                        type="submit"
                        className="text-stroke w-[40%] transform rounded-md border border-black bg-[#E19B1A] p-2 py-2 font-notojp text-sm text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95 sm:w-[30%] sm:text-base md:text-lg"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}
