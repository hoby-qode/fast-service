import React from 'react'

import styles from './menu.module.css'
import { AiFillGoogleCircle, AiOutlineLogout } from 'react-icons/ai'
import Username from './component/username/Username'
import Link from 'next/link'
import Password from './component/password/Password'
import Logout from './component/logout/Logout'
import Appareance from './component/appareance/Appareance'
import { TbArrowLeft } from 'react-icons/tb'

const Menu = () => {
  return (
    <div className={`container ${styles.page}`}>
      <Link href="/" className="flex space-x-4 text-2xl "><TbArrowLeft />Retour</Link>

      <fieldset>
        <legend>Apparence</legend>
        <div className={styles.inputGroup}>
          <Appareance />
        </div>
      </fieldset>

      <fieldset>
        <legend>Surnom</legend>
        <div className={styles.inputGroup}>
          <Username />
        </div>
      </fieldset>

      <fieldset>
        <legend>Mot de passe</legend>
        <div className={styles.inputGroup}>
          <Password />
        </div>
      </fieldset>

      <fieldset>
        <legend>Déconnection</legend>
        <div className={styles.inputGroup}>
          <Logout />
        </div>
      </fieldset>
    </div>
  )
}

export default Menu
