'use client'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext, CartContext } from './Mycontext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    <CartContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </CartContext.Provider>
  )
}

export default CartProvider
