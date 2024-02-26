'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './CardInline.module.css'
import placeholder from '@/public/images/placeholder.jpg'

const Loading = () => {
  return (
    <div className={styles.cardInline}>
      <div className={styles.cardInline_picture}>
        <Link href="#" passHref>
          <Image
            src={placeholder}
            alt="placeholder"
            fill={true}
            style={{ objectFit: 'cover' }}
            sizes="(max-width:768px) 100vw, 33vw"
            quality={10}
          />
        </Link>
        <div className={styles.cardInline_bgpicture}></div>
      </div>
      <div className={styles.cardInline_content}>
        <h3 className={styles.cardInline__title}>loading...</h3>
        <p className={styles.cardInlne__date}>loading...</p>
        <div className={styles.cardInline__stars}>loading...</div>
      </div>
    </div>
  )
}

export default Loading
