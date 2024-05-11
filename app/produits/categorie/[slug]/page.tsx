import { GetProductsAndCategories } from '@/src/query/productsCategories.query'
import Content from '../../component/Content'
const SingleCategory = async ({ params }: { params: { slug: string } }) => {
  const data = await GetProductsAndCategories(params.slug)
  const products = data.categoriesProduct.nodes
  const tags = data.hqTags.nodes
  return (
    <div>
      <Content
        products={products[0].products.nodes}
        tags={tags}
        pageInfo={products[0].products.pageInfo}
        category={params.slug ? params.slug : 'all'}
      />
    </div>
  )
}

export default SingleCategory
