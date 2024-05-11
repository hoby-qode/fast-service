import HeaderTop from '@/src/features/headerTop'
import Navigator from '@/src/features/navigator'
import React from 'react'

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal?: React.ReactNode | undefined
}) {
  return (
    <main className="search-layout">
      <HeaderTop />
      <Navigator />
      {children}
      {modal}
      <div id="modal-root" />
    </main>
  )
}
