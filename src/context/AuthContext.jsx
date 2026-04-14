import { createContext, useContext, useEffect, useState } from "react";
import { whoAmI, Logout } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const data = await whoAmI();

      if (!data.error) {
        setUser(data);
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function onLogout() {
    const data = await Logout();

    if (!data.error) {
      setUser(null);
    }

    return data;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}