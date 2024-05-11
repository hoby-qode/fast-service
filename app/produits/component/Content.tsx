'use client'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Filter from '@/src/features/Filter'
import OrderBy from '@/src/features/OrderBy'
import { FilterIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import InfiniteScrollContent from './InfiniteScrollContent'
import SearchForm from './SearchForm'
const Content = ({
  products,
  tags,
  pageInfo,
  category,
}: {
  products: any
  tags: any
  pageInfo: any
  category: string
}) => {
  const searchParams = useSearchParams()
  const [datas, setDatas] = useState([...products])
  const [order, setOrder] = useState(searchParams.get('order') ?? null)
  const [genre, setGenre] = useState(searchParams.get('genre') ?? null)
  const [searchText, setSearchText] = useState('')
  const [showMenuFilter, setShowMenuFilter] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (order) {
      handleChangeOrder(order)
    } else if (genre) {
      handleChangeFilter(genre)
    }
  }, [])

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const searchTerm = event.target.s.value
    if (searchTerm !== '') {
      try {
        const query = `
        query products($searchTerm: String) {
          products(first: 12, where: {search: $searchTerm}) {
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
          }
        }`
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              query,
              variables: {
                searchTerm: searchTerm,
              },
            }),
            cache: 'no-store',
          },
        )
        const responseData = await response.json()
        const products = responseData.data.products.nodes
        setDatas(products)
        pageInfo.hasNextPage = false
      } catch (error) {
        console.error('Erreur lors de la requête AJAX :', error)
      }
    } else {
      // Remettre les données initiales si le champ de recherche est vide
      setDatas(products)
    }
  }
  const handleChangeFilter = async (genre: string) => {
    setGenre(genre)
    if (genre) {
      try {
        const query = `
        query products{
          hqTags(where: {slug: "${genre}"}) {
            nodes {
              products {
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
              }
            }
          }
        }`

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              query,
            }),
            cache: 'no-store',
          },
        )

        const responseData = await response.json()
        const filteredProducts =
          responseData.data.hqTags.nodes[0].products.nodes
        setDatas(filteredProducts)
        pageInfo.hasNextPage = false
      } catch (error) {
        console.error('Erreur lors de la requête AJAX :', error)
      }
    } else {
      // Remettre les données initiales si le champ de recherche est vide
      setDatas(products)
    }
  }

  return (
    <div className="container mt-0 mt-md-5">
      <div className="row">
        <div className="col-md-3">
          <div className="d-flex justify-content-between mb-5 space-x-4">
            {/* <button onClick={() => setShowMenuFilter(!showMenuFilter)} className={styles.menuFilter}><TbArrowsSort />Trier par </button>*/}
            <SearchForm handleSubmit={handleSubmit} />
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button
                  style={{ minHeight: '45px', boxShadow: 'var(--shadow)' }}
                  className="bg-background"
                >
                  <FilterIcon color="hsl(var(--primary))" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full mt-5">
                  <div className="container mb-5">
                    <Tabs defaultValue="filter">
                      <TabsList className="w-full">
                        <TabsTrigger value="filter" className="w-50">
                          Filtrer :{' '}
                        </TabsTrigger>
                        <TabsTrigger value="order" className="w-50">
                          Trier:{' '}
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="filter">
                        <Filter
                          onChangeFilter={handleChangeFilter}
                          tags={tags}
                          genre={genre}
                        />
                      </TabsContent>
                      <TabsContent value="order">
                        <OrderBy
                          onChangeOrder={handleChangeOrder}
                          order={order}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Fermer</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="col-md-9">
          {datas.length > 0 ? (
            <InfiniteScrollContent
              datas={datas}
              pageInfo={pageInfo}
              onSetDatas={setDatas}
              category={category}
            />
          ) : (
            "Il n'y a pas d'éléments dans cette catégorie"
          )}
        </div>
      </div>
    </div>
  )
}

export default Content
