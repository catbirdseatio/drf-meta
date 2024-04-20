import { Outlet } from "react-router-dom";
import Header from "./Header";
import FlashMessage from "./FlashMessage";
const Layout = () => (
  <div>
    <Header />
    <FlashMessage />
    <Outlet />
  </div>
);

export default Layout;
