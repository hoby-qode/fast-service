"use client";
import { SessionProvider } from 'next-auth/react'
import { ApolloProviderWrapper } from './apollo-provider-wrapper';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
function Provider({ children }: Props){
  return (
    <SessionProvider>
      {/* <ApolloProviderWrapper> */}
        {children}
      {/* </ApolloProviderWrapper> */}
    </SessionProvider>
  )
}

export default Provider;
