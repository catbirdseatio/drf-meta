import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAPI } from "./APIProvider";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const API = useAPI();
  const [user, setUser] = useState();

  // Utility function to retrieve logged in user information via /me endpoint
  const getUser = useCallback(async () => {
    const response = await API.get("/accounts/users/me/");
    setUser(response.status === 200 ? response.data : null);
  }, [API]);

  useEffect(() => {
    (async () => {
      if (API.isAuthenticated()) getUser();
      else {
        setUser(null);
      }
    })();
  }, [API, getUser]);

  const login = async (email, password) => {
    try {
      const result = await API.login(email, password);
      if (result) getUser();
      return result;
    } catch (error) {
      return error;
    }
  };

  const logout = () => {
    API.logout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ login, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
