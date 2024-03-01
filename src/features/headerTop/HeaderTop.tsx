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
import { createAvatar } from '@dicebear/core';
import { notionists } from '@dicebear/collection';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
 
type Checked = DropdownMenuCheckboxItemProps["checked"]

const HeaderTop = () => {
  const { items } = useShoppingCart();
  const { data: session } = useSession();
  type Checked = DropdownMenuCheckboxItemProps["checked"]
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  
  const avatar = createAvatar(notionists, {
    seed: session?.user ? session?.user.name :  undefined,
    size: 128,
  }).toDataUriSync();
  const svg = avatar.toString();
  console.log(svg);
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
              <div className="user-account">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar style={{height: "40px", width: "40px"}}>
                      <AvatarImage src={svg}  />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
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
