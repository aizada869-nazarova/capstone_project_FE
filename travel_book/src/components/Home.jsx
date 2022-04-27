import React, { useState } from "react";
import NewTripForm from "./NewTripForm";
import "../styles/Sidebar.css";
import { Container, Row,Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import DisplayNewTrips from "./DisplayNewTrips";
import AddVisitedCountry from "./AddVisitedCountry";

function Home() {



  return (
   <>
   
   <Sidebar/>
   <Container>
     <Row className="justify-content-md-center d-flex">
      
       <div className="mx-auto">
       <NewTripForm/>
       {/* <AddVisitedCountry/> */}
       {/* <DisplayNewTrips/> */}
       </div>
       
     </Row>
   </Container>
   </>
  );
}

export default Home;
