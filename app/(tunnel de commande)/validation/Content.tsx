'use client'

import React, { useState } from 'react'

import TableCommandeList from '@/src/features/tableCommandeList'

const Content = ({products}:{products:any}) => {
  const [load, setLoad] = useState(true)
  return (
    <div className="mt-5">
      {load ? (
        products.length > 0 ? (
          <TableCommandeList products={products} />
        ) : (
          <div>
            Récapitulatif de ton commande
            Date de la commande : 
            le 02/05/2024 à 17:18
            Commande n° : 
            00060075
            Total T.T.C : 
            711,55 €
          </div>
        )
      ) : (
        'loading..'
      )}
    </div>
  )
}

export default Content
