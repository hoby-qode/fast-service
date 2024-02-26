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
  films,
  series,
  animes,
  dramas,
  tags,
}: {
  films: any
  series: any
  animes: any
  dramas: any
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
        <div id="films">
          <CategoryFilter title={films[0].name} categories={tags} />
          {films[0].products.nodes.length > 0 && (
            <div className="row">
              {films[0].products.nodes.map((post: any, key: number) => (
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
        <div id="series">
          <CategoryFilter title={series[0].name} categories={tags} />
          {series[0].products.nodes.length > 0 && (
            <div className="row">
              {series[0].products.nodes.map((post: any, key: number) => (
                <div className="col-6 col-md-3 mb-4" key={key}>
                  <Card
                    id={post.databaseId}
                    title={post.title}
                    slug={post.slug}
                    date={
                      post.acf_product?.dateDeSortie
                        ? post.acf_product.dateDeSortie
                        : null
                    }
                    featuredImage={post.featuredImage?.node.sourceUrl}
                    rating={post.acf_product.rating}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div id="plus-vendus">
          <h2>Le plus vendus</h2>
          <Slider {...settings}>
            {films[0].products.nodes.map((post: any, key: number) => (
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
            ))}
          </Slider>
        </div>
        <div id="animes">
          <CategoryFilter title={animes[0].name} categories={tags} />
          {animes[0].products.nodes.length > 0 && (
            <div className="row">
              {animes[0].products.nodes.map((post: any, key: number) => (
                <div className="col-6 col-md-3 mb-4" key={key}>
                  <Card
                    id={post.databaseId}
                    title={post.title}
                    slug={post.slug}
                    date={
                      post.acf_product?.dateDeSortie
                        ? post.acf_product.dateDeSortie
                        : null
                    }
                    featuredImage={post.featuredImage?.node.sourceUrl}
                    rating={post.acf_product.rating}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div id="dramas">
          <CategoryFilter title={dramas[0].name} categories={tags} />
          {dramas[0].products.nodes.length > 0 && (
            <div className="row">
              {dramas[0].products.nodes.map((post: any, key: number) => (
                <div className="col-6 col-md-3 mb-4" key={key}>
                  <Card
                    id={post.databaseId}
                    title={post.title}
                    slug={post.slug}
                    date={
                      post.acf_product?.dateDeSortie
                        ? post.acf_product.dateDeSortie
                        : null
                    }
                    featuredImage={post.featuredImage?.node.sourceUrl}
                    rating={post.acf_product.rating}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div id="genre">
          <Gender genres={tags}/>
        </div>
      </div>
    </main>
  )
}

export default Content
