import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

import "./Global.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
