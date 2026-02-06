import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMe = async () => {
      try {
        console.log("getting user...");
        
        const res = await api.get("/api/v1/auth/me", {
          withCredentials: true,
        });

        setUser(res.data.data);
      } catch (err) {
        console.log("error", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
