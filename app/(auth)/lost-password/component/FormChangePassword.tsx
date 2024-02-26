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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="passwordInput" style={{color: "#fff"}}>Mot de passe*</label>
          <input type="text" id="passwordInput" {...register("password", { required: true, maxLength: 20 })} />
          {errors.password && <span>Le mot de passe est obligatoire</span>}
        </div>

        <Button type="submit" btn="secondary" disabled={!loading}>
          {!loading ? 'Loading...' : 'Rechercher'}
        </Button>
        
      </form>
    </>
  )
}

export default FormLostPassword
