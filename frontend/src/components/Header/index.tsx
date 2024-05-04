import { useState } from "react";
import { Divide as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import NavMenu from "../NavMenu";

import "./Header.css"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <nav>
        <h2>
          <Link to="/">DRF Meta</Link>
        </h2>
        <div className="menu">
          <NavMenu />
        </div>
        <div className="hamburger">
          <Hamburger toggled={isOpen} toggle={setIsOpen} size={25} />
        </div>
      </nav>
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {isOpen && <NavMenu />}
      </div>
    </>
  );
};

export default Header;
