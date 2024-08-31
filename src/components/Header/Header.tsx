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
      <div className="logo-container"></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="#">About Us</Link>
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
          <Link to="/">Home</Link>
          <Link to="#">About Us</Link>
          <Link to="#">Contact</Link>
          <Link to="/ValorantPage">Valorant</Link>
          <Link to="/GenshinPage">Genshin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
