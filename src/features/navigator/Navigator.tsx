'use client'
import React, { useMemo } from 'react'

import MenuBottom from '@/components/menuBottom'
import styles from './Navigator.module.css'
const Navigator = () => {
  const menuLists = useMemo(
    () => [
      {
        name: 'Accueil',
        permalink: '/',
        picto: '/images/picto/home.svg',
        pictoHover: '/images/picto/home-actif.svg',
      },
      {
        name: 'Films',
        permalink: '/produits/categorie/films',
        picto: '/images/picto/films.svg',
        pictoHover: '/images/picto/films-actif.svg',
      },
      {
        name: 'Séries',
        permalink: '/produits/categorie/series',
        picto: '/images/picto/series.svg',
        pictoHover: '/images/picto/series-actif.svg',
      },
      {
        name: 'Animes',
        permalink: '/produits/categorie/animes',
        picto: '/images/picto/animes.svg',
        pictoHover: '/images/picto/animes-actif.svg',
      },
      {
        name: 'Plus',
        permalink: '/menu',
        picto: '/images/picto/plus.svg',
        pictoHover: '/images/picto/plus-actif.svg',
      },
    ],
    [],
  )
  return (
    <header className={styles.header}>
      <div className="container-md">
        <MenuBottom menuLists={menuLists} />
      </div>
    </header>
  )
}

export default Navigator
