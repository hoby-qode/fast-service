import React from 'react'
import Content from './component/Content'
import { findAllProductByCat } from '@/src/query/product.query'
import { findAllTags } from '@/src/query/tags.query'

const Products = async () => {
  const products = await findAllProductByCat('films')
  const tags = await findAllTags()
  return (
    <div>
      <Content products={products[0].products.nodes} tags={tags} pageInfo={products[0].products.pageInfo} />
    </div>
  )
}

export default Products
