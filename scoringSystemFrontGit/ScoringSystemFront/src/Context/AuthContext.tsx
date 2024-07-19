import React, { createContext, useContext, useState } from 'react';
import AuthContextType from '../Interfaces/AuthContextType';

const AuthContext = createContext<AuthContextType>({
  decodedToken: "",
  setDecodedToken: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [decodedToken, setDecodedToken] = useState<any>("");

  return (
    <AuthContext.Provider value={{ decodedToken, setDecodedToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
