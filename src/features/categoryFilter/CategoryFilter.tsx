import { FC } from 'react'

import Button from '@/components/button/Button'
import { useRouter } from 'next/navigation'
import styles from './CategoryFilter.module.css'
interface CategoryFilterProps {
  title: string
  categories: Array<{
    name: string
    href: string
    slug: string
  }>
}
const CategoryFilter: FC<CategoryFilterProps> = ({ title, categories }) => {
  console.log('categories', categories)
  const router = useRouter
  return (
    <div className={styles.categories}>
      {title && <h2>{title}</h2>}
      {categories && (
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
