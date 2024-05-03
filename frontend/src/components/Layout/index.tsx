import { Outlet } from "react-router-dom";
import Header from "../Header";
import FlashMessage from "../FlashMessage";

import styles from "./Layout.module.css";

const Layout = () => (
  <div className={styles.layout}>
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
