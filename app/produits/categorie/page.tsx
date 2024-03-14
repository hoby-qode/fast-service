import Card from '@/components/card'
import CategoryFilter from '@/src/features/categoryFilter'
import HeaderPage from '@/src/features/headerPage'
import { findAllProductByCat } from '@/src/query/product.query'
import { findAllTags } from '@/src/query/tags.query'
import React from 'react'

const Category = async ({ params }: { params: { slug: string } }) => {
  const films = await findAllProductByCat(params.slug)

  const tags = await findAllTags()

  return (
    <div>
      <div className="container">
        <CategoryFilter title="Genre" categories={tags} />
        <div className="row">
          <div className="col-md-4">
            <h2>catégorie 1</h2>
          </div>
          <div className="col-md-4">
            <h2>catégorie 2</h2>
          </div>
          <div className="col-md-4">
            <h2>catégorie 3</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
