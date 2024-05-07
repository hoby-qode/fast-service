export async function getProductBySlug(slug: string) {
    const query = 
    ` query QueryProductBySlug{
        productBy(slug: "${slug}") {
            databaseId
            title
            slug
            acf_product {
                dateDeSortie
                rating
                
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
                  slug
                }
            }
        }
    }
    `
    
    const variables = {
        slug
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query, variables}),
            next:{
                revalidate: false
            }
        }
    )
    const responseBody = await res.json()
    
    if (responseBody && responseBody.data) {
        return responseBody.data.productBy
    }else {
        // throw new Error('Erreur lors de la récupération des données')
        console.log(responseBody)
    }
}


export async function findAllProductByCat(slug: string) {
    const query = `
    query QueryProductByCat($slug: [String] = "${slug}") {
      categoriesProduct(where: {slug: $slug}) {
        nodes {
          id
          name
          products(first: 12) {
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
    }`;

    const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // next: {
        //   revalidate: false,
        // },
        cache: 'no-store'
    })

    const { data } = await res.json()
    
    return data.categoriesProduct.nodes
}

export async function getProductsInCart(ids: [number]) {
    const query = 
    `query QueryProductBySlug{
        products(where: {in: [50, 49]}) {
            nodes {
                databaseId
                title
                slug
                acf_product {
                    dateDeSortie
                    rating
                    acteurs {
                        picture {
                        sourceUrl
                        }
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
                        slug
                    }
                } 
            }
        }
    }
    `
    
    const variables = {
        ids
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query, variables}),
            next:{
                revalidate: false
            }
        }
    )
    const responseBody = await res.json()
    
    if (responseBody && responseBody.data) {
        return responseBody.data.productBy
    }else {
        throw new Error('Erreur lors de la récupération des données')
    }
}