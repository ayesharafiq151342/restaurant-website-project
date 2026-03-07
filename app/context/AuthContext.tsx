"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the full user type
interface UserType {
  _id: string;
  email: string;
  name?: string; // optional, because some users may not have a name
  role?: "user" | "admin";
}

interface AuthContextType {
  user: UserType | null;
  login: (user: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const login = (userData: UserType) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
