import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import "../styles/NavbarHome.css";

function NavbarHome() {
  const history = useNavigate();
  const logout = () => {
    localStorage.clear();
    history("/");
  };

  return (
    <Navbar
      className="nav_bg"
      fixed="top"
      collapseOnSelect
      expand="lg"
      variant="dark"
    >
      <Navbar.Brand href="#home">Travel-Book</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={`/`}>Home</Nav.Link>
          <Nav.Link href={`/travels`}>Coming trips</Nav.Link>
          <Nav.Link href={`/visitedCountry`}>Past trips</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link eventKey={2}>
            {/* <IconButton>
              <ExitToAppIcon />
            </IconButton> */}
            <Button
              variant="outline-light"
              style={{ border: "none" }}
              id="border"
              onClick={logout}
            >
              <FiLogOut />
              <span> Log out</span>
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarHome;
