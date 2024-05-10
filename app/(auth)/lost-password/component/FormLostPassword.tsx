'use client'

import Button from '@/components/button'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  username: string
  email: string
}
const FormLostPassword = () => {
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
      email: data.email,
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
        On va recherche ton identité dans notre base de donnée afin de vous donner une nouvelle mot de passe.</p>
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

        <Button type="submit" btn="secondary" disabled={!loading}>
          {!loading ? 'Loading...' : 'Rechercher'}
        </Button>
        
      </form>
    </>
  )
}

export default FormLostPassword
