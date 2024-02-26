import React from 'react'

import styles from './Appareance.module.css'
import ToggleTheme from '@/components/toggleTheme'

const Appareance = () => {
  return (
    <div className={styles.appareance}>
      <div className={styles.appareance_darkmode}>
        <label htmlFor="toggle-theme">Mode sombre</label>
        <ToggleTheme />
      </div>
    </div>
  )
}

export default Appareance
