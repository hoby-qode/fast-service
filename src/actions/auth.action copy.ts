"use server"
import { revalidatePath } from "next/cache"
import {cookies} from 'next/headers'
import { exit } from "process"

export async function LoginAuthAction(csrfToken: string,formData: FormData) {
    console.log('Logging in user...')
    
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
                    username: "${formData.get('username')}",
                    password: "${formData.get('password')}"
                    }){
                        authToken
                        refreshToken
                    }
                }
                `,
            }),
            },
        )

        const { data } = await response.json()
            
        if (!response.ok) {
            // La requête a retourné un code d'erreur (par exemple, 404, 500)
            console.error('Erreur de requête:', response.status, response.statusText);
        } else {
            const {authToken, refreshToken} = data.login;
            // La requête a réussi
            cookies().set('authToken', authToken,{httpOnly: true, secure: true, path: '/'})
            console.log('Requête réussie !');
        }
        // localStorage.setItem('refreshToken', refreshToken)
    } catch (error) {
        console.error('An error occurred:', error)
    }
}