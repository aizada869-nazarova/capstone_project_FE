import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom"
import {Container, Row, Col, Button, Form, InputGroup, FormControl} from "react-bootstrap"
import SingleItinerary from './SingleItinerary';
import AddVisitPlace from './AddVisitPlace';

function AddItinerary() {
    let { travelId } = useParams()
  
    const url = `http://localhost:3001/itinerary`;
 
    
      const [itineraries, setItineraries] = useState([]);
      
      const [tripChanged, setTripChanged] = useState(0);
    
     
      const [ singleItinerary, setSingleItinerary,] = useState("");
      const [travel, setTravel]=useState(travelId)
     
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const plan = {
          itinerary: singleItinerary,
          travelId: travel
         
        };
        try {
          const token = localStorage.getItem("accessToken");
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(plan),
          }).then((response) => {
            console.log(response);
            if (response.ok) {
              fetchTrips();
              setTripChanged((count) => count + 1);
            } else {
              alert("fetch failed");
            }
          });
          console.log("enteredValue", plan);
        } catch (error) {
          
          console.error(error, "from catch");
        }
      };
    
      const fetchTrips = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await fetch(`${url}/${travelId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          });
          if (response.ok) {
            const newData = await response.json();
            console.log(newData);
            setItineraries(newData);
          } else {
            console.log("fetch failed on line 86");
          }
        } catch (error) {
          console.log("I am catch error from line 90");
        }
      };
    
      useEffect(() => {
        fetchTrips();
      }, [tripChanged]);
    
      return (
        <div >
          {/* className="profile-sub-section mt-4 single-list-item" */}
         <Container>
   <Form onSubmit={handleSubmit}>
   <Row>
              <Col xs={12} md={8}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">T</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Name of item"
                    aria-label="Name of item"
                    aria-describedby="Name of item"
                    name="nameOfItem"
                    value={singleItinerary}
                    onChange={(e) => setSingleItinerary(e.target.value)}
                  required
                  />
                </InputGroup>
              </Col>
              <Col xs={6} md={4}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>C</InputGroup.Text>
                  </InputGroup.Prepend>

                 
                </InputGroup>
              </Col>
              <Col xs="auto">
                <Button type="submit" className="mb-2" style={{background: "#ce9f11"}}>
                  Submit
                </Button>
              </Col>
            </Row>
   </Form>
 {/* </Container>

 

          <Container> */}
            {/* <Row> */}
              {itineraries&&
                itineraries.map(
                  ({ itinerary, _id: id }, i) => (
                    // <Col
                    //   xs={12}
                    //   md={3}
                    //   lg={4}
                    //   key={id}
                    //   className="d-flex justify-content-center"
                    // >
                      <SingleItinerary
                        index={i}
                        singleItinerary={itinerary}
                        id={id}
                       
                        tripChanged={tripChanged}
                        setTripChanged={() => setTripChanged((count) => count + 1)}
                      />
                    // </Col>
                  )
                )}
            {/* </Row> */}
            
          </Container>
          
    
</div>

  
  )
}

export default AddItinerary