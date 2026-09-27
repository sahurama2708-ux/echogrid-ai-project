import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login ya User ID create hone par user save karne ke liye
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('echogrid_user', JSON.stringify(userData));
  };

  // Logout karne ke liye
  const logout = () => {
    setUser(null);
    localStorage.removeItem('echogrid_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}