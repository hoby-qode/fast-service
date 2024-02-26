"use server"

import { cookies } from "next/headers"

export default async function Authentification() {
    cookies().set('andrana', 'andrana')
    return "Authentification"
}