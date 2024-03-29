'use client'
import Button from '@/components/button'
import React from 'react'
import styles from './Password.module.css'
import { TbLoader } from 'react-icons/tb'

const Password = () => {
  return (
    <div className={styles.password}>
      <div className="mb-3">
        <input
          type="text"
          name="username"
          className={styles.password_input}
          placeholder="Mot de passe actuel"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="username"
          className={styles.password_input}
          placeholder="Nouveau mot de passe"
        />
      </div>
      <div>
        <input
          type="text"
          name="username"
          className={styles.password_input}
          placeholder="Retapez le nouveau mot de passe"
        />
      </div>
      <div className={styles.password_state}>
        <Button btn="success" onClick={() => alert('TODO')}>
          <TbLoader style={{ marginRight: '5px' }} />
          Changer votre mot de passe
        </Button>
      </div>
    </div>
  )
}

export default Password
