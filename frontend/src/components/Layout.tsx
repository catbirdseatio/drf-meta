import { Outlet } from "react-router-dom";
import Header from "./Header";
import FlashMessage from "./FlashMessage";
const Layout = () => (
  <div className="grid w-full h-100 bg-gradient-to-r from-blue-200 to-sky-500">
    <Header />
    <FlashMessage />
    <main className="flex col-span-12 h-[calc(100vh-3.75rem)] justify-center items-center bg-gradient-to-br from-#FF5733 to-#DAF7A6">
      <Outlet />
    </main>
  </div>
);

export default Layout;
