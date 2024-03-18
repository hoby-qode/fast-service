'use client'
import { useSearchParams } from 'next/navigation'
import React, {  useEffect,  useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import SearchForm from './SearchForm'
import InfiniteScrollContent from './InfiniteScrollContent'
import OrderBy from '@/src/features/OrderBy'
import Filter from '@/src/features/Filter'
import {Button} from '@/components/ui/button'
import { MdSort } from "react-icons/md";
import { FilterIcon } from 'lucide-react'

const Content = ({ products, tags, pageInfo }: { products: any; tags: any;pageInfo:any }) => {
  const searchParams = useSearchParams()
  const [datas, setDatas] = useState([...products])
  const [order, setOrder] = useState(searchParams.get('order'))
  const [genre, setGenre] = useState(searchParams.get('genre'))
  const [searchText, setSearchText] = useState('')
  const [showMenuFilter, setShowMenuFilter] = useState(false)
  const controls = useAnimation()

  
  useEffect(() => {
    if (order) {
      handleChangeOrder(order)
    } else if (genre) {
      handleChangeFilter(genre)
    }
  }, [])
  
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
        return datas.sort(
          (a, b) =>
            new Date(a.acf_product.dateDeSortie).valueOf() -
            new Date(b.acf_product.dateDeSortie).valueOf(),
        )
      case 'date_desc':
        return datas.sort(
          (a, b) =>
            new Date(b.acf_product.dateDeSortie).valueOf() -
            new Date(a.acf_product.dateDeSortie).valueOf(),
        )

      case 'title_asc':
        return datas.sort((a, b) => a.slug.localeCompare(b.slug))
      case 'title_desc':
        return datas.sort((a, b) => b.slug.localeCompare(a.slug))

      case 'note_asc':
        return datas.sort((a, b) => a.acf_product.rating - b.acf_product.rating)
      case 'note_desc':
        return datas.sort((a, b) => b.acf_product.rating - a.acf_product.rating)
    }
  }

  function handleChangeFilter(genre: string) {
    setGenre(genre)
    setDatas(
      products.filter((a: any) => {
        return a.hqTags.nodes.some((tag: any) => tag.slug === genre)
      }),
    )
  }
  
  return (
    <div className="container mt-0 mt-md-5">
      <div className="row">
        
        <div className="col-md-3">
          <div className='d-flex d-md-none justify-content-between mb-5 space-x-4'>
            {/* <button onClick={() => setShowMenuFilter(!showMenuFilter)} className={styles.menuFilter}><TbArrowsSort />Trier par </button>*/}
            <SearchForm searchText={searchText} onChangeSearchText={setSearchText} />
            <Button onClick={() => setShowMenuFilter(!showMenuFilter)} style={{minHeight: '45px',boxShadow: "var(--shadow)"}} className='bg-background'><FilterIcon color="hsl(var(--primary))"/></Button> 
          </div>
           {/* {showMenuFilter && ( 
            <motion.div
              className={`d-flex justify-content-between ${styles.formContainer}`}
              drag="y"
              dragElastic={0.3}
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 1, height: 'auto' }}
              animate={controls}
            >
              <div className="container d-flex flex-row flex-md-column">
                <OrderBy onChangeOrder={handleChangeOrder} order={order} />
                <Filter
                  onChangeFilter={handleChangeFilter}
                  tags={tags}
                  genre={genre}
                />
              </div>
            </motion.div>
           )}  */}
        </div>
        <div className="col-md-9">
          {datas.length > 0 ? (
            <InfiniteScrollContent datas={datas} pageInfo={pageInfo} onSetDatas={setDatas} />
          ) : (
            "Il n'y a pas d'éléments dans cette catégorie"
          )}
        </div>
      </div>
    </div>

  )
}

export default Content
