'use client'
import { SessionProvider } from 'next-auth/react'
import React, {  PropsWithChildren } from 'react'

const Provider = ({ children }: PropsWithChildren) => {
  return (
  <SessionProvider>
    {children}
  </SessionProvider>
  )
}

export default Provider