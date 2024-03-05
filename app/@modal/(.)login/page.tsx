'use client'
import FormLogin from '@/app/(auth)/login/component/FormLogin'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const LoginModal = () => {
  const { data: session } = useSession();
  const router = useRouter()

  if(session?.user) {
    router.push("/");
  }
  
  return (
    <FormLogin />
  )
}

export default LoginModal
