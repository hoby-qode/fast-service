import React from 'react'
import HeaderPage from '@/src/features/headerPage'
import { findAllProductByCat } from '@/src/query/product.query'
import { findAllTags } from '@/src/query/tags.query'
import Content from '../../component/Content'

const SingleCategory = async ({ params }: { params: { slug: string } }) => {
  const products = await findAllProductByCat(params.slug)
  const tags = await findAllTags()

  return (
    <div>
      <Content products={products[0].products.nodes} tags={tags} pageInfo={products[0].products.pageInfo} />
    </div>
  )
}

export default SingleCategory
