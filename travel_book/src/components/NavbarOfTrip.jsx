import React from 'react'
import {Navbar, Nav} from "react-bootstrap"
import "../styles/NavbarOfTrip.css"
import { FaGlobeEurope, FaLuggageCart } from "react-icons/fa";
import { BsCheck2Square, BsCardChecklist  } from "react-icons/bs"


function NavbarOfTrip() {
  

  
  return (
    <>
     <Navbar  className='nav_bg nav_text '>
    
    <Nav className='icon' >
      <Nav.Link href="#overview"><FaGlobeEurope className='icon' /> Overview</Nav.Link>
      <Nav.Link href="#checklist"><BsCheck2Square />  Checklist</Nav.Link>
      <Nav.Link href="#packinglist"><FaLuggageCart /> Packing Lists</Nav.Link>
      <Nav.Link href="#itinererary"><BsCardChecklist  /> Itinererary</Nav.Link>
    </Nav>
  </Navbar>
    </>
  )
}

export default NavbarOfTrip