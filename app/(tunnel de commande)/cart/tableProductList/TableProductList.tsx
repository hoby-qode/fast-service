'use client'
import { useEffect, useState } from 'react'

import Button from '@/components/button'
import { validateCommandeApiRest } from '@/src/actions/commandeApiRest.action'
import useCommande from '@/src/hooks/useCommande'
import { useShoppingCart } from '@/src/store/useShoppingCart'
import { useFormState, useFormStatus } from 'react-dom'
import { TbInfoCircle } from 'react-icons/tb'
import InfiniteScrollContent from '../InfiniteScrollContent'
import styles from './TableProductList.module.css'

const TableProductList = ({
  products,
  onSetDatas,
  pageInfo,
}: {
  products: any
  onSetDatas: (data: any) => void
  pageInfo: { endCursor: string; hasNextPage: boolean }
}) => {
  const { items, removeItem, clearCart } = useShoppingCart()
  const { subTotal, total, reduction, infoReduction } = useCommande(
    products,
    items,
  )
  const [showInfoReduction, setShowInfoReduction] = useState(false)
  let idsCart = []
  if (items) {
    idsCart = items.map(function (element: any) {
      return element.id
    })
  }
  const [state, formAction] = useFormState(validateCommandeApiRest, null)
  useEffect(() => {
    if (state) {
      clearCart()
    }
  }, [state, clearCart])

  return (
    <div className={`${styles.table} w-100`}>
      <div className={styles.table_header}>
        <h1>Mon panier</h1>
        <div className="text-right">
          <form action={formAction}>
            <input type="hidden" name="data" value={idsCart} />
            <Submit />
          </form>
        </div>
      </div>
      <div className="table w-full">
        <div className={`${styles.table_thead}`}>
          <div className={`${styles.table_th_close} text-xxl text-bold`}></div>
          <div className={`${styles.table_th_product} text-xxl text-bold`}>
            Produit
          </div>
          <div className={styles.table_th_category}>Catégorie</div>
          <div className={`${styles.table_th_subtotal} px-4`}>Sous total</div>
        </div>
        <div className={`${styles.table_tbody}`}>
          {/* {products.map((post: any, key: number) => (
            <tr key={key}>
              <td
                style={{ verticalAlign: 'top' }}
                className={styles.table_td_close}
              >
                <div
                  className={`${styles.table_td_close_btn_container} d-flex flex-column space-y-2`}
                >
                  <AddCart
                    item={{
                      id: post.databaseId,
                      title: post.title,
                      category: post.categoriesProduct.nodes[0].slug,
                      nbSaison:
                        post.acf_product.saisons &&
                        post.acf_product.saisons.length,
                    }}
                    isInCart={true}
                    onRemove={() => removeItem(post.databaseId)}
                  />
                  {/* <Button style={{ padding: 0 }} className="hover:text-primary">
                    <AiFillEdit style={{ color: 'intial' }} />
                  </Button> */}
          {/* <ButtonEditSaison
                    isEditing={true}
                    nbSaison={
                      post.categoriesProduct.nodes[0].slug == 'series' &&
                      post.acf_product?.saisons
                        ? post.acf_product?.saisons.length
                        : 5
                    }
                    handleSubmit={handleSubmit}
                  /> */}
          {/*</div>
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
                  saisons={
                    items.filter((i) => i.id === post.databaseId)[0]?.saisons
                  }
                />
              </td>
              <td className={styles.table_td_category}>
                {post.categoriesProduct.nodes[0].slug}
              </td>
              <td className="px-4" style={{ verticalAlign: 'top' }}>
                <strong>
                  <SubTotal
                    idPost={post.databaseId}
                    prixUnit={post.categoriesProduct.nodes[0].prix.prix}
                    category={post.categoriesProduct.nodes[0].slug}
                    items={items}
                  />{' '}
                  Ar
                </strong>
              </td>
            </tr>
          ))} */}
          <InfiniteScrollContent
            datas={products}
            pageInfo={pageInfo}
            onSetDatas={onSetDatas}
            items={items}
          />
        </div>
      </div>
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
      {/* <div className="text-right">
        <form action={formAction} >
          <input type="hidden" name="data" value={idsCart} />
          <Submit />
        </form>
      </div> */}
    </div>
  )
}
function Submit() {
  const status = useFormStatus()
  return (
    <Button btn="secondary" isLink={false}>
      {status.pending ? 'Loading...' : 'Valider mon commande'}
    </Button>
  )
}

export default TableProductList
