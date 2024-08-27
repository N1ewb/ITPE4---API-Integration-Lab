import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav>
      <div className="logo-container"></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="#">About Us</Link>
        <Link to="#">Contact</Link>
      </div>
    </nav>
  );
};

export default Header;
