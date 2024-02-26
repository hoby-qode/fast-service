'use client'
import React, { useEffect, useRef, useState } from 'react'

import styles from './Modal.module.css'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const dialogRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    // @ts-ignore
    if (!showModal) {
      // @ts-ignore
      setShowModal(true)
      setTimeout(() => {
        document.querySelector('body')?.classList.add('overflow-hidden')
        document.querySelector('html')?.classList.add('overflow-hidden')
      }, 100)
    }
  }, [showModal])

  function onDismiss() {
    document.querySelector('body')?.classList.remove('overflow-hidden')
    document.querySelector('html')?.classList.remove('overflow-hidden')
    setShowModal(false)
    router.back()
  }

  return createPortal(
    <div className={styles.modal_backdrop}>
      <div ref={dialogRef} className={styles.modal} onClose={onDismiss}>
        {children}
        <button onClick={onDismiss} className={styles.close_button} />
      </div>
    </div>,
    document.getElementById('modal-root')!,
  )
}

export default Modal
