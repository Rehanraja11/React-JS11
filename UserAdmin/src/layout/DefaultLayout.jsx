import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar/Sidebar";


function DefaultLayout({ children }) {
  return (
    <div>
      <Header/>
      <div className="flex">
        <div className="w-64 mr-10">
          <Sidebar className="p-6" />
        </div>
        <div className=" overflow-x-auto ">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
