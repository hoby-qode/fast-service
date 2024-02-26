import { PropsWithChildren, useMemo } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getToken } from 'next-auth/jwt'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
})

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const client = useMemo(() => {
    const authMiddleware = setContext(async (operation, { headers }) => {
      const { token } = await fetch('/api/auth/token').then(res => res.json())
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      }
    })

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
    })
  }, [getToken])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}