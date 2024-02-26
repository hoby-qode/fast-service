'use client'
import React, { FC, Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import AddCart from '@/components/addCart'
import Rating from '@/components/rating'
import placeholder from '@/public/images/placeholder.jpg'
import Loading from './loading'

import styles from './Card.module.css'
import { useShoppingCart } from '@/src/store/useCartStore'
interface CardProps {
  id: number
  title: string
  date: String
  slug: string
  featuredImage: string
  rating: number
}
const Card: FC<CardProps> = ({
  id,
  title,
  date,
  slug,
  featuredImage,
  rating,
}) => {
  const { items, addItem, removeItem } = useShoppingCart();
  const cart = {id, title}
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.matchMedia('screen and (max-width:768px)').matches)
    }
  }, [isMobile])
  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.card}>
        <div className={styles.cardRating}>
          <Rating number={rating} />
        </div>
        <div className={styles.cardInfo}>
          <h3>
            <Link href={`/produit/${slug}`}>{title}</Link>
          </h3>
          <p className={styles.cardInfo_date}>{date}</p>
          <div className={styles.addCart}>
            <AddCart 
              item={cart}
              isInCart={items.some((i) => i.id === id)}
              onAdd={() => addItem(cart)}
              onRemove={() => removeItem(id)} />
          </div>
        </div>
        <div className={styles.cardPicture}>
          <Link
            href={`/produit/${slug}`}
            passHref
            className="d-flex h-100 w-100 position-relative"
            target={isMobile ? '_parent' : '_self'}
          >
            <Image
              src={featuredImage ? featuredImage : placeholder}
              alt={title}
              fill={true}
              style={{ objectFit: 'cover' }}
              sizes="(max-width:768px) 100vw, 33vw"
            />
          </Link>
        </div>
      </div>
    </Suspense>
  )
}

export default Card
