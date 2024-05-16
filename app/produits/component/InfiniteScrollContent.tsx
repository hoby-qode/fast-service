'use client'

import Card from '@/components/card'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const InfiniteScrollContent = ({ datas, pageInfo, onSetDatas, category }) => {
  const [endCursor, setEndCursor] = useState(pageInfo.endCursor)
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreData = async () => {
    if (pageInfo.hasNextPage) {
      const query =
        category != 'all'
          ? `
      query QueryProductByCat($slug: [String] = "${category}") {
        categoriesProduct(where: {slug: $slug}) {
          nodes {
            id
            name
            products(first: 12, after: "${endCursor}") {
              nodes {
                acf_product {
                  dateDeSortie
                  rating
                  saisons {
                    saison
                  }
                }
                content
                slug
                status
                title
                databaseId
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                hqTags {
                  nodes {
                    slug
                    name
                  }
                }
                categoriesProduct {
                  nodes {
                    name
                    slug
                  }
                }
              }
              pageInfo {
                  endCursor
                  hasNextPage
              }
            }
          }
        }
      }`
          : `query QueryGetProductsAndCategories{
            products(first: 12, after: "${endCursor}") {
              nodes {
                acf_product {
                  dateDeSortie
                  rating
                  saisons {
                    saison
                  }
                }
                content
                slug
                status
                title
                databaseId
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                hqTags {
                  nodes {
                    slug
                    name
                  }
                }
                categoriesProduct {
                  nodes {
                    name
                    slug
                  }
                }
              }
              pageInfo {
                  endCursor
                  hasNextPage
              }
            }
          }`

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
          query,
        )}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        },
      )

      const { data } = await res.json()
      console.log(data)
      if (category != 'all') {
        onSetDatas([
          ...datas,
          ...data.categoriesProduct.nodes[0].products.nodes,
        ])
        setEndCursor(
          data.categoriesProduct.nodes[0].products.pageInfo.endCursor,
        )
        setHasMore(
          data.categoriesProduct.nodes[0].products.pageInfo.hasNextPage,
        )
      } else {
        onSetDatas([...datas, ...data.products.nodes])
        setEndCursor(data.products.pageInfo.endCursor)
        setHasMore(data.products.pageInfo.hasNextPage)
      }
    }
  }
  console.log('datas', datas)
  return (
    <InfiniteScroll
      dataLength={datas.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={pageInfo.hasNextPage && <h4>Loading...</h4>}
    >
      <div className="row">
        {datas.map((post: any, key: number) => (
          <div className="col-6 col-md-3 mb-4 z-[50]" key={key}>
            <Card
              id={post.databaseId}
              title={post.title}
              nbSaison={
                post.categoriesProduct.nodes[0].slug == 'series' &&
                post.acf_product?.saisons
                  ? post.acf_product?.saisons.length
                  : 1
              }
              category={post.categoriesProduct.nodes[0].slug}
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
    </InfiniteScroll>
  )
}

export default InfiniteScrollContent
