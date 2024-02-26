import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
    cookies().delete('session')
    redirect('/')
    // let response = NextResponse.next()
    // response.cookies.delete('')
    return NextResponse.next()
}