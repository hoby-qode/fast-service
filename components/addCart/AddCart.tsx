'use client'

import useAuth from '@/src/hooks/useAuth'
import styles from './AddCart.module.css'
import useCart from '@/src/hooks/useCart'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FC } from 'react'

interface CartItem {
  id: number,
  title: string,
}
interface AddCartProps {
  item?: CartItem,
  isInCart?: boolean | undefined,
  onAdd?: () => void,
  onRemove?: () => void
}
const AddCart:FC<AddCartProps> = ({ item, isInCart, onAdd, onRemove }) => {
  return (
    <button
      className={`${styles.addCart} ${isInCart && styles.active}`}
      onClick={!isInCart ? onAdd :  onRemove}
    >
      <span>+</span>
    </button>
  )
}

export default AddCart
