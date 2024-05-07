"use client"
import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './HeaderPage.module.css'
import Rating from '@/components/rating'
import AddCart from '@/components/addCart'
import placeholder from '@/public/images/placeholder.jpg'
import { useShoppingCart } from '@/src/store/useShoppingCart'

interface HeaderPageProps {
  picture: string | null
  title: string
  slug: string
  rating: number
  date: string
  tags: Array<{
    slug: string
    name: string
  }>
  categories: Array<{
    slug: string
  }>
  id: string
}
const HeaderPage: FC<HeaderPageProps> = ({
  picture,
  title,
  slug,
  rating,
  date,
  categories,
  tags,
  id,
}) => {
  const { items, addItem, removeItem } = useShoppingCart();
  const cart = {id, title}
  return (
    <div className={styles.headerPage}>
      <div className={`container ${styles.headerPage_container}`}>
        <Link
          href={`/produit/${slug}`}
          className="position-relative d-flex h-100"
        >
          <Image
            src={picture ? picture : placeholder}
            alt={title}
            fill={true}
            sizes="(max-width:768px) 100vw, 33vw"
            style={{ objectFit: 'cover', filter: 'saturate(0)' }}
          />
        </Link>
        <div className={styles.headerPage__cardPicture}>
          <Link
            href={`/produit/${slug}`}
            className="position-relative d-flex h-100"
          >
            <Image
              src={picture ? picture : placeholder}
              alt={title}
              fill={true}
              sizes="(max-width:768px) 100vw, 33vw"
              style={{ objectFit: 'cover', filter: 'saturate(0)' }}
            />
          </Link>
        </div>
        <div className={styles.headerPage_content}>
          <h1>
            <Link href={`/produit/${slug}`}>{title}</Link>
          </h1>
          <div className={styles.headerPage__noteUser}>
            <Rating number={rating} />
            <p>
              Note des <br /> Utilisateurs
            </p>
          </div>
          <div className={styles.headerPage__date}>
            Sortie le : {` ${date}`}
          </div>
          <div className={styles.headerPage__cat}>
            {tags.map((tag: { slug: string; name: string }, key: number) => (
              <Link
                href={`/produits/categorie/${categories[0].slug}?genre=${tag.slug}`}
                key={key}
              >
                {tag.name}
                {key + 1 != tags.length ? ', ' : ''}
              </Link>
            ))}
          </div>
          <div className={styles.headerPage__cart}>
            <span>
              Ajouter <br />
              au panier
            </span>
            <AddCart 
              item={cart}
              isInCart={items.some((i) => i.id === id)}
              onAdd={() => addItem(cart)}
              onRemove={() => removeItem(id)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderPage
