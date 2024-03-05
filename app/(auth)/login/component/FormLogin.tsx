'use client'

import Button from '@/components/button'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  username: string
  password: string
}
const FormLogin = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/login";
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
      callbackUrl,
    });
    if (!res?.error) {
      router.push(callbackUrl);
    } else {
      console.log("invalid email or password");
    }
  }

  return (
    <>
      <p style={{    color: "rgb(255, 255, 255)",
        fontSize: "1.6rem",
        fontWeight: "500",
        fontFamily: "var(--raleway)",
        lineHeight: "120%"}}>
        Rejoignez-nous dès maintenant et profitez de notre promotion en vous inscrivant sur notre application.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="usernameInput" style={{color: "#fff"}}>Nom d&apos;utilisateur*</label>
          <input type="text" id="usernameInput" {...register("username", { required: true, maxLength: 20 })} />
          {errors.username && <span>Le nom d&apos;utilisateur est obligatoire</span>}
        </div>
        <div className="input-group">
          <label htmlFor="passwordInput" style={{color: "#fff"}}>Password*</label>
          <input type="password" id="passwordInput" {...register("password", { required: true })}  />
          {errors.password && <span>Le mot de passe est obligatoire</span>}
        </div>

        <Button type="submit" btn="primary" disabled={!loading}>
          {!loading ? 'Loading...' : 'Se connecter'}
        </Button>
        <p className="text-right mt-4 mb-3" style={{color: '#fff'}}>
          <Link href="/lost-password" style={{ textDecoration: 'underline' }}>
            Mot de passe oublié
          </Link>
        </p>

        <p className="text-right" style={{color: '#fff'}}>
          Pas de compte ? &nbsp;
          <Link href="/register" style={{ textDecoration: 'underline' }}>
            Inscrivez-vous dès maintenant
          </Link>
        </p>
      </form>
    </>
  )
}

export default FormLogin
