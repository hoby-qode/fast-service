import React, { FC } from 'react'

import styles from './HeaderPage.module.css'
import Breadcrumb from '@/components/breadcrumb'
import Link from 'next/link'
import { IoArrowBackSharp } from 'react-icons/io5'

interface HeaderPageProps {
  title: string
  height?: number
}
const HeaderPage: FC<HeaderPageProps> = ({ title, height }) => {
  return (
    <div
      className={styles.headerPage}
      style={{ height: `${height ? height : 300}px` }}
    >
      <div className={`container ${styles.headerPage_container}`}>
        <Link href="../" className={styles.headerPage_toBack}>
          <IoArrowBackSharp />
          Retour
        </Link>
        <h1 className="text-center">{title}</h1>
        <Breadcrumb
          homeElement={'Fast service'}
          separator={<span className="color-light"> &gt; </span>}
          activeClasses="active"
          containerClasses="d-flex gap-10 ml-0 pl-0 justify-content-center"
          listClasses="list-style-none color-light"
          capitalizeLinks
        />
      </div>
    </div>
  )
}

export default HeaderPage
