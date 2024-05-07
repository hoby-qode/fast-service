import React, { FC, forwardRef } from 'react'
import styles from './BtnIcon.module.css'

interface BtnIconProps {
  icon: any
  isBtnSubmit: boolean
  style: 'rounded' | 'cube'
  bgColor: string
  color: string
  // Vous n'avez pas besoin d'inclure 'props' ici
}

const BtnIcon: FC<BtnIconProps> = forwardRef<HTMLButtonElement, BtnIconProps>(({
  icon,
  isBtnSubmit,
  bgColor,
  color,
  style,
  ...props
}, ref) => {
  return isBtnSubmit ? (
    <button
      type="submit"
      className={`
      ${styles['btnIcon']}
      ${styles['bg' + bgColor]} 
      ${styles['color' + color]} 
      ${styles['radius' + style]}
      `}
      ref={ref} // Transférer la référence au bouton
      {...props}
    >
      {icon}
    </button>
  ) : (
    <button
      className={`
      ${styles['btnIcon']}
      ${styles['bg' + bgColor]} 
      ${styles['color' + color]} 
      ${styles['radius' + style]}
      `}
      ref={ref} // Transférer la référence au bouton
      {...props}
    >
      {icon}
    </button>
  )
})

export default BtnIcon
