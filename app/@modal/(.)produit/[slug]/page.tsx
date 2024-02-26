import React from 'react'
import HeaderPage from '../../../produit/component/HeaderPage'
import Actor from '@/components/actor'
import { getProductBySlug } from '@/src/query/product.query'
import InnerHTML from '@/components/innerHTML'
import Modal from '@/components/modal'
//TODO: N'oublie pas d'utilise generateStaticParams
const SingleProduct = async ({ params }: { params: { slug: string } }) => {
  const product = await getProductBySlug(params.slug)
  return (
    <Modal>
      <main className="w-100" style={{ marginBottom: '0' }}>
        <HeaderPage
          picture={product.featuredImage?.node?.sourceUrl}
          title={product.title}
          rating={product.acf_product.rating}
          date={product.acf_product.dateDeSortie}
          tags={product.hqTags.nodes}
          slug={product.slug}
          categories={product.categoriesProduct.nodes}
          id={product.databaseId}
        />
        <div className="container px-5">
          {product.content && (
            <>
              <h2>Synopsis</h2>
              <InnerHTML html={{ __html: product.content }} />
            </>
          )}
        </div>
      </main>
    </Modal>
  )
}

export default SingleProduct
