'use client'

import styles from '@/app/(tunnel de commande)/cart/tableProductList/TableProductList.module.css'
import AddCart from '@/components/addCart'
import CardInline from '@/components/cardInline'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
interface CartItem {
  id: number
  title: string
  category: string
  nbSaison: number | null
  saisons: number[]
}
const InfiniteScrollContent = ({
  datas,
  pageInfo,
  onSetDatas,
  items,
}: {
  datas: any
  pageInfo: { endCursor: string; hasNextPage: boolean }
  onSetDatas: (data: any) => void
  items: CartItem[]
}) => {
  const [endCursor, setEndCursor] = useState(pageInfo.endCursor)
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreData = async (Ids: number[]) => {
    if (pageInfo.hasNextPage) {
      const query = `
        query QueryProductBySlug{
          products(where: {in: [${Ids}]}, first: 12, after: "${endCursor}") {
            nodes {
              databaseId
              title
              slug
              acf_product {
                  dateDeSortie
                  rating
                  saisons {
                    saison
                  }
                  acteurs {
                      actorname
                      name
                  }
              }
              featuredImage {
                  node {
                      sourceUrl
                  }
              }
              status
              content
              hqTags {
                  nodes {
                      name
                      slug
                  }
              }
              categoriesProduct {
                nodes {
                  name
                  slug
                  slug
                  prix {
                    prix
                  }
                }
              } 
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }`
      const variables = { ids: Ids }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
          query,
        )}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, variables }),
          cache: 'no-store',
        },
      )

      const { data } = await res.json()
      console.log(data)
      onSetDatas([...datas, ...data.products.nodes])
      setEndCursor(data.products.pageInfo.endCursor)
      setHasMore(data.products.pageInfo.hasNextPage)
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
          <div key={key} className="tr w-100 flex mb-5 border-b pb-4">
            <div
              style={{ verticalAlign: 'top' }}
              className={styles.table_td_close}
            >
              <div
                className={`${styles.table_td_close_btn_container} d-flex flex-column space-y-2`}
              >
                <AddCart
                  item={{
                    id: post.databaseId,
                    title: post.title,
                    category: post.categoriesProduct.nodes[0].slug,
                    nbSaison:
                      post.acf_product.saisons &&
                      post.acf_product.saisons.length,
                  }}
                  isInCart={true}
                  onRemove={() => removeItem(post.databaseId)}
                />
                {/* <Button style={{ padding: 0 }} className="hover:text-primary">
                  <AiFillEdit style={{ color: 'intial' }} />
                </Button> */}
                {/* <ButtonEditSaison
                  isEditing={true}
                  nbSaison={
                    post.categoriesProduct.nodes[0].slug == 'series' &&
                    post.acf_product?.saisons
                      ? post.acf_product?.saisons.length
                      : 5
                  }
                  handleSubmit={handleSubmit}
                /> */}
              </div>
            </div>
            <div className={styles.table_td_card}>
              <CardInline
                key={key}
                featuredImage={post.featuredImage?.node.sourceUrl}
                title={post.title}
                date={
                  post.acf_product?.dateDeSortie
                    ? post.acf_product.dateDeSortie
                    : null
                }
                slug={post.slug}
                rating={post.acf_product.rating}
                saisons={
                  items.filter((i) => i.id === post.databaseId)[0]?.saisons
                }
              />
            </div>
            <div className={styles.table_td_category}>
              {post.categoriesProduct.nodes[0].slug}
            </div>
            <div
              className="px-4"
              style={{ verticalAlign: 'top', width: '20%' }}
            >
              {items && <strong>
                <SubTotal
                  idPost={post.databaseId}
                  prixUnit={post.categoriesProduct.nodes[0].prix.prix}
                  category={post.categoriesProduct.nodes[0].slug}
                  items={items}
                />{' '}
                Ar
              </strong> }
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  )
}
const SubTotal = ({ idPost, prixUnit, category, items }) => {
  if (category != 'series') {
    return prixUnit
  }
  const post = items.filter((i:any) => i.id === idPost)[0]
  return prixUnit * (post.saisons ? post.saisons.length : 1) 
}
export default InfiniteScrollContent
