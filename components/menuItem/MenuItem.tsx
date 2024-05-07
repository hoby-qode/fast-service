import React from 'react'
import { MenuItemType } from '@/src/types/global'
import Link from 'next/link'
import Image from 'next/image'
import styles from './MenuItem.module.css'
const MenuItem = ({
  menu,
  isActive,
}: {
  menu: MenuItemType
  isActive: boolean
}) => {
  return (
    <Link
      href={menu.permalink}
      passHref
      className={`${styles.menuItem} ${isActive && styles.menuItemActive}`}
    >
      <span className={styles.menuItemPicto}>
        <Image
          src={menu.picto}
          alt={menu.name}
          width={50}
          height={30}
          className={styles.menuPicto}
        />
        <Image
          src={menu.pictoHover}
          alt={menu.name}
          width={50}
          height={30}
          sizes="(max-width:768px) 100vw, 33vw"
          className={styles.menuPictoHover}
        />
      </span>
      <span className={styles.menuItemName}>{menu.name}</span>
    </Link>
  )
}

export default MenuItem
