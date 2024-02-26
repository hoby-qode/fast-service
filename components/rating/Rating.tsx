import React from 'react'
import styles from './Rating.module.css'
const Rating = ({ number }: { number: number }) => {
  return <div className={styles.rating}>{number}%</div>
}

export default Rating
