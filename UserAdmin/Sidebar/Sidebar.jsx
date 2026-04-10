import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { MdAssessment } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import Dashboard from "../src/Dashboard";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>  
        <Link to = "/dashboard"> <MdAssessment  className="mt-[3.2px]"/><span className="ml-2">DASHBOARD</span></Link>
        <Link to = "/student"><PiStudentFill className="mt-[3.2px]" /><span className="ml-2">STUDENT</span></Link>
        <Link to = "/teacher"><GiTeacher className="mt-[3.2px]"/><span className="ml-2">TEACHER</span></Link>
        <Link to = "/subject"><IoBookSharp className="mt-[3.2px]" /><span className="ml-2">SUBJECT</span></Link>
      </ul>
    </div>
    
  );
};

export default Sidebar;


