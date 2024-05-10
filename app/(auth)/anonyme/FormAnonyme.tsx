'use client'

import Button from '@/components/button'
import { signIn } from 'next-auth/react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Inputs = {
  username: string
  password: string
}
const FormAnonyme = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/login";
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const domains = ['yopmail.fr', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'mail.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  
    const usernameLength = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Génère une longueur aléatoire entre 5 et 10 caractères
    let username = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < usernameLength; i++) {
      username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
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
                  password: "${username}"
                  email: "${username + '@' + randomDomain}"
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
        setError('Le pseudo que vous avez choisi est déjà utilisé. Veuillez en sélectionner un nouveau.');
        return;
      }
      const loginResponse = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: username,
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
      <Dialog>
        <DialogTrigger asChild>
          <span variant="outline" className='flex items-center'>Continuer en anonyme <AiOutlineArrowRight style={{marginLeft:'5px'}} /></span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <p style={{    color: "rgb(255, 255, 255)",
              fontSize: "1.4rem",
              fontWeight: "400",
              fontFamily: "var(--raleway)",
              lineHeight: "120%",
              marginBottom: "20px"}}>
              Entrez un pseudo pour ton commande. Il sera effacé après validation pour protéger ton anonymat.
              </p>
              <span style={{color:"#fff", fontSize: '1rem',  fontWeight: "100",lineHeight: "120%"}}>Pour profiter de nos promotions et suivre vos achats, inscrivez-vous ou connectez-vous. Merci ! </span>
            </DialogTitle>
            {error && <p style={{color: 'hsl(var(--destructive))'}}>{error}</p>}
          </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group">
                <label htmlFor="usernameInput" style={{color: "#fff"}}>Pseudo</label>
                <input type="text" id="usernameInput" {...register("username", { required: true, maxLength: 20 })} className='bg-secondary' placeholder="ton pseudo" />
                {errors.username && <span>Le pseudo est obligatoire</span>}
              </div>
              <Button type="submit" btn="primary" disabled={!loading}>
                {!loading ? 'Loading...' : 'Se connecter'}
              </Button>
            </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FormAnonyme
