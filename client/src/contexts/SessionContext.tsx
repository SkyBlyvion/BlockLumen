import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import type { ReactNode, ReactElement } from "react";
import { STORAGE_KEY } from "../constants/AppConstant";

interface SessionContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

interface SessionContextProviderProps {
  children: ReactNode;
}

const SessionContextProvider = ({ children }: SessionContextProviderProps): ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { setUserInfo } = useAuthContext();

  const getUserInfo = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as {
          token: string;
          user: { user_id: number; username: string; email: string };
        };
        setUserInfo(parsed.user);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const valueContext: SessionContextType = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return <SessionContext.Provider value={valueContext}>{children}</SessionContext.Provider>;
};

const useSessionContext = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within a SessionContextProvider");
  }
  return context;
};

export { SessionContextProvider, useSessionContext, SessionContext };
