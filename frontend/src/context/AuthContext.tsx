'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { authAPI } from '@/lib/api'

export type User = {
  id: number
  name: string
  email: string
  role: 'student' | 'teacher'
  avatar?: string
  notifications?: number
  token?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null

    if (token && userData) {
      try {
        const parsed = JSON.parse(userData)
        setUser({ ...parsed, token })
      } catch (error) {
        console.error('Error parsing user data:', error)
        logout()
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string, role: string) => {
    try {
      setLoading(true)
      const response = await authAPI.login(email, password)
      localStorage.setItem('token', response.access_token)
      const userData: User = {
        id: 0,
        name: email.split('@')[0],
        email,
        role: role as 'student' | 'teacher',
        token: response.access_token,
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

