import Link from 'next/link'
import React, { useMemo } from 'react'

import styles from './NavigatorDesktop.module.css'
import { MenuItemType } from '@/src/types/global'

const NavigatorDesktop = () => {
  const menuLists = useMemo(
    () => [
      {
        name: 'Accueil',
        permalink: '/',
        picto: '/images/picto/menu-item.png',
      },
      {
        name: 'Films',
        permalink: '/produits/categorie/films',
        picto: '/images/picto/menu-item.png',
      },
      {
        name: 'Séries',
        permalink: '/produits/categorie/series',
        picto: '/images/picto/menu-item.png',
      },
      {
        name: 'Animes',
        permalink: '/produits/categorie/animes',
        picto: '/images/picto/menu-item.png',
      },
      {
        name: 'Mes commandes',
        permalink: '/commande',
        picto: '/images/picto/menu-item.png',
      },
    ],
    [],
  )
  return (
    <ul className={styles.navigatorDesktop}>
      {menuLists.map((menuItem: MenuItemType, key: number) => (
        <li key={key}>
          <Link href={menuItem.permalink} className={styles.navLink}>
            {menuItem.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NavigatorDesktop
