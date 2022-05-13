import React, { useState } from "react";
import NewTripForm from "./NewTripForm";
// import "../styles/Sidebar.css";
import "../styles/Home.css";
import { Container, Row,Col, Navbar, Button} from "react-bootstrap";
import Sidebar from "./Sidebar";
import DisplayNewTrips from "./DisplayNewTrips";
import AddVisitedCountry from "./AddVisitedCountry";
import NavbarHome from "./NavbarHome";



const Home=() => {



  return (
   <>
    <Container fluid className="home d-flex" >
  
   <NavbarHome />
  
   <Container>
   <NewTripForm/>
 
   </Container>
   
   </Container>

   </>
  );
}

export default Home;
