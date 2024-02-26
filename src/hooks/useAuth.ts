import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/Mycontext"
import { getCookie, setCookie } from "cookies-next"

const useAuth = () => {
    const [isLogged, setIsLogged]   = useState(false)
    const [jwt, setJwt]             = useState('')
    const [loading, setLoading]     = useState(true)
    const [loginError, setLoginError] = useState(null)
    const {currentUser, setCurrentUser} = useContext(AuthContext)
    useEffect(() => {
        const storedToken = localStorage.getItem('refreshToken')
        
        if (storedToken) {
          setJwt(storedToken)
          setLoading(false) 
          setIsLogged(true)
        } else {
          setLoading(false)
        }
    }, []) // Only run this effect once, on component mount

    /* On met connecter l'utilisateur si on arrive a récupérer son Token */
    useEffect(() => {
      // Check if JWT token is set
      if (jwt) {
        fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
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
          setCurrentUser(data?.data?.viewer || null)
          setIsLogged(true)
          setCookie('auth', JSON.stringify(data?.data?.viewer) || null)
        })
        .catch((error) => {
          console.error('An error occurred:', error)
        })
      }
    }, [jwt])

    const logout = () => {
        // Remove JWT token from localStorage
        localStorage.removeItem('refreshToken')
        setJwt('')
        setIsLogged(false)
    }

    return {
        currentUser,
        setCurrentUser,
        isLogged,
        setJwt,
        setIsLogged,
        logout,
        loading,
        loginError
    }
}
export default useAuth