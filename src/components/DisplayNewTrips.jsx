import React, { useState, useEffect } from "react";
import SingleTrip from "./SingleTrip";
import { Col, Row, Container } from "react-bootstrap";

function DisplayNewTrips() {
  const url = "https://personal-travel-book.herokuapp.com/travels";
  const [trips, setTrips] = useState([]);

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
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <Container>
      <Row>
        {trips.map((trip, i) => (
          <Col
            xs={12}
            md={4}
            key={trip._id}
            className="d-flex justify-content-center"
          >
            <SingleTrip data={trip} index={i} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DisplayNewTrips;
