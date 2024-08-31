import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

const Header = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleDropdown = () => {
    setIsClicked(!isClicked);
  };

  return (
    <nav>
      <div className="logo-container">
        <Link to="/">
          <h1>
            ITPE Lab <img src="/flask.png" alt="flask-icon" />
          </h1>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="#">About Page</Link>
        <Link to="#">Contact</Link>
      </div>
      <div className="nav-menu">
        <img
          onClick={handleDropdown}
          src="/menu.png"
          alt="menu"
          className="menu-icon"
        />
        <div className={`dropdown ${isClicked ? "show" : "hide"}`}>
          <Link onClick={handleDropdown} to="/">
            Home
          </Link>
          <Link onClick={handleDropdown} to="#">
            About Page
          </Link>
          <Link onClick={handleDropdown} to="#">
            Contact
          </Link>
          <Link onClick={handleDropdown} to="/ValorantPage">
            Valorant API
          </Link>
          <Link onClick={handleDropdown} to="/GenshinPage">
            Genshin API
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
