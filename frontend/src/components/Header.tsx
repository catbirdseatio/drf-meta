import { useState } from "react";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="col-span-12 h-[3.75rem] bg-green-400 px-4 flex justify-between items-center space-around">
        <h2 className="text-2xl">
          <Link to="/">DRF Meta</Link>
        </h2>
        <div className="hidden justify-between md:flex">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
      </nav>
      <div className="col-span-12 md:hidden">
      {isOpen && <NavLinks isMobile={true} />}
      </div>
    </>
  );
};

export default Header;
