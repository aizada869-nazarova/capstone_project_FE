import React, { useState } from "react";
import NewTripForm from "./NewTripForm";
import "../styles/Sidebar.css";
import { Container, Row,Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import DisplayNewTrips from "./DisplayNewTrips";

function Home() {
  // const [show, setShow] = useState(false);
  // const selected = () => {
  //   console.log("clicked");
  //   setShow(!show);
  // };


  return (
   <>
   
   <Sidebar/>
   <Container>
     <Row>
       <div className="mx-auto">
       <NewTripForm/>
       <DisplayNewTrips/>
       </div>
     </Row>
   </Container>
   </>
  );
}

export default Home;
