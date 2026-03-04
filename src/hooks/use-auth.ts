import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { api } from "@/lib/api";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useAuthState(): {
  state: AuthState;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
} {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const username = localStorage.getItem("admin_username");
    if (token && username) {
      setState({ isAuthenticated: true, username, loading: false });
    } else {
      setState({ isAuthenticated: false, username: null, loading: false });
    }
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      const res = await api.post<{ token: string; username: string }>(
        "/api/auth/login",
        { username, password },
      );
      localStorage.setItem("admin_token", res.token);
      localStorage.setItem("admin_username", res.username);
      setState({ isAuthenticated: true, username: res.username, loading: false });
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    setState({ isAuthenticated: false, username: null, loading: false });
  }, []);

  return { state, login, logout };
}
