export async function GetProductsAndCategories(slug: string) {
  const query =
    slug != 'all'
      ? `
    query QueryGetProductsAndCategories($slug: [String] = "${slug}") {
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
    }`
      : `query QueryGetProductsAndCategories{
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
      // next: {
      //   revalidate: false,
      // },
      cache: 'no-store',
    },
  )

  const { data } = await res.json()

  return data
}
