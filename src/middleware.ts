
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest){
    const storedCookies = cookies();
    const accessToken = (await storedCookies).get('accessToken')?.value;
    const refreshToken = (await storedCookies).get('refreshToken')?.value;
    if(!accessToken && !refreshToken){
        console.log('Login to revalidate refreshToken')
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if(!accessToken && refreshToken){
        try{
            const response = await fetch('http://localhost:3000/api/refresh', {
                method: 'GET',
                credentials: 'include'
            });

            if(response.ok){
                const data = await response.json()
                const newAccessToken = data.accessToken
                if(newAccessToken){
                    const res = NextResponse.next()
                    res.headers.set(
                        "Set-Cookie",
                        `accessToken=${newAccessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${5 * 60 * 60}`
                    )
                    
                    return response
                }
            } else {
                console.log('Could not get a new accessToken from our api')
            }
        } catch(error: unknown){
            console.log('Error getting a new accessToken occured', error)
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/createpost', '/edit']
}
