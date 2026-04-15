import React, { useContext } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { MdAssessment } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import Dashboard from "../Dashboard";
import { AuthContext } from "../Context/AuthContext";
import { IoIosLogOut } from "react-icons/io";


const Sidebar = () => {
  const {logout} = useContext(AuthContext)

  return (
    <div className="sidebar">
      <ul>  
        <Link className="mb-4" to = "/dashboard"> <MdAssessment  className="mt-[3.2px]"/><span className="ml-2">DASHBOARD</span></Link>
        <Link className="mb-4" to = "/student"><PiStudentFill className="mt-[3.2px]" /><span className="ml-2">STUDENT</span></Link>
        <Link className="mb-4" to = "/teacher"><GiTeacher className="mt-[3.2px]"/><span className="ml-2">TEACHER</span></Link>
        <Link className="mb-4" to = "/subject"><IoBookSharp className="mt-[3.2px]" /><span className="ml-2">SUBJECT</span></Link>
      </ul>


         <button className='logoutbtn' onClick={logout} style={{color:"white",marginTop:"460px", marginLeft:"158px"}}><IoIosLogOut /></button> 
     
    </div>
  );
};

export default Sidebar;


