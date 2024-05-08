'use client'
import React, { FC, Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import AddCart from '@/components/addCart'
import Rating from '@/components/rating'
import placeholder from '@/public/images/placeholder.jpg'
import Loading from './loading'

import styles from './Card.module.css'
import { useShoppingCart } from '@/src/store/useShoppingCart'
interface CardProps {
  id: number
  title: string
  category: string
  nbSaison?: number
  date: String
  slug: string
  featuredImage: string
  rating: number
}
const Card: FC<CardProps> = ({
  id,
  title,
  category,
  nbSaison,
  date,
  slug,
  featuredImage,
  rating,
}) => {
  const { items, addItem, removeItem, updateItem } = useShoppingCart();
  const cart = {id, title, category, nbSaison}
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
              onRemove={() => removeItem(id)} 
              onUpdate={() => updateItem(id, [1,2,3,4,5,6])}
              />
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
              sizes="(max-width:768px) 100vw, 20vw"
              quality={5}
            />
          </Link>
        </div>
      </div>
    </Suspense>
  )
}

export default Card
