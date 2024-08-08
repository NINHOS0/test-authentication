import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface AuthProviderProps {
  children: React.ReactElement
}

type valueProps = {
  authToken: string | null
  login: (token: string) => void
  logout: () => void
  hasToken: () => boolean
}

const AuthContext = createContext<valueProps>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<null | string>(null);
  const navigate = useNavigate();

  const hasToken = () => {
    const token = Cookies.get("auth-token");
    if (!token) {
      setAuthToken(null);
      navigate("/", { replace: true });
      return false
    } else {
      setAuthToken(token)
      return true
    }
  }

  const login = async (token: string) => {
    Cookies.set("auth-token", token, {
      expires: 1,
    });
    setAuthToken(token);
    navigate("/users");
  };

  const logout = () => {
    Cookies.remove("auth-token");
    setAuthToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => {
      console.log("memo");
      
      const token = Cookies.get("auth-token");
      setAuthToken(token ?? null)
      
      return { hasToken, authToken, login, logout }
    },
    [authToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};