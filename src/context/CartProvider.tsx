'use client'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext, CartContext } from './Mycontext'

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [nbCart, setNbCart] = useState(0)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (localStorage.getItem('idsProducts-dXNlcjox')) {
      const nbCartLocalstorage = localStorage.getItem('idsProducts-dXNlcjox')
      setNbCart(nbCartLocalstorage ? nbCartLocalstorage?.split(',').length : 0)
    }
  }, [nbCart])
  const contextValue = {
    nbCart,
    setNbCart,
  }
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}

export default CartProvider
