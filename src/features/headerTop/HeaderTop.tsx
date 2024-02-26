'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import styles from './HeaderTop.module.css'
import {
  IoSearchOutline,
  IoCartOutline,
  IoLogInOutline,
  IoLogOutOutline,
} from 'react-icons/io5'
import LinkIcon from '@/components/LinkIcon'
import Link from 'next/link'
import NavigatorDesktop from '../navigatorDesktop'
import ToggleTheme from '@/components/toggleTheme'
import { CartContext } from '@/src/context/Mycontext'
import useAuth from '@/src/hooks/useAuth'
import { signIn, signOut, useSession } from "next-auth/react";
import BtnIcon from '@/components/btnIcon'
import { useShoppingCart } from '@/src/store/useCartStore'

const HeaderTop = () => {
  const { nbCart, setNbCart } = useContext(CartContext)
  const { items } = useShoppingCart();
  // const { user, isLogged, logout, loading, loginError, setJwt } = useAuth()
  const { data: session } = useSession();
  return (
    <header className={styles.header}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className={styles.headerLogo}>
            <Link href="/" className="d-flex align-items-center">
              <Image
                src="/images/logo/logo-fast-service.svg"
                alt="fast service"
                width={98}
                height={38}
                priority
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </Link>
          </div>
          <div className={styles.headerMenuDesktop}>
            <NavigatorDesktop />
          </div>
          <ul className={styles.headerPictos}>
            <li>
              <LinkIcon
                href="/recherche"
                icon={<IoSearchOutline />}
                style="rounded"
                bgColor="secondary"
                color="white"
              />
            </li>
            {session?.user && (
              <li>
                <LinkIcon
                  href="/cart"
                  icon={<IoCartOutline />}
                  style="rounded"
                  bgColor="secondary"
                  color="white"
                  nbNotification={items.length}
                />
              </li>
            )}
            <li>
              {session?.user ? (
                <BtnIcon icon={<IoLogOutOutline style={{width: '23px',height: '23px',position: 'relative',right: '2px'}}/>}
                style="rounded"
                bgColor="secondary"
                color="white" onClick={() => signOut()} />
              ) : (
                <BtnIcon icon={<IoLogInOutline style={{width: '23px',height: '23px',position: 'relative',right: '2px'}}/>}
                style="rounded"
                bgColor="secondary"
                color="white" onClick={() => signIn()} />
              )}
            </li>
            {/* <li className="d-none d-lg-block">
              <ToggleTheme />
            </li> */}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default HeaderTop
