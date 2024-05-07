'use client'
import { FC, useRef, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'

import styles from './HeaderPage.module.css'
import SearchBar from '@/components/search-bar'
import headerPage from '@/public/images/headerpage/headerpage.jpg'

const HeaderPage: FC = () => {
  const card3d = useRef<HTMLDivElement>(null)
  const [angle, setAngle] = useState({
    x: 0,
    y: 0,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    let card3dRect = card3d?.current?.getBoundingClientRect()
    if (!card3dRect) return;
    let x = e.clientX - card3dRect.x
    let y = e.clientY - card3dRect.y

    let midCardWidth = card3dRect.width / 2
    let midCardHeight = card3dRect.height / 2

    let angleY = -(x - midCardWidth) / 8
    let angleX = (y - midCardHeight) / 8
    
    setAngle({
      x: angleX,
      y: angleY,
    })
  }
  const handleMouseLeave = () => {
    setAngle({
      x: 0,
      y: 0,
    })
  }

  return (
    <div className={styles.headerPage}>
      <div className={`container ${styles.headerPage_container}`}>
        <div className={styles.headerPage_content}>
          <h1>Bienvenue,</h1>
          <p>
            Des millions de films, séries, animés, etc... sont disponibles{' '}
            <Link href="#films">
              <u>içi</u>
            </Link>
          </p>
          <SearchBar isResultFloat={true}/>
        </div>
        <div
          className={styles.headerPage_picture_container}
          ref={card3d}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={styles.headerPage_picture}
            style={{
              transform: `rotateX(${angle.x}deg) rotateY(${angle.y}deg)`,
            }}
          >
            <Image
              src={headerPage}
              alt="Headerpage"
              fill={true}
              style={{ objectFit: 'cover', filter: 'saturate(0)' }}
              sizes="(max-width:768px) 100vw, 33vw"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderPage
