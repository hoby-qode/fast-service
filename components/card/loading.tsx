import React from 'react'

import styles from './Card.module.css'
import Image from 'next/image'
import AddCart from '@/components/addCart'
import Link from 'next/link'
import placeholder from '@/public/images/placeholder.jpg'

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardRating}>00%</div>
      <div className={styles.cardInfo}>
        <h3>loading...</h3>
        <p className={styles.cardInfo_date}>loading...</p>
        <div className={styles.addCart}>
          <AddCart id="{id}" />
        </div>
      </div>
      <div className={styles.cardPicture}>
        <Link href="#" passHref>
          <Image
            src={placeholder}
            alt="loading..."
            fill={true}
            style={{ objectFit: 'cover' }}
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </Link>
      </div>
    </div>
  )
}

export default Card
