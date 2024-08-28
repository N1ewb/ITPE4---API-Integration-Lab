import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <h2>Dashboard</h2>
      <div className="sidebar-links">
        <Link to="/ValorantPage">Valorant</Link>
        <Link to="/GenshinPage">Genshin</Link>
      </div>
    </div>
  );
};

export default Sidebar;
