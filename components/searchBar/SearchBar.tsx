'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'

import BtnIcon from '@/components/btnIcon'
import { getProducts } from './searchBar.query'
import styles from './searchBar.module.css'
import CardInline from '@/components/cardInline'
import Loading from '../cardInline/loading'

const SearchBar = (isResultFloat ?: boolean ) => {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showContainerResult, setShowContainerResult] = useState(false)
  const searchResultsContainer = useRef(null)
  useEffect(() => {
    if (searchText.length >= 3) {
      const fetchData = async () => {
        try {
          const data = await getProducts(searchText)
          setSearchResults(data.nodes)
        } catch (error) {
          console.error('Erreur lors de la récupération des données', error)
        }
      }
      fetchData()
    } else {
      setSearchResults([])
    }
  }, [searchText])
  return (
    <form className={styles.searchBar}>
      <div className={styles.searchBar_content}>
        <input
          type="search"
          name="s"
          onChange={(e) => setSearchText(e.target.value)}
          className={styles.searchBar_input}
          placeholder="Faite vos recherches |"
          onFocus={() => setShowContainerResult(true)}
          onBlur={() =>
            searchResults.length == 0
              ? setShowContainerResult(false)
              : setShowContainerResult(true)
          }
        />
        <div className={styles.searchBar_submit}>
          <BtnIcon
            icon={<IoSearchOutline color='hsl(var(--background))' />}
            style="rounded"
            bgColor="primary"
            color="primary"
          />
        </div>
      </div>
      {showContainerResult ? (
        <div
          className={`${styles.searchBar_results} ${
            isResultFloat && styles.searchBar_float
          }`}
        >
          {searchResults.length > 0 ? (
            searchResults.map((post: any, key: number) => (
              // TODO: mettre l'idKey optionnel
              <Suspense fallback={<Loading />} key={key}>
                <CardInline
                  featuredImage={post.featuredImage?.node.sourceUrl}
                  title={post.title}
                  date={
                    post.acf_product?.dateDeSortie
                      ? post.acf_product.dateDeSortie
                      : null
                  }
                  slug={post.slug}
                  rating={post.acf_product.rating}
                />
              </Suspense>
            ))
          ) : searchResults.length == 0 && searchText != '' ? (
            //TODO: Cherche un terme plus UX
            `Il n'a pas d'éléments comportant le nom ${searchText}`
          ) : (
            <>
              <Loading />
              <Loading />
              <Loading />
            </>
          )}
        </div>
      ) : (
        ''
      )}
    </form>
  )
}

export default SearchBar
