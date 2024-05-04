import { Outlet } from "react-router-dom";
import Header from "../Header";
import FlashMessage from "../FlashMessage";


const Layout = () => (
  <div>
    <Header />
    <FlashMessage />
    <main>
      <Outlet />
    </main>
    <footer>
      <p>&copy; catbirdseat.io</p>
    </footer>
  </div>
);

export default Layout;
