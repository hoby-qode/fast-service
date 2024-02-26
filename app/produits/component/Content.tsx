'use client'
import Card from '@/components/card'
import Filter from '@/src/features/Filter'
import OrderBy from '@/src/features/OrderBy'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import styles from './Content.module.css'
import { MdSort } from "react-icons/md";
import { motion, useAnimation } from 'framer-motion'
import { TbArrowsSort } from "react-icons/tb";
/* TODO: typage de variable products */
const Content = ({ products, tags }: { products: any; tags: any }) => {
  const searchParams = useSearchParams()
  const [data, setData] = useState([...products])
  const [order, setOrder] = useState(searchParams.get('order'))
  const [genre, setGenre] = useState(searchParams.get('genre'))
  const [showMenuFilter, setShowMenuFilter] = useState(false)
  const controls = useAnimation()
  useEffect(() => {
    if (order) {
      handleChangeOrder(order)
    } else if (genre) {
      handleChangeFilter(genre)
    }
  }, [order])
  
  const handleDragEnd = (_: any, info: any) => {
    // const distance = info.point.y - info.initialPoint.y

    if (info.offset.y > 30) {
      controls.start({ opacity: 0, height: 0 })
      setShowMenuFilter(false)
    } else {
      controls.start({ y: 0 })
      setShowMenuFilter(true)
    }
  }
  /* TODO: il manque la gestion du filtre au moment ou l'utilisateur actualise la page */
  function handleChangeOrder(orderBy: string) {
    setOrder(orderBy)
    switch (orderBy) {
      case 'date_asc':
        return data.sort(
          (a, b) =>
            new Date(a.acf_product.dateDeSortie).valueOf() -
            new Date(b.acf_product.dateDeSortie).valueOf(),
        )
      case 'date_desc':
        return data.sort(
          (a, b) =>
            new Date(b.acf_product.dateDeSortie).valueOf() -
            new Date(a.acf_product.dateDeSortie).valueOf(),
        )

      case 'title_asc':
        return data.sort((a, b) => a.slug.localeCompare(b.slug))
      case 'title_desc':
        return data.sort((a, b) => b.slug.localeCompare(a.slug))

      case 'note_asc':
        return data.sort((a, b) => a.acf_product.rating - b.acf_product.rating)
      case 'note_desc':
        return data.sort((a, b) => b.acf_product.rating - a.acf_product.rating)
    }
  }

  function handleChangeFilter(genre: string) {
    setGenre(genre)
    setData(
      products.filter((a: any) => {
        return a.hqTags.nodes.some((tag: any) => tag.slug === genre)
      }),
    )
  }

  return (
    <div className="container mt-0 mt-md-5">
      <div className="row">
        <div className="col-md-3">
          <div className='d-flex d-md-none justify-content-between container mb-5'>
            <button onClick={() => setShowMenuFilter(!showMenuFilter)} className={styles.menuFilter}><TbArrowsSort />Trier par </button>
            <button onClick={() => setShowMenuFilter(!showMenuFilter)} className={styles.menuFilter}><MdSort />  filtre </button>
          </div>
          {/* {showMenuFilter && ( */}
            <motion.div
              className={`d-flex justify-content-between ${styles.formContainer}`}
              drag="y"
              dragElastic={0.3}
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 1, height: 'auto' }}
              animate={controls}
            >
              {/* <div className="container d-flex flex-row flex-md-column">
                <OrderBy onChangeOrder={handleChangeOrder} order={order} />
                <Filter
                  onChangeFilter={handleChangeFilter}
                  tags={tags}
                  genre={genre}
                />
              </div> */}
            </motion.div>
          {/* )} */}
        </div>
        <div className="col-md-9">
          {data.length > 0 ? (
            <div className="row">
              {data.map((post: any, key: number) => (
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
          ) : (
            "Il n'y a pas d'éléments dans cette catégorie"
          )}
        </div>
      </div>
    </div>

  )
}

export default Content
