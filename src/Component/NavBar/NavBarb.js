import React, { useState } from 'react';
import { BiHome } from "react-icons/bi";
import './navbar.css'
import { BsFillCalendarWeekFill } from "react-icons/bs"; 

import {
  FaBars,
  FaUserAlt,
  FaCommentAlt,
  FaUserFriends,
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const NavBarb = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    // {
    //   path: "",
    //   name: "Home",
    //   icon: <BiHome />
    // },
    {
      path: "/protocol",
      name: "Protocol",
      icon: <FaUserAlt />
      
    },
    {
      path: "/exerciset",
      name: "Exercise",
      icon: <BsFillCalendarWeekFill />
    },
    {
      path: "/assesments",
      name: "Assesment",
      icon: <FaCommentAlt />
    },
    {
      path: "/usermaster",
      name: "User ID",
      icon: <FaUserFriends />
    },
    
  ]
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Master</h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} className="cursor-pointer" />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeclassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  );
};

export default NavBarb;