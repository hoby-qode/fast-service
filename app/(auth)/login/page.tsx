'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import FormLogin from './component/FormLogin'
import { useRouter } from 'next/navigation'
import useAuth from '@/src/hooks/useAuth'
import Image from 'next/image'
import headerPage from '@/public/images/headerpage/headerpage.jpg'
import { AiOutlineArrowRight } from 'react-icons/ai'

const Login = () => {
  return (
    <FormLogin />
  )
}

export default Login
