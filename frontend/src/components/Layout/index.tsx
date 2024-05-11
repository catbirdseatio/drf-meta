import { Outlet } from "react-router-dom";
import Header from "../Header";
import FlashMessage from "../FlashMessage";

import styles from "./Layout.module.css"

const Layout = () => (
  <div className={styles.main}>
    <Header />
    <FlashMessage />
    <main>
      <Outlet />
    </main>
    <footer className={styles.footer}>
      <p>&copy; catbirdseat.io</p>
    </footer>
  </div>
);

export default Layout;
