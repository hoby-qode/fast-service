import { GetProductsAndCategories } from '@/src/query/productsCategories.query'
import Content from '../../component/Content'
const SingleCategory = async ({ params }: { params: { slug: string } }) => {
  const data = await GetProductsAndCategories(params.slug)
  const products = data.categoriesProduct.nodes[0].products.nodes
  const pageInfo = data.categoriesProduct.nodes[0].products.pageInfo
  const tags = data.hqTags.nodes
  return (
    <div>
      <Content
        products={products}
        tags={tags}
        pageInfo={pageInfo}
        category={params.slug ? params.slug : 'all'}
      />
    </div>
  )
}

export default SingleCategory
