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
import { signIn, signOut, useSession } from "next-auth/react";
import { useShoppingCart } from '@/src/store/useShoppingCart'
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
type Checked = DropdownMenuCheckboxItemProps["checked"]

const HeaderTop = () => {
  const { items } = useShoppingCart();
  const { data: session } = useSession();
  type Checked = DropdownMenuCheckboxItemProps["checked"]
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  
  return (
    <header className={styles.header}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className={styles.headerLogo}>
            <Link href="/" className="d-flex align-items-center">
              <Image
                src="/images/logo/logo-fast-service.svg"
                alt="fast service"
                width={185}
                height={51}
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
              {/* {session?.user ? (
                <BtnIcon icon={<IoLogOutOutline style={{width: '23px',height: '23px',position: 'relative',right: '2px'}}/>}
                style="rounded"
                bgColor="secondary"
                color="primary" onClick={() => signOut()} />
              ) : (
                <BtnIcon icon={<IoLogInOutline style={{width: '23px',height: '23px',position: 'relative',right: '2px'}}/>}
                style="rounded"
                bgColor="secondary"
                color="primary" onClick={() => signIn()} />
              )} */}
              <div className="position-relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                  >
                    Status Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showActivityBar}
                    onCheckedChange={setShowActivityBar}
                    disabled
                  >
                    Activity Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                  >
                    Panel
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
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
