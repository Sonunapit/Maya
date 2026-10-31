import { createContext, useCallback, useState } from "react";
import { loginRequest, registerRequest, logoutRequest } from "../services/auth.service.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));

  const save = (u, token) => {
    localStorage.setItem("user", JSON.stringify(u));
    if (token) localStorage.setItem("token", token);
    setUser(u);
  };

  const login = async (email, password, extra = {}) => {
    const data = await loginRequest(email, password);
    save({ email, ...data.user, ...extra }, data.token);
  };

  const register = async ({ email, firstName, lastName, password }) => {
    await registerRequest({ email, firstName, lastName, password });
    await login(email, password, { fullName: { firstName, lastName } });
  };

  const logout = useCallback(async () => {
    try {
      await logoutRequest(); // backend cookie clear
    } catch {
      /* fail ho to bhi local logout karna hai */
    }
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  // profile edit abhi sirf browser me save hota hai (backend me profile route nahi hai)
  const updateUser = (patch) => {
    const next = { ...user, ...patch };
    localStorage.setItem("user", JSON.stringify(next));
    setUser(next);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}