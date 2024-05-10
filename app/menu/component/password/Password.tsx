'use client'
import {Button} from '@/components/ui/button'
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
        <Button onClick={() => alert('TODO')} className='w-full'>
          <TbLoader style={{ marginRight: '5px' }} />
          Changer ton mot de passe
        </Button>
      </div>
    </div>
  )
}

export default Password
