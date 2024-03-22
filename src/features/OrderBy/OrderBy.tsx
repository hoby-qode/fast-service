'use client'
import React, { useState } from 'react'

import styles from './OrderBy.module.css'
import { TbFilter, TbSortAscending, TbSortDescending } from 'react-icons/tb'
import { Input } from '@/components/forms'

const OrderBy = ({
  onChangeOrder,
  order,
}: {
  onChangeOrder: Function
  order: string | null
}) => {
  //TODO: Ajout du type sur le e
  const [currentOrder, setCurrentOrder] = useState('')
  const handleChange = (e) => {
    const orderBy = currentOrder.split('_')[0] // date or title
    const orderValue = currentOrder.split('_')[1] // asc or desc
    let clickedCheckbox = e.target
    let checkboxes = document.querySelectorAll('.input-order')
    checkboxes.forEach((checkbox) => {
      if (checkbox != clickedCheckbox) {
        checkbox.removeAttribute('checked')
      }
    })

    if (orderBy != e.target.value.split('_')[0]) {
      history.pushState({}, null, `?order=${e.target.value}`)
      setCurrentOrder(e.target.value)
      onChangeOrder(e.target.value)
    } else {
      if (orderValue == e.target.value.split('_')[1]) {
        history.pushState(
          {},
          null,
          `?order=${e.target.value.split('_')[0]}_desc`,
        )
        setCurrentOrder(`${e.target.value.split('_')[0]}_desc`)
        onChangeOrder(`${e.target.value.split('_')[0]}_desc`)
      } else {
        history.pushState(
          {},
          null,
          `?order=${e.target.value.split('_')[0]}_asc`,
        )
        setCurrentOrder(`${e.target.value.split('_')[0]}_asc`)
        onChangeOrder(`${e.target.value.split('_')[0]}_asc`)
      }
    }
  }
  return (
    <section className={styles.orderBy}>
      <form
        className={`${styles.orderBy_content}`}
        onChange={(e) => handleChange(e)}
      >
        {/* Order by title: */}
        <div className={styles.orderBy_item}>
          <Input
            type="checkbox"
            name="order"
            id="title_asc"
            value="title_asc"
            label="Alphabétiquement"
            icon={
              order === 'title_asc' ? (
                <TbSortAscending />
              ) : order === 'title_desc' ? (
                <TbSortDescending />
              ) : (
                ''
              )
            }
            className={`${
              order === 'title_desc' ? 'input-order-desc' : ''
            } input-order`}
            checked={order === 'title_asc'}
          />
        </div>
        {/* Order by date: */}
        <div className={styles.orderBy_item}>
          <Input
            type="checkbox"
            name="order"
            id="date_asc"
            value="date_asc"
            icon={
              order === 'date_asc' ? (
                <TbSortAscending />
              ) : order === 'date_desc' ? (
                <TbSortDescending />
              ) : (
                ''
              )
            }
            label="Date de sortie"
            className={`${
              order === 'date_desc' ? 'input-order-desc' : ''
            } input-order`}
            checked={order === 'date_asc'}
          />
        </div>
        <div className={styles.orderBy_item}>
          <Input
            type="checkbox"
            name="order"
            id="note_asc"
            value="note_asc"
            icon={
              order === 'note_asc' ? (
                <TbSortAscending />
              ) : order === 'note_desc' ? (
                <TbSortDescending />
              ) : (
                ''
              )
            }
            label="Note des utilisateurs"
            className={`${
              order === 'note_desc' ? 'input-order-desc' : ''
            } input-order`}
            checked={order === 'note_asc'}
          />
        </div>
      </form>
    </section>
  )
}

export default OrderBy
