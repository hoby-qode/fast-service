"use server"
import { setCookie } from "cookies-next"
import { revalidatePath } from "next/cache"
import {cookies} from 'next/headers'
import { exit } from "process"

export async function LoginAuthAction(csrfToken: string,formData: FormData) {
    try {
        const response = await fetch(
        `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
            {
            
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken, 
            },
            body: JSON.stringify({
                query: `
                mutation LoginUser {
                    login( input: {
                    clientMutationId: "uniqueId",
                    username: "houbby22@gmail.com",
                    password: "Vadikotiako22"
                    }){
                        authToken
                        refreshToken
                        user {
                            username
                            email
                        }
                    }
                }
                `,
            }),
            },
        )

        const {data} = await response.json()
            
        if (!response.ok) {
            // La requête a retourné un code d'erreur (par exemple, 404, 500)
            console.error('Erreur de requête:', response.status, response.statusText);
        } else {
            const {authToken, refreshToken, user} = data.login;
            // La requête a réussi
            // cookies().set('session', JSON.stringify({...user, refreshToken}), {
            //     httpOnly: true,
            //     secure: false,
            //     maxAge: 60 * 60 * 24 * 7, // One week
            //     path: '/'
            // })
            setCookie('authToken', JSON.stringify({...user, authToken}, {
                httpOnly: true,
                secure: false,
                maxAge: 60 * 60 * 24 * 7, // One week
                path: '/'
            }));
            return data.login
        }
        // localStorage.setItem('refreshToken', refreshToken)
    } catch (error) {
        console.error('An error occurred:', error)
    }
}