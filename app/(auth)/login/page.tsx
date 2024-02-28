'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import FormLogin from './component/FormLogin'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter()

  if(session?.user) {
    router.push("/");
  }
  
  return (
    <FormLogin />
  )
}

export default Login
