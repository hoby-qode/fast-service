import React from 'react'
import Image from 'next/image'

import starsImage from '@/public/images/stars/stars.svg'
import bgstarsImage from '@/public/images/stars/bg-stars.svg'
import styles from './Stars.module.css'

const Stars = ({ count }) => {
  return (
    <div className={styles.stars}>
      <Image
        src={starsImage}
        alt="stars"
        className={styles.starsImage}
        style={{ clip: 'rect(0px, ' + count * 15 + 'px, 14px, 0px)' }}
      />
      <Image src={bgstarsImage} alt="bg-stars" className={bgstarsImage} />
    </div>
  )
}

export default Stars
