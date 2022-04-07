import React, {useState}from 'react'
import "../styles/Sidebar.css";
function Sidebar() {
    const [show, setShow] = useState(false);
    const selected = () => {
      console.log("clicked");
      setShow(!show);}
  return (
    <>
      <div
        className={show ? "navigation open" : "navigation"}
        onClick={selected}
      >
        <div className="menutoggle"></div>
        <ul className="ul">
          <li className="list">
            <a href="#">
              <span className="icon"></span>
              <span className="text">Home</span>

            </a>
          </li>
          <li className="list">
            <a href="#">
              <span className="icon"></span>
              <span className="text">Packing</span>

            </a>
          </li> <li className="list">
            <a href="#">
              <span className="icon"></span>
              <span className="text">Home</span>

            </a>
          </li> <li className="list">
            <a href="#">
              <span className="icon"></span>
              <span className="text">Logout</span>

            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar