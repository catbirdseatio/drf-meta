import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import AuthProvider from "./contexts/AuthContext";
import FlashProvider from "./contexts/FlashContext";
import Layout from "./components/Layout";


const App = () => {
  return (
    <BrowserRouter>
      <FlashProvider>
        <AuthProvider>
          <Routes>
            // All routes in App will have the same layout
            <Route path="/" element={<Layout />}>
              <Route element={<PrivateRoute />}>
                <Route index element={<HomePage />} />
              </Route>
              <Route element={<PublicRoute />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegistrationPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </FlashProvider>
    </BrowserRouter>
  );
};

export default App;
