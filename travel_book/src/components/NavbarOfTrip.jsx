import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../styles/NavbarOfTrip.css";
import { FaGlobeEurope, FaLuggageCart } from "react-icons/fa";
import {
  BsCheck2Square,
  BsCardChecklist,
  BsCalendarWeek,
} from "react-icons/bs";
import { useParams } from "react-router-dom";
import AddItinerary from "./AddItinerary";

function NavbarOfTrip() {
  let { travelId } = useParams();

  return (
    <>
      <Navbar
        className="nav_bg nav_text text_color "
        collapseOnSelect
        expand="lg"
        variant="dark"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="nav_text" id="responsive-navbar-nav">
          <Nav className="icon">
            <Nav.Link href={`/travels`}>
              {" "}
              <BsCalendarWeek /> Trip Planner
            </Nav.Link>
            <Nav.Link href={`/travels/${travelId}`}>
              {" "}
              <FaGlobeEurope /> Overview
            </Nav.Link>
            <Nav.Link href={`/travels/${travelId}/checklist`}>
              <BsCheck2Square /> Checklist
            </Nav.Link>
            <Nav.Link href={`/travels/${travelId}/pakinglist`}>
              <FaLuggageCart /> Packing List{" "}
            </Nav.Link>
            <Nav.Link href={`/itinerary/${travelId}`}>
              <BsCardChecklist /> Itinererary
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavbarOfTrip;
