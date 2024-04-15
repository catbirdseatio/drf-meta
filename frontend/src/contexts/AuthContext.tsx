import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { IUser, AuthContextType } from "../@types/auth";
import LoginService from "../services/AuthServices/LoginService";
import { isAuthenticated, logout as utilsLogout } from "../utils";
import UserService from "../services/AuthServices/UserService";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const getUser = useCallback(async () => {
    try {
      const userResponse = await UserService.get();
      setUser(userResponse);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (isAuthenticated()) {
        await getUser();
      } else {
        setUser(undefined);
      }
    })();
  }, [getUser]);

  const login = async (email: string, password: string) => {
    try {
      const { access, refresh } = await LoginService.login({
        email: email!,
        password: password!,
      });
      localStorage.setItem("access", access!);
      localStorage.setItem("refresh", refresh!);
      await getUser();
    } catch (error) {
      throw Error("Login Failed");
    }
  };

  const logout = () => {
    utilsLogout();
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
