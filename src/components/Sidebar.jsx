import React, { useState } from "react";
import "../styles/Sidebar.css";
import { FaHome, FaLuggageCart, FaPlane } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import {Link} from "react-router-dom"

function Sidebar() {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const values = [
    { id: 1, icon: <FaHome />, text: "Home", to:"/" },
    { id: 2, icon: <FaPlane />, text: "Past trips", to:"/visitedCountry" },
    { id: 3, icon: <FaHome />, text: "Map", to:"/visitedCountry"  },
    { id: 4, icon: <FiLogOut />, text: "Logout", to:"/visitedCountry"  },
  ];

  const selected = () => {
    console.log("clicked");
    setShow(!show);
  };

  return (
    <>
      <div className={show ? "navigation open" : "navigation"}>
        <div className="menutoggle" onClick={selected}></div>
        <ul className="ul"> 

        {values.map(val=>( <li onClick={()=>setActiveId(val.id)} className={activeId===val.id ? "list active" : "list"} key={val.id}>
        
        <Link to={val.to}>
              <span className="icon">{val.icon}</span>
              
              <span className="text">{val.text}</span>
              </Link>
          
          </li>))}
          </ul>
        {/* {values.map(val=>( <li onClick={()=>setActiveId(val.id)} className={activeId===val.id ? "list active" : "list"}>
            <a href="#">
              <span className="icon">{val.icon}</span>
              
              <span className="text">{val.text}</span>

            </a>
          </li>))}

        {/* <div className="ul">
          {values.map((val) => (
            <Nav.Link
              href="#overview"
              onClick={() => setActiveId(val.id)}
              className={activeId === val.id ? "list active" : "list"}
            >
              <span className="icon a">{val.icon}</span>{" "}
              <span className="text">{val.text}</span>
            </Nav.Link> */}
         
       
      </div>
    </>
  );
}

export default Sidebar;
