import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen md:flex font-raleway max-w-screen-xl mx-auto">
      <button
        className="md:hidden fixed top-4 left-4 z-20 text-2xl"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-10 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 ml-0 md:ml-0 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
