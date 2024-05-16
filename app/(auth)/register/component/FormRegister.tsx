'use client'

import Button from '@/components/button'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  username: string
  email: string
  password: string
}
const FormSignin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const router = useRouter()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation registerUser {
                registerUser(input: {
                  username: "${data.username}",
                  password: "${data.password}"
                  email: "${data.email}"
                }) {
                  clientMutationId
                  user {
                    username
                  }
                }
              }
            `,
          }),
        },
      )

      const res = await response.json()

      if (res.errors) {
        console.log("Il y a une erreur", res.errors.message);
        return;
      }
      const loginResponse = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
        callbackUrl: "/",
      });

      if (!loginResponse?.error) {
        router.push("/");
      } else {
        console.log("invalid email or password");
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="usernameInput" style={{color: "#fff"}}>Nom d&apos;utilisateur*</label>
          <input type="text" id="usernameInput" {...register("username", { required: true, maxLength: 20 })} />
          {errors.username && <span>Le nom d&apos;utilisateur est obligatoire</span>}
        </div>
        <div className="input-group">
          <label htmlFor="emailInput" style={{color: "#fff"}}>Email</label>
          <input type="text" id="emailInput" {...register("email", { required: true, maxLength: 20 })} />
          {errors.email && <span>L&apos;email est obligatoire</span>}
        </div>
        <div className="input-group">
          <label htmlFor="passwordInput" style={{color: "#fff"}}>Password*</label>
          <input type="password" id="passwordInput" {...register("password", { required: true })}  />
          {errors.password && <span>Le mot de passe est obligatoire</span>}
        </div>

        <Button type="submit" btn="primary" >
          S&apos;inscrire
        </Button>
        <p className="text-center mt-4" style={{color: '#fff'}}>
          <Link
            href="/login"
            style={{ textDecoration: 'underline' }}
            target="_parent"
          >
            Je suis déjà un client
          </Link>
        </p>
      </form>
    </>
  )
}

export default FormSignin
