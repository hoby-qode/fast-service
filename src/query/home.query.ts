export async function getAllProducts() {
  const query = ` 
  query QueryProductBySlug {
    categoriesProduct {
      edges {
        node {
          id
          name
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
    }
    hqTags(where: {hideEmpty: true}) {
      nodes {
          id
          name
          slug
          count
          tags_picto {
              imagetag {
                sourceUrl
              }
          }
      }
    }
  }
   `

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
      query,
    )}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // next: {
      //   revalidate: false,
      // },
      cache: 'no-store',
    },
  )

  const { data } = await res.json()

  return data
}
