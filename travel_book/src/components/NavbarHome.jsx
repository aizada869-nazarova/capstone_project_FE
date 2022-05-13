import React from 'react'
import {Navbar, Nav} from "react-bootstrap"
import { FiLogOut } from "react-icons/fi";

function NavbarHome() {
  return (
    

<Navbar className='nav_bg' fixed="top" collapseOnSelect expand="lg" variant="dark">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href={`/`}>Home</Nav.Link>
      <Nav.Link href={`/travels`}>Coming trips</Nav.Link>
      <Nav.Link href={`/visitedCountry`}>Past trips</Nav.Link>
      
    </Nav>
    <Nav>
      
      <Nav.Link eventKey={2} href={`/logout`}>
      <FiLogOut /> Log out
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  )
}

export default NavbarHome

