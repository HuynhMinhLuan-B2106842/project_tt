"use client";
import { ReactNode, useState, useEffect } from "react";
import { authAPI } from "../lib/api";
import { User } from "./useAuth";


export function AuthProvider({ children }: { children: ReactNode; }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login(email, password);

      if (response.success && response.data) {
        if (response.data.token) {
          localStorage.setItem("auth-token", response.data.token);
        }
        setUser(response.data.user || response.data);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setUser(null);
    authAPI.logout();
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await authAPI.getCurrentUser();

      if (response.success && response.data) {
        setUser(response.data);
      } else {
        localStorage.removeItem("auth-token");
      }
    } catch (error) {
      console.error("Refresh user error:", error);
      localStorage.removeItem("auth-token");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider>value) = {}; {
    user,
      isLoading,
      isAuthenticated,
      login,
      logout,
      refreshUser,
        ;
  }
}
    >
  { children }
  < /AuthContext.Provider>/;
