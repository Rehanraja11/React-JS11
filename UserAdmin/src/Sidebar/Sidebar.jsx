import "./Sidebar.css";
import { Link } from "react-router-dom";
import { MdAssessment } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { FcMoneyTransfer } from "react-icons/fc";
import { TfiMoney } from "react-icons/tfi";
import Dashboard from "../Dashboard";


const Sidebar = () => { 
  return (
    <div className="sidebar">
      <ul>  
        <Link className="mb-4" to = "/dashboard"> <MdAssessment  className="mt-[3.2px]"/><span className="ml-2">USERS</span></Link>
        <Link className="mb-4" to = "/student"><PiStudentFill className="mt-[3.2px]" /><span className="ml-2">STUDENT</span></Link>
        <Link className="mb-4" to = "/teacher"><GiTeacher className="mt-[3.2px]"/><span className="ml-2">TEACHER</span></Link>
        <Link className="mb-4" to = "/subject"><IoBookSharp className="mt-[3.2px]" /><span className="ml-2">SUBJECT</span></Link>
        <Link className="mb-4" to = "/classes"><SiGoogleclassroom  className="mt-[3.2px]" /><span className="ml-2">CLASSES</span></Link>
        <Link className="mb-4" to = "/fees"><FcMoneyTransfer    className="mt-[3.2px]" /><span className="ml-2">FEES</span></Link>
      </ul>     
    </div>
  );
  };

export default Sidebar;



