'use client'
import Button from '@/components/button'
import React from 'react'
import styles from './Logout.module.css'
import { TbLoader } from 'react-icons/tb'
import { AiOutlineLogout } from 'react-icons/ai'

const Logout = () => {
  return (
    <div className={styles.logout}>
      <Button btn="danger" onClick={() => alert('TODO')}>
        <AiOutlineLogout style={{ marginRight: '5px' }} />
        Déconnecter ton compte
      </Button>
    </div>
  )
}

export default Logout
