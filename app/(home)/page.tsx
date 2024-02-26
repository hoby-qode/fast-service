import { Metadata } from 'next'
import React from 'react'
import { findAllTags } from '@/src/query/tags.query'
import Content from './component/Content'
import { findAllProductByCat } from '@/src/query/product.query'

export const metadata: Metadata = {
  title: "Page d'Accueil ",
  description: "Description de la page d'accueil",
}
export const revalidate = false
export const dynamic = 'force-static'
export default async function Home() {
  const films = await findAllProductByCat('films')
  const series = await findAllProductByCat('series')
  const animes = await findAllProductByCat('animes')
  const dramas = await findAllProductByCat('dramas')

  const tags = await findAllTags()

  return (
    <Content
      films={films}
      series={series}
      animes={animes}
      dramas={dramas}
      tags={tags}
    />
  )
}
