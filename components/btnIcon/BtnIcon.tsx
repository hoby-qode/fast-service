import React, { FC } from 'react'
import styles from './BtnIcon.module.css'

/* TODO: changement du type 'any' sur icon */
interface BtnIconProps {
  icon: any
  isBtnSubmit: boolean
  style: 'rounded' | 'cube'
  bgColor: string
  color: string
  props: any
}
const BtnIcon: FC<BtnIconProps> = ({
  icon,
  isBtnSubmit,
  bgColor,
  color,
  style,
  ...props
}) => {
  return isBtnSubmit ? (
    <button
      type="submit"
      className={`
      ${styles['btnIcon']}
      ${styles['bg' + bgColor]} 
      ${styles['color' + color]} 
      ${styles['radius' + style]}
      `}
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
      {...props}
    >
      {icon}
    </button>
  )
}

export default BtnIcon
