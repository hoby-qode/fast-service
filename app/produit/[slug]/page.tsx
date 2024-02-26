import React from 'react'
import HeaderPage from '../component/HeaderPage'
import Actor from '@/components/actor'
import { getProductBySlug } from '@/src/query/product.query'
import InnerHTML from '@/components/innerHTML'

//TODO: N'oublie pas d'utilise generateStaticParams
const SingleProduct = async ({ params }: { params: { slug: string } }) => {
  const product = await getProductBySlug(params.slug)

  return (
    <div>
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
      <div className="container">
        {product.content && (
          <>
            <h2>Synopsis</h2>
            <InnerHTML html={{ __html: product.content }} />
          </>
        )}
        {product.acf_product.acteurs && (
          <>
            <h2 className="mt-5">Têtes d&apos;affiche</h2>
            <div className="row">
              {product.acf_product.acteurs.map(
                (
                  acteur: {
                    picture: { sourceUrl: string }
                    name: string
                    actorname: string
                  },
                  key: number,
                ) => (
                  <div className="col-md-3 col-6" key={key}>
                    <Actor
                      picture={acteur.picture.sourceUrl}
                      name={acteur.name}
                      actorName={acteur.actorname}
                    />
                  </div>
                ),
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SingleProduct
