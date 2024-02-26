'use client'
import Card from '@/components/card'
import CardInline from '@/components/cardInline'
import CategoryFilter from '@/src/features/categoryFilter'
import React, { useContext, useEffect } from 'react'
import HeaderPage from './headerPage/HeaderPage'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import { AuthContext } from '@/src/context/Mycontext'
import Gender from '@/src/features/gender'
// import '~slick-carousel/slick/slick-theme.css'

//TODO : Ajout de typage sur films, series et tags
const Content = ({
  products,
  tags
}: {
  products: any
  tags: any
}) => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1.3,
    slidesToScroll: 1,
    rows: 3,
  }

  return (
    <main>
      <HeaderPage />
      <div className="container">
        {products.map((product:any, key:number) => 
          {product.name == 'films' || product.name == 'series' &&
            <div id={product.name} key={key}>
              <CategoryFilter title={product.name} categories={tags} />
              {product.products.nodes.length > 0 && (
              <div className="row">
                {product.products.nodes.map((post: any, key: number) => (
                  <div className="col-6 col-md-3 mb-4" key={key}>
                    <Card
                      id={post.databaseId}
                      title={post.title}
                      slug={post.slug}
                      date={post.acf_product.dateDeSortie}
                      featuredImage={post.featuredImage?.node.sourceUrl}
                      rating={post.acf_product.rating}
                    />
                  </div>
                ))}
              </div>
              )}
            </div>
          } 
        )}
        <div id="plus-vendus">
          <h2>Le plus vendus</h2>
          <Slider {...settings}>
            {products.map((product: any, key: number) =>
              product.name == 'films' &&
              product.products.nodes.map((post: any, key: number) => (
                <div key={key} className="mb-4">
                  <CardInline
                    featuredImage={post.featuredImage?.node.sourceUrl}
                    title={post.title}
                    date={
                      post.acf_product?.dateDeSortie
                        ? post.acf_product.dateDeSortie
                        : null
                    }
                    slug={post.slug}
                    idkey={key}
                    rating={post.acf_product.rating}
                  />
                </div>
              ))
            )}
          </Slider>
        </div>
        {
          products.map((product:any, key:number) => 
            {product.name == 'animes' || product.name == 'dramas' &&
              <div id={product.name} key={key}>
                <CategoryFilter title={product.name} categories={tags} />
                {product.products.nodes.length > 0 && (
                <div className="row">
                  {product.products.nodes.map((post: any, key: number) => (
                    <div className="col-6 col-md-3 mb-4" key={key}>
                      <Card
                        id={post.databaseId}
                        title={post.title}
                        slug={post.slug}
                        date={post.acf_product.dateDeSortie}
                        featuredImage={post.featuredImage?.node.sourceUrl}
                        rating={post.acf_product.rating}
                      />
                    </div>
                  ))}
                </div>
                )}
              </div>
            } 
          )
        }

        <div id="genre">
          <Gender genres={tags}/>
        </div>
      </div>
    </main>
  )
}

export default Content
