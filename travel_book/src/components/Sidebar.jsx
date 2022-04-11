import React, {useState}from 'react'
import "../styles/Sidebar.css";
import { FaHome, FaLuggageCart, FaPlane } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
function Sidebar() {
    const [show, setShow] = useState(false);
    const [activeIndex, setActiveIndex]= useState(false)

    const selected = () => {
      console.log("clicked");
      setShow(!show);}

     const handleClick = (index) =>{ 
      setActiveIndex(!activeIndex)
    console.log("clicked")
    }



  return (
    <>
      <div
        className={show ? "navigation open" : "navigation"}
        
      >
        <div className="menutoggle" onClick={selected}></div>
        <ul className="ul">
          <li className={activeIndex ? "list active" : "list"} index={0}  onClick={ handleClick}>
            <a href="#">
              <span className="icon"><FaHome/></span>
              
              <span className="text">Home</span>

            </a>
          </li>
          <li className={activeIndex ? "list active" : "list"} index={1} isActive={activeIndex===1} onClick={ handleClick}>
            <a href="#">
              <span className="icon"><FaLuggageCart/></span>
              
              <span className="text">Packing</span>

            </a>
          </li> <li className="list" tabIndex={2} isActive={activeIndex===2} onClick={ handleClick}>
            <a href="#">
              <span className="icon"> <FaPlane/></span>
             
              <span className="text">Visited countries</span>

            </a>
          </li> <li className="list" tabIndex={3} isActive={activeIndex===3} onClick={ handleClick}>
            <a href="#">
              <span className="icon"><FiLogOut/></span>
              
              <span className="text">Logout</span>

            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar