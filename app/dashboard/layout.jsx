import React from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";

const Dashboardlayout = ({ children }) => {
  return (
    <div>
      <div className=" md:w-64 fixed h-screen ">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
};

export default Dashboardlayout;
