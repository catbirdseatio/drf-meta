import { Outlet } from "react-router-dom";
import Header from "./Header";
import FlashMessage from "./FlashMessage";
const Layout = () => (
  <div className="grid w-full h-100 bg-red-300">
    <Header />
    <FlashMessage />
    <main className="flex col-span-12 h-[calc(100vh-3.75rem)] justify-center items-center border-solid border-4 border-green-600">
      <Outlet />
    </main>
  </div>
);

export default Layout;
