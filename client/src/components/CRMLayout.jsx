import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"
import Sidebar from "./Sidebar"

const CRMLayout = () => {
  // State to toggle sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <div className="bg-gray-100 poppins-regular">
      <div className="flex h-screen">
        {/* Sidebar with dynamic classes based on isSidebarOpen */}
        <Sidebar isOpen={isSidebarOpen} />
        {/* Main Content */}
        <div id="main" className={`flex-1 flex flex-col lg:w-full transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-0'}`}>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          {/* Render nested routes here */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default CRMLayout;