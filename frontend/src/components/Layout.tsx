import { Outlet } from "react-router-dom";
import Header from "./Header";
import FlashMessage from "./FlashMessage";
const Layout = () => (
  <>
    <Header />
    <FlashMessage />
    <Outlet />
  </>
);

export default Layout;
