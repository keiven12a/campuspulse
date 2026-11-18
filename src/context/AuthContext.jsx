import { useState } from 'react'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('campuspulse_user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('campuspulse_token')
  })

  const login = (userData, authToken) => {
    localStorage.setItem('campuspulse_user', JSON.stringify(userData))
    localStorage.setItem('campuspulse_token', authToken)

    setUser(userData)
    setToken(authToken)
  }

  const logout = () => {
    localStorage.removeItem('campuspulse_user')
    localStorage.removeItem('campuspulse_token')

    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}