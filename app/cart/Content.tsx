'use client'

import React, { useContext, useEffect, useState } from 'react'

import TableProductList from '@/src/features/tableProductList'

const Content = ({products}:{products:any}) => {
  const [load, setLoad] = useState(true)
  return (
    <div className="mt-5">
      {load ? (
        products.length > 0 ? (
          <TableProductList products={products} />
        ) : (
          <div className="pasElement">
            Il n&apos;y a pas d&apos;élément dans votre panier, faites vos
            achats içi
          </div>
        )
      ) : (
        'loading..'
      )}
    </div>
  )
}

export default Content
