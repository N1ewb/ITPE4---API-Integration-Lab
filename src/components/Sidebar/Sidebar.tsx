import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <h2>Dashboard</h2>
      <div className="sidebar-links">
        <a href="/ValorantPage">Valorant</a>
        <a href="/GenshinPage">Genshin</a>
      </div>
    </div>
  );
};

export default Sidebar;
