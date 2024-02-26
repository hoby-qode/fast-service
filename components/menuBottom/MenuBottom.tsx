'use client'
import React, { FC } from 'react'
import { MenuItemType } from '@/src/types/global'
import styles from './MenuBottom.module.css'
import { usePathname } from 'next/navigation'
import MenuItem from '@/components/menuItem'

interface MenuProps {
  menuLists: MenuItemType[]
}
const MenuBottom: FC<MenuProps> = ({ menuLists }) => {
  const pathName = usePathname()
  function checkActiveLink(pathName: string, permalink: string) {
    return pathName === permalink
  }
  return (
    <nav role="pagination" className={styles.menuBottom}>
      <ul>
        {menuLists.map((menuItem: MenuItemType, key: number) => (
          <li key={key}>
            <MenuItem
              menu={menuItem}
              isActive={
                checkActiveLink(pathName, menuItem.permalink) ||
                menuItem.name === 'Plus'
              }
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MenuBottom
