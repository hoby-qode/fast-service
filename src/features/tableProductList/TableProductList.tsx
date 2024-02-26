'use client'
import React, { useContext, useEffect, useState } from 'react'

import styles from './TableProductList.module.css'
import CardInline from '@/components/cardInline'
import useCommande from '@/src/hooks/useCommande'
import { TbInfoCircle } from 'react-icons/tb'
import { validateCommande } from '@/src/actions/commande.action'
import Button from '@/components/button'
import useAuth from '@/src/hooks/useAuth'
import { AuthContext } from '@/src/context/Mycontext'
import AddCart from '@/components/addCart'
import { useShoppingCart } from '@/src/store/useCartStore'
import { useFormStatus, useFormState } from 'react-dom'
import { validateCommandeApiRest } from '@/src/actions/commandeApiRest.action'

const TableProductList = ({ products }: { products: any }) => {
  const { subTotal, total, reduction, infoReduction } = useCommande(products)
  const [showInfoReduction, setShowInfoReduction] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const { items,removeItem,clearCart } = useShoppingCart();
  let idsCart = [];
  if (items) {
    idsCart = items.map(function(element:any) {
        return element.id;
    });
  } 
  const initialState = {
    message: '',
    formData : null,
  }
  const [state, formAction] = useFormState(validateCommandeApiRest, null)
  
  return (
    <div className={styles.table}>
      <div className={styles.table_header}>
        <h1>Mon panier</h1>
        <div className="text-right">
          <form action={formAction} >
            <input type="hidden" name="data" value={idsCart} />
            <Submit />
          </form>
        </div>
      </div>
      <table cellPadding={15}>
        <thead>
          <tr className="text-left">
            <th className={styles.table_th_close}></th>
            <th className={styles.table_th_product}>Produit</th>
            <th className={styles.table_th_category}>Catégorie</th>
            <th className={`${styles.table_th_subtotal} px-4`}>Sous total</th>
          </tr>
        </thead>
        <tbody className="">
          {products.map((post: any, key: number) => (
            <tr key={key}>
              <td
                style={{ verticalAlign: 'top' }}
                className={styles.table_td_close}
              >
                <div className={styles.table_td_close_btn_container}>
                  <AddCart 
                  isInCart={true}
                  onRemove={() => removeItem(post.databaseId)} />
                </div>
              </td>
              <td className={styles.table_td_card}>
                <CardInline
                  key={key}
                  featuredImage={post.featuredImage?.node.sourceUrl}
                  title={post.title}
                  date={
                    post.acf_product?.dateDeSortie
                      ? post.acf_product.dateDeSortie
                      : null
                  }
                  slug={post.slug}
                  rating={post.acf_product.rating}
                />
              </td>
              <td className={styles.table_td_category}>
                {post.categoriesProduct.nodes[0].slug}
              </td>
              <td className="px-4" style={{ verticalAlign: 'top' }}>
                <strong>
                  {`${post.categoriesProduct.nodes[0].prix.prix} Ar`}
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.cartTotal}>
        <div className={`${styles.cartTotal_item} mb-4`}>
          <div className={styles.cartTotal__left}>
            <p>Sous total:</p>
          </div>
          <div className={styles.cartTotal__right}>
            <p>{subTotal} Ar</p>
          </div>
        </div>
        <div
          className={`${styles.cartTotal_item} ${
            !showInfoReduction ? 'mb-4' : 'mb-3'
          }`}
        >
          <div className={styles.cartTotal__left}>
            <p title={infoReduction}>
              Reduction{' '}
              <TbInfoCircle
                onClick={() => setShowInfoReduction(!showInfoReduction)}
              />
              :
            </p>
          </div>
          <div className={styles.cartTotal__right}>
            <p className="text-right">{reduction} Ar</p>
          </div>
        </div>
        {showInfoReduction && (
          <div className={`${styles.cartTotal__infoReduction} mb-4`}>
            {infoReduction}
          </div>
        )}
        <div className={styles.cartTotal_item}>
          <div className={styles.cartTotal__left}>
            <strong>Total:</strong>
          </div>
          <div className={styles.cartTotal__right}>
            <strong>{total} AR</strong>
          </div>
        </div>
      </div>
      <div className="text-right">
        <form action={formAction}>
          <input type="hidden" name="data" value={[15, 5, 85]} />
          <Submit />
        </form>
      </div>
    </div>
  )
}
function Submit() {
  const status = useFormStatus();
  return <Button btn="secondary" isLink={false}>{status.pending ? 'Loading...' : 'Valider mon commande'}</Button>
}
export default TableProductList
