'use client'

import TableProductList from '@/app/(tunnel de commande)/cart/tableProductList'
import { useState } from 'react'

const Content = ({
  products,
  pageInfo,
  onSetDatas,
}: {
  products: any
  pageInfo: { endCursor: string; hasNextPage: boolean }
  onSetDatas: (data: any) => void
}) => {
  const [load, setLoad] = useState(true)
  return (
    <div className="mt-5">
      {load ? (
        products.length > 0 ? (
          <TableProductList
            products={products}
            pageInfo={pageInfo}
            onSetDatas={onSetDatas}
          />
        ) : (
          'Il n&apos;y a pas d&apos;élément dans ton panier, faites vos achats içi'
        )
      ) : (
        'loading..'
      )}
    </div>
  )
}

export default Content
