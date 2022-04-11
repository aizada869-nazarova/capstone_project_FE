import React, { useState, useEffect } from "react";
import SingleTrip from "./SingleTrip";
import {Col, Row, Container} from "react-bootstrap"

function DisplayNewTrips() {
  const url = "http://localhost:3001/travels"
  const [trips, setTrips]=useState([])

  const fetchTrips = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      const newData = await response.json();
      console.log(newData);
      setTrips(newData);
    }
  }

  useEffect(() => {
    fetchTrips();
  }, []);
  
  return (
<Container>
  <Row>
     {trips.map(trip=>(
       <Col xs={12} key={trip._id}>
         <SingleTrip data={trip}  />
       </Col>
     ))

     }

    
  </Row>
</Container>
   
  );
}

export default DisplayNewTrips;
