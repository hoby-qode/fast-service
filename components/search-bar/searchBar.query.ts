export async function getProducts(search:string) {
    const query = `
    query SearchProducts {
        products(where: {search: "${search}"}) {
          nodes {
            title
            status
            slug
            databaseId
            acf_product {
                dateDeSortie
                rating
            }
            featuredImage {
                node {
                  sourceUrl
                }
            }
          }
        }
      }
        `
    const variables = {
        search
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query, variables})
    })
    
    const responseBody = await res.json()
    if (responseBody && responseBody.data && responseBody.data.products) {
        return responseBody.data.products
    }else {
        throw new Error('Erreur lors de la récupération des données')
    }
}