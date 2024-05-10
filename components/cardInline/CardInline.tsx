'use client'
import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './CardInline.module.css'
import Stars from '../stars'
import placeholder from '@/public/images/placeholder.jpg'

interface CardInlineProps {
  idkey?: number | undefined
  featuredImage: string
  title: string
  date: string
  slug: string
  rating: number
  saisons?: number[]
}
const CardInline: FC<CardInlineProps> = ({
  idkey,
  featuredImage,
  title,
  date,
  slug,
  rating,
  saisons
}) => {
  const totalCountByRating = (rating * 5) / 100
  return (
    <div className={styles.cardInline}>
      {typeof idkey != 'undefined' ? (
        <div className={styles.cardInline_key}>{idkey + 1}</div>
      ) : (
        ''
      )}
      <div className={styles.cardInline_picture}>
        <Link href={`/produit/${slug}`} passHref>
          <Image
            src={featuredImage ? featuredImage : placeholder}
            alt={title}
            fill={true}
            style={{ objectFit: 'cover' }}
            sizes="(max-width:768px) 100vw, 33vw"
            quality={10}
          />
        </Link>
        <div className={styles.cardInline_bgpicture}></div>
      </div>
      <div className={styles.cardInline_content}>
        <h3 className={styles.cardInline__title}>
          <Link href={`/produit/${slug}`} passHref>
            {title}
          </Link>
        </h3>
        <p className={styles.cardInlne__date}>{date}</p>
        {
          saisons && <p>
            <div className={styles.cardInline__serie}>Saisons : {saisons.sort((a,b) => a - b ).join(', ')}</div>
          </p>
        }
        <div className={styles.cardInline__stars}>
          <Stars count={totalCountByRating} />
        </div>
      </div>
    </div>
  )
}

export default CardInline
