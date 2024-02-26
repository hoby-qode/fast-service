import React, { FC } from 'react'
import Link from 'next/link'

import styles from './LinkIcon.module.css'

/* TODO: changement du type 'any' sur icon */
interface LinkIconProps {
  href: string
  icon: any
  style: 'rounded' | 'cube'
  bgColor: string
  color: string
  nbNotification?: number | undefined
}
const LinkIcon: FC<LinkIconProps> = (props) => {
  const nbNotification =
    props.nbNotification && props.nbNotification != 0
      ? props.nbNotification
      : null
  return (
    <Link
      href={props.href}
      className={`
      ${styles['btnIcon']}
      ${styles['bg' + props.bgColor]} 
      ${styles['color' + props.color]} 
      ${styles['radius' + props.style]}
      `}
    >
      {props.icon}
      {nbNotification != null && (
        <span className={styles.notifaction}>{props.nbNotification}</span>
      )}
    </Link>
  )
}

export default LinkIcon
