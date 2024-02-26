import Link from 'next/link'
import { ReactNode } from 'react'
import styles from './Button.module.css'

interface Props {
  href?: string
  children: ReactNode
  btn: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger'
  isLink?: boolean
}
const Button: React.FC<Props> = ({ href, isLink, btn, children, ...props }) => {
  const typeBtn =
    btn === 'primary'
      ? styles.btnPrimary
      : btn === 'secondary'
      ? styles.btnSecondary
      : btn === 'tertiary'
      ? styles.btnTertiary
      : btn === 'danger'
      ? styles.btnDanger
      : styles.btnSuccess
  return isLink && href ? (
    <Link href={href} className={typeBtn} {...props}>
      {children}
    </Link>
  ) : (
    <button className={typeBtn} {...props} type='submit'>
      {children}
    </button>
  )
}
export default Button
