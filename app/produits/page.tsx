import { GetProductsAndCategories } from '@/src/query/home.query'
import Content from './component/Content'

const Products = async () => {
  const data = await GetProductsAndCategories('all')
  console.log(data)
  const products = data.products.nodes
  const tags = data.hqTags.nodes
  const pageInfo = data.products.pageInfo
  // console.log(products)
  return (
    <div>
      <Content
        products={products}
        tags={tags}
        pageInfo={pageInfo}
        category="all"
      />
    </div>
  )
}

export default Products
