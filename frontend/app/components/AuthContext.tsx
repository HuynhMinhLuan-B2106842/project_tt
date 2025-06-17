'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { dangNhap } from '@/services/taikhoan.service'
import { AxiosError } from 'axios'

interface AuthContextType {
  token: string | null
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) setToken(savedToken)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const res = await dangNhap(username, password)
      localStorage.setItem('token', res.token)
      setToken(res.token)
      return { success: true, message: "" };
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>
      return {
        success: false,
        message: axiosError.response?.data?.error || 'Lỗi đăng nhập',
      }
    }
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return context
}
