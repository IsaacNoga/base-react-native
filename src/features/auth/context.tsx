import { authStorage } from "@/lib/auth/storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { logout as apiLogout } from "./api";
import { useLogin } from "./mutations";
import type { Login, User } from "./schemas";

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login(creds: Login): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const loginMutation = useLogin();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const login = async (creds: Login) => {
    const res = await loginMutation.mutateAsync(creds);
    const user = res.detalle;
    await authStorage.setSession(user.token, user);
    setUser(user);
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch {}
    await authStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    authStorage.getSession().then((session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, isAuthenticated: !!user, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
