import axiosAPI from './app/lib/axios'
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

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
            const response = await axiosAPI.get('/api/refresh');
            if(response.status === 200){
                console.log('Got new access token')
                return NextResponse.next()
            } else {
                console.log('Could not get a new accessToken from our api')
            }
        } catch(error: unknown){
            if(axios.isAxiosError(error)){
                console.log(error.response?.data?.message || 'Unkown Axios Error')
            } else if(error instanceof Error){
                console.log('Unkown Error of type Error', error)
            } else {
                console.log('Unknown Error and type')
            }
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/createpost', '/users/:id*', '/edit']
}
