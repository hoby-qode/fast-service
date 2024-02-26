'use client'
import React, { useEffect, useState } from 'react'
import { AuthContext } from './Mycontext'
import useAuth from '../hooks/useAuth'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({})
  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
        body: JSON.stringify({
          query: `
            query GetUserData {
              viewer {
                username
                email
                id
              }
            }
          `,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data?.data?.viewer || null)
        })
        .catch((error) => {
          console.error('An error occurred:', error)
        })
    }
  }, [user])
  const contextValue = {
    currentUser: user,
    setCurrentUser: setUser,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
