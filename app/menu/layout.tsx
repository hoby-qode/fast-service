import Navigator from '@/src/features/navigator'
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="menu-layout">
        {children}
      </main>
    </>
  )
}
