import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'

const Cart = async () => {
  // const session = cookies().get('session')
  const session = getCookie('session', { cookies })
  // const { data: session } = useSession();
  // if(!session) {
  //   redirect('/')
  // }
  const fetchData = async (Ids: any) => {
    // const query = `
    // query QueryProductBySlug{
    //   products(where: {in: [${Ids}]}
    //     last: 500) {
    //       nodes {
    //           databaseId
    //           title
    //           slug
    //           acf_product {
    //               dateDeSortie
    //               rating
    //               acteurs {
    //                   picture {
    //                   sourceUrl
    //                   }
    //                   actorname
    //                   name
    //               }
    //           }
    //           featuredImage {
    //               node {
    //                   sourceUrl
    //               }
    //           }
    //           status
    //           content
    //           hqTags {
    //               nodes {
    //                   name
    //                   slug
    //               }
    //           }
    //           categoriesProduct {
    //             nodes {
    //               slug
    //               prix {
    //                 prix
    //               }
    //             }
    //           }
    //       }
    //   }
    // }`
    const query = `
    query MyQuery {
      products(where: {in: [46, 45, 42, 27, 47, 49, 28, 44]}) {
        nodes {
          databaseId
          title
          acf_product {
            dateDeSortie
            rating
            acteurs {
              actorname
              picture {
                sourceUrl
              }
            }
          }
        }
      }
    }`
    // const headers = {
    //   Authorization: `Bearer ${refreshToken}`,
    //   'Content-Type': 'application/json',
    // }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
          query,
        )}`,
      )

      if (!res.ok) {
        throw new Error('Erreur lors de la récupération des données')
      }
      const { data } = await res.json()
      return data
    } catch (error) {
      console.error('Erreur lors de la récupération des données')
    }
  }
  const data = await fetchData([46, 45, 42, 27, 47, 49, 28, 44])
  // const products = data.products.nodes
  return (
    <div>
      <div className="container mw-100">
        {/* <Content products={products}/> */}
      </div>
    </div>
  )
}

export default Cart
