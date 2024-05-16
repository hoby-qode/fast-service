import { getAllProducts } from '@/src/query/home.query'
import { Metadata } from 'next'
import Content from './component/Content'

export const metadata: Metadata = {
  title: "Page d'Accueil ",
  description: "Description de la page d'accueil",
}
export const revalidate = false
export const dynamic = 'force-static'
export default async function Home() {
  const datas = await getAllProducts()
  const animes = datas.categoriesProduct.edges[0]?.node
  const dramas = datas.categoriesProduct.edges[1]?.node
  const films = datas.categoriesProduct.edges[2]?.node
  const series = datas.categoriesProduct.edges[3]?.node
  return (
    <Content
      films={films}
      series={series}
      animes={animes}
      dramas={dramas}
      tags={datas.hqTags.nodes}
    />
  )
}
