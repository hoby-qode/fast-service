export async function findAllTags() {
    const query = `
        query tags {
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
    `;

    const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
        revalidate: 0,
        },
    })

    const { data } = await res.json()
    return data.hqTags.nodes
}