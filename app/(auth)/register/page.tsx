'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import FormRegister from './component/FormRegister'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter()

  if(session?.user) {
    router.push("/");
  }
  return (
    <FormRegister />
  )
}

export default Login
