'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'

const Theme = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme='light' forcedTheme='light'>
      {children}
    </ThemeProvider>
  )
}

export default Theme
