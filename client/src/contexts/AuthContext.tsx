// src/contexts/AuthContext.tsx

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode, ReactElement } from "react";
import axios from "axios";
import { STORAGE_KEY } from "../constants/AppConstant";

interface UserInfo {
  user_id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  signIn: (userInfo: UserInfo, token: string) => void;
  signOut: () => void;
  setUserInfo: (userInfo: UserInfo) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps): ReactElement => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Au montage, restaurer l’utilisateur + token depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { token: string; user: UserInfo };
        setToken(parsed.token);
        setUserInfo(parsed.user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const signIn = (user: UserInfo, jwt: string): void => {
    setToken(jwt);
    setUserInfo(user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: jwt, user }));
  };

  const signOut = (): void => {
    setToken(null);
    setUserInfo(null);
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem(STORAGE_KEY);
  };

  const isAuthenticated = Boolean(token);

  const contextValue: AuthContextType = {
    token,
    isAuthenticated,
    userInfo,
    signIn,
    signOut,
    setUserInfo,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

export { AuthContext, AuthContextProvider, useAuthContext };
