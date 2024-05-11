'use client'
import { useContext, useEffect, useState } from 'react'
import { AuthContext, CartContext } from '../context/Mycontext'

const useCart = (id: string) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const { nbCart, setNbCart } = useContext(CartContext)
  const [isActive, setIsActive] = useState(false)
  const handleActive = (id: string) => {
    /* TODO: cherche un moyen plus efficace pour savoir si l'id existe déjà */
    if (currentUser.username) {
      /* Suppréssion du produit existe déjà */
      if (localStorage.getItem('idsProducts-' + currentUser.id)?.includes(id)) {
        const dataSplit = localStorage
          .getItem('idsProducts-' + currentUser.id)
          ?.split(',')
        localStorage.setItem(
          'idsProducts-' + currentUser.id,
          dataSplit!.filter((e) => e != id).join(','),
        )
        setIsActive(false)
        setNbCart(
          localStorage.getItem('idsProducts-' + currentUser.id)?.split(','),
        )
        // toast.info(`le produit ${id} est supprimé de votre panier`, {
        //   position: 'top-right',
        //   autoClose: 1500,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: true,
        // })
      } else {
        const lastData = localStorage.getItem('idsProducts-' + currentUser.id)
        if (lastData) {
          localStorage.setItem(
            'idsProducts-' + currentUser.id,
            lastData + ',' + id,
          )
        } else {
          localStorage.setItem('idsProducts-' + currentUser.id, id)
        }
        setIsActive(true)
        setNbCart(
          localStorage.getItem('idsProducts-' + currentUser.id)?.split(','),
        )
        // toast.success(`le produit ${id} est bien ajouté dans votre panier`, {
        //   position: 'top-right',
        //   autoClose: 1500,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: true,
        // })
      }
    }
  }
  useEffect(() => {
    if (localStorage.getItem('idsProducts-' + currentUser.id)?.includes(id)) {
      setIsActive(true)
    }
  }, [isActive, id])
  return {
    isActive: isActive,
    addCart: () => handleActive(id),
  }
}
export default useCart
