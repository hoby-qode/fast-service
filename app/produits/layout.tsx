'use client';
import HeaderTop from '@/src/features/headerTop'
import Navigator from '@/src/features/navigator'
import React from 'react'

import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="products-layout">
      <HeaderTop />
      <Navigator />
      {children}
      <Toaster />
    </main>
  )
}
