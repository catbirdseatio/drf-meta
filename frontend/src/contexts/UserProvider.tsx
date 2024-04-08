import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useAPI } from "./APIProvider";

interface User {
  email: string;
  id: number;
}

interface UserContextType {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const API = useAPI();
  const [user, setUser] = useState<User | undefined>();

  // Utility function to retrieve logged in user information via /me endpoint
  const getUser = useCallback(async () => {
    try {
      const response = await API.get("/accounts/users/me/");
      setUser(response.status === 200 ? response.data : undefined);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [API]);

  useEffect(() => {
    (async () => {
      if (API.isAuthenticated()) {
        await getUser();
      } else {
        setUser(undefined);
      }
    })();
  }, [API, getUser]);

  const login = async (email: string, password: string) => {
    try {
      const result = await API.login(email, password);
      if (result) {
        await getUser();
      }
      return result;
    } catch (error) {
      console.error("Login error:", error);
      return error;
    }
  };

  const logout = () => {
    API.logout();
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ login, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
