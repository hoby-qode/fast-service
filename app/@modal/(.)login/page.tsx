'use client'
import FormLogin from '@/app/(auth)/login/component/FormLogin'
import Modal from '@/components/modal'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

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
