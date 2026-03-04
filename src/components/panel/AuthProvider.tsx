import type { ReactNode } from "react";
import { AuthContext, useAuthState } from "@/hooks/use-auth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { state, login, logout } = useAuthState();

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
