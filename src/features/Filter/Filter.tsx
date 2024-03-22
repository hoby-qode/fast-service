'use client'
import React from 'react'

import styles from './Filter.module.css'
import { AiFillFilter } from 'react-icons/ai'
import { Input } from '@/components/forms'
import { TbSortAscending, TbSortDescending } from 'react-icons/tb'

const Filter = ({
  onChangeFilter,
  genre,
  tags,
}: {
  onChangeFilter: Function
  genre: string | null
  tags: any
}) => {
  //TODO : Rendre le filtre genre en multiselect
  const handleChange = (e: any) => {
    let clickedCheckbox = e.target.value
    history.pushState({}, null, `?genre=${clickedCheckbox}`)

    onChangeFilter(clickedCheckbox)
  }
  return (
    <section className={styles.filter}>
      <form
        className={`${styles.filter_content}`}
        onChange={(e) => handleChange(e)}
      >
        {/* Order by title: */}
        {tags.map((tag: any, key: number) => (
          <div className={styles.filter_item} key={key}>
            <Input
              type="radio"
              name="genre"
              id={tag.slug}
              value={tag.slug}
              label={tag.name}
              icon={''}
              className="input-filter"
              defaultChecked={genre === tag.slug}
            />
          </div>
        ))}
      </form>
    </section>
  )
}

export default Filter
