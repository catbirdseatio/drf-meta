import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import APIProvider from "./contexts/APIProvider";
import UserProvider from "./contexts/UserProvider";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Header from "./components/Header";
import FlashProvider from "./contexts/FlashProvider";
import FlashMessage from "./components/FlashMessage";
import RegistrationPage from "./pages/RegistrationPage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <FlashProvider>
        <APIProvider>
          <UserProvider>
            <Header />
            <FlashMessage />
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route index element={<HomePage />} />
              </Route>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserProvider>
        </APIProvider>
      </FlashProvider>
    </BrowserRouter>
  );
};

export default App;
