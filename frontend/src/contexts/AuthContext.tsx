import { createContext, FC, ReactNode, useCallback, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import useQueryClient hook
import { AuthContextType } from "../@types/auth";
import LoginService from "../services/AuthServices/LoginService";
import { logout as utilsLogout, isAuthenticated } from "../utils";
import UserService from "../services/AuthServices/UserService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  // Remove the 'user' state

  const getUser = useCallback(async () => {
    try {
      const userResponse = await UserService.get();
      return userResponse;
    } catch (error) {
      throw new Error("Error fetching user");
    }
  }, []);

  // Refactor the useEffect to useQuery for fetching user data
  const query = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000,
    enabled: isAuthenticated(),
  });

  const login = async (email: string, password: string) => {
    try {
      const { access, refresh } = await LoginService.login({
        email: email!,
        password: password!,
      });
      localStorage.setItem("access", access!);
      localStorage.setItem("refresh", refresh!);
      // Invalidate the user query cache to trigger a refetch
      
      query.refetch();
    } catch (error) {
      throw new Error("Login Failed");
    }
  };

  const logout = async () => {
    utilsLogout();
    navigate("/login")
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user: query.data, isLoading: query.isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
