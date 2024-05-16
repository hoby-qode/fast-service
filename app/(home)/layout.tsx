'use client'
import { Toaster } from '@/components/ui/toaster'
import HeaderTop from '@/src/features/headerTop'
import Navigator from '@/src/features/navigator'
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="home-layout">
      <HeaderTop />
      <Navigator />
      {children}
      <Toaster />
    </main>
  )
}
