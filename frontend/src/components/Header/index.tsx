import { useState } from "react";
import { Divide as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import NavLinks from "../NavLinks";

import styles from "./Header.module.css"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className={styles.nav}>
        <h2>
          <Link to="/">DRF Meta</Link>
        </h2>
        <div className={styles.navLinks}>
          <NavLinks />
        </div>
        <div className={styles.hamburger}>
          <Hamburger toggled={isOpen} toggle={setIsOpen} size={25} />
        </div>
      </nav>
      <div className={styles.mobileNavLinks}>
        {isOpen && <NavLinks />}
      </div>
    </>
  );
};

export default Header;
