import HeaderTop from '@/src/features/headerTop'
import Navigator from '@/src/features/navigator'
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="tunnel-commande-layout">
        <HeaderTop />
        <Navigator />
        {children}
      </main>
    </>
  )
}
