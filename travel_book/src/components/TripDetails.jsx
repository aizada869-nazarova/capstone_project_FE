import React, {useEffect} from 'react'
import NavbarOfTrip from './NavbarOfTrip'
import {Container, Row, Col} from "react-bootstrap"
import {useParams} from "react-router-dom"
import Checklist from './Checklist'
const TripDetails=()=> {

  let { travelId } = useParams()
  console.log(travelId)
  const url = `http://localhost:3001/travels/${travelId}`;
  const token = localStorage.getItem("accessToken")

  const fetchTrips = async () => {
    try {
      
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
       
      } else {
        console.log("fetch failed on line 86");
      }
    } catch (error) {
      console.log("I am catch error from line 90");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);
  return (
    <>
    
    <Container>
      <Row>
        <Col><NavbarOfTrip/></Col>
        
      </Row>
      <Row>
        <Col xs={12} className="d-flex justify-content-center"><Checklist/></Col>
      </Row>
    </Container>
    </>
     
      
  )
}

export default TripDetails