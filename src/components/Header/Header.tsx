import "./Header.css";

const Header = () => {
  return (
    <nav>
      <div className="logo-container"></div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
      </div>
    </nav>
  );
};

export default Header;
