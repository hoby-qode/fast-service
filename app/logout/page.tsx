'use client'
import useAuth from '@/src/hooks/useAuth'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const { isLogged, logout } = useAuth()
  const router = useRouter()
  console.log(isLogged);
  
  if (isLogged) { // Correction de la condition
    fetch('/api/logout')
      .then(res => {
        if (res.ok) {
          logout()
          router.push('/')
        } else {
          console.error('Failed to log out') // Ajout d'une gestion d'erreur en cas d'échec de la déconnexion
        }
      })
      .catch(error => {
        console.error('Error during logout:', error) // Ajout d'une gestion d'erreur en cas d'échec de la requête
      })
  } else {
    console.warn('User is not logged in') // Ajout d'un avertissement si l'utilisateur n'est pas connecté
  }
}

export default Logout
