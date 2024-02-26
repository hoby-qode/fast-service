import React, { FC } from 'react'

import styles from './CategoryFilter.module.css'
import Button from '@/components/button'
import { useRouter } from 'next/navigation'

interface CategoryFilterProps {
  title: string
  categories: Array<{
    name: string
    href: string
    slug: string
  }>
}
const CategoryFilter: FC<CategoryFilterProps> = ({ title, categories }) => {
  const router = useRouter
  return (
    <div className={styles.categories}>
      {title && <h2>{title}</h2>}
      {categories.length > 0 && (
        <ul className={styles.categoriesLists}>
          {categories.map((cat, key) => (
            <li key={key}>
              <Button
                isLink={true}
                href={`/produits/categorie/${title
                  .toLowerCase()
                  .replace('é', 'e')}?genre=${cat.slug}`}
                btn="tertiary"
              >
                {cat.name}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CategoryFilter
