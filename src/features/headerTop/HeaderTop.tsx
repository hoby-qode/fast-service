'use client'
import React, { useContext, useEffect, useState, useRef } from 'react'
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
import BtnIcon from '@/components/btnIcon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings } from 'lucide-react'
 
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
  const header = useRef(null)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        // Scrolling down
        header.current.classList.add('scrolled-down');
      } else {
        // At the top
        header.current.classList.remove('scrolled-down');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  })
  return (
    <header className={styles.header} ref={header}>
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
                    {session?.user ? (
                      <div className="menu-icon">
                        <Avatar style={{height: "40px", width: "40px"}}>
                          <AvatarImage src={svg}  />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                    ) : (
                      <BtnIcon icon={<IoLogInOutline style={{width: '23px',height: '23px',position: 'relative',right: '2px'}}/>}
                      style="rounded"
                      bgColor="secondary"
                      color="primary" onClick={() => signIn()} />
                    )} 
                  </DropdownMenuTrigger>
                  {session?.user ? <DropdownMenuContent className="user-account-container">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href="#" className="menu-item">
                          <div className="menu-icon">
                            <Avatar style={{height: "40px", width: "40px"}}>
                              <AvatarImage src={svg}  />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <strong>{session?.user?.name}</strong>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href="#" onClick={() => signOut()} className="menu-item">
                          <div className="menu-icon">
                            <Settings />
                          </div>
                          <strong>
                            Paramètres et confidentialité
                          </strong>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href="#" onClick={() => signOut()} className="menu-item">
                          <div className="menu-icon">
                            <LogOut />
                          </div>
                          <strong>
                            Déconnexion
                          </strong>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent> : ''}
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
