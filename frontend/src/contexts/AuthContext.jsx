import { createContext, useContext, useEffect, useState } from "react";
import { CsrfContext } from "./CsrfTokenContext";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { getCsrfToken } = useContext(CsrfContext);

  const controller = new AbortController();
  const signal = controller.signal;

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/check-auth/", {
        signal: signal,
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Failed to check authentication status");
      }
      const data = await response.json();
      setIsLoggedIn(data.isAuthenticated);
      return data.isAuthenticated;
    } catch (e) {
      console.error("Error checking auth status", e);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-CSRFToken": getCsrfToken(),
          signal: signal,
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }
      const authRes = await checkAuth();
      return authRes;
    } catch (e) {
      console.error("Error logging in", e);
    }
  };

  const register = async (credentials) => {
    try {
      const response = await fetch("/api/register/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-CSRFToken": getCsrfToken(),
          signal: signal,
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }
      return true;
    } catch (e) {
      console.error("Error registering user", e);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/logout/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-CSRFToken": getCsrfToken(),
          signal: signal,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }
      await checkAuth();
    } catch (e) {
      console.error("Error logging in", e);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider as default };
