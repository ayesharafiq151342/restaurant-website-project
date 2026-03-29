"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: UserType | null;
  login: (userData: UserType) => void;
  logout: () => void;
  isAdmin: boolean;
  isUser: boolean;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Load user from backend
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/auth/me", { withCredentials: true });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData: UserType) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch {}
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};