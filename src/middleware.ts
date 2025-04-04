import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { baseURL } from "./app/lib/axios"

export async function middleware(req: NextRequest) {
    const storedCookies = cookies()
    const accessToken = (await storedCookies).get("accessToken")?.value
    const refreshToken = (await storedCookies).get("refreshToken")?.value

    const protectedRoutes = [
        "/createpost",
        "/edit",
        "/myposts",
        "/api/forum/submit-reply",
        "/api/forum/submit-post",
        "/api/forum/deletePost",
        "/api/forum/deleteReply",
    ]

    const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname)

    if (!accessToken && !refreshToken) {
        console.log(
            "No tokens found. Calling the API to check for expired sessions...",
        )

        try {
            const response = await fetch(`${baseURL}/api/checkExpired`, {
                method: "GET",
            })

            if (response.ok) {
                console.log("Expired sessions have been reset successfully.")
            } else {
                console.error("Error occurred while checking expired sessions")
            }
        } catch (error) {
            console.error("Error calling the expired sessions API:", error)
        }

        if (isProtectedRoute) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
    }

    if (!accessToken && refreshToken) {
        try {
            const response = await fetch(`${baseURL}/api/refresh`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                const newAccessToken = data.accessToken
                if (newAccessToken) {
                    const res = NextResponse.next()
                    res.headers.set(
                        "Set-Cookie",
                        `accessToken=${newAccessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 15}`,
                    )

                    return res
                }
            } else {
                console.error("Could not get a new accessToken from our API")

                if (isProtectedRoute) {
                    return NextResponse.redirect(new URL("/login", req.url))
                }
            }
        } catch (error) {
            console.error("Error getting a new accessToken occurred", error)

            if (isProtectedRoute) {
                return NextResponse.redirect(new URL("/login", req.url))
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/",
        "/users:path*",
        "/createpost",
        "/edit",
        "/myposts",
        "/api/forum/submit-reply",
        "/api/forum/submit-post",
        "/api/forum/deletePost",
        "/api/forum/deleteReply",
    ],
}
