import { useState, createContext, ReactNode } from "react";
import { validateLogin } from "../services/auth";

interface AuthContextType {
  isLogged: boolean;
  name?: string;
  login: (email: string, password: string) => void;
  logout: () => void;
  avatarUri?: string;
}

export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  login: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState<string | undefined>(undefined);
  const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);

  function login(email: string, password: string) {
    const userFound = validateLogin(email, password);
    if (userFound) {
      setIsLogged(true);
      setName(userFound.name);
      setAvatarUri(userFound.avatarUri);
    }
  }

  function logout() {
    setIsLogged(false);
    setName(undefined);
    setAvatarUri(undefined);
  }

  return (
    <AuthContext.Provider value={{ isLogged, name, avatarUri, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
