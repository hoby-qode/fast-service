import React from 'react'
import styles from './Loader.module.css'
import { RiLoader5Line } from "react-icons/ri";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
        <RiLoader5Line className={styles.loaderAnimate}/>
        loading...
    </div>
  )
}

export default Loader