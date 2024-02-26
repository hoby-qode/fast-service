'use client'
import Button from '@/components/button'
import React from 'react'
import styles from './Username.module.css'
import { AiOutlineLoading } from 'react-icons/ai'
import { TbLoader } from 'react-icons/tb'

const Username = () => {
  return (
    <div className={styles.username}>
      <input
        type="text"
        name="username"
        value="Marcel"
        className={styles.username_input}
      />
      <div className={styles.username_state}>
        <Button btn="secondary" onClick={() => alert('TODO')}>
          <TbLoader style={{ marginRight: '5px' }} />
          Vérifier la disponibilité
        </Button>
      </div>
      <div className={styles.username_info}>
        Créez un surnom sur Fast service afin qu&apos;on puisse vous idéntifiez
        <br /> - Vous pouvez entrer un maximum de 20 caractère d&apos;alphabets,
        de chiffres et de symboles.
      </div>
    </div>
  )
}

export default Username
