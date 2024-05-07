import React from 'react'
import HeaderPage from '@/src/features/headerPage'
import SearchBar from '@/components/search-bar/SearchBar'

const Search = () => {
  return (
    <main style={{ height: '100vh' }}>
      <HeaderPage title="Recherche" height={150} />

      <div className="container">
        <SearchBar />
      </div>
    </main>
  )
}

export default Search
