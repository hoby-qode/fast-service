'use client'
import FormLogin from '@/app/(auth)/login/component/FormLogin'
import Modal from '@/components/modal'
import useAuth from '@/src/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const LoginModal = () => {
  const router = useRouter()
  const { isLogged } = useAuth()
  useEffect(() => {
    if (isLogged) {
      window.location.reload()
    }
  }, [isLogged])
  return (
    <Modal>
      <div className="container">
        <FormLogin />
      </div>
    </Modal>
  )
}

export default LoginModal
