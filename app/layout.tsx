import { Metadata } from 'next'
import React from 'react'
import FontFamily from './fontFamily'
import Theme from '@/src/theme/theme'
import '@/styles/app.css'
import Provider from './next-auth/Provider'

export const metadata: Metadata = {
  title: 'UIX Dev',
  description: 'Description de la page',
  manifest: "/manifest.json"
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html>
      <FontFamily />
      <body>
        <Theme>
          <Provider>
            {children}
            {modal}
            <div id="modal-root" />
          </Provider>
        </Theme>
      </body>
    </html>
  )
}
