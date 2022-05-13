import React, { useState, useEffect } from "react";
import { FcCalendar } from "react-icons/fc";
import IconButton from "@material-ui/core/IconButton";
import "../styles/Card.css";
import "../styles/Home.css";
import AddIcon from "@material-ui/icons/Add";

import {
  Container,
  Form,
  Button,
  Col,
  Row,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import EditVisitedCountry from "./EditVisitedCountry";

const AddVisitedCountry = () => {
  const url = "http://localhost:3001/visitedCountry";

  const [trips, setTrips] = useState([]);
  const [addTrip, setAddTrip] = useState(false);
  const [tripChanged, setTripChanged] = useState(0);

  const closeAddTrip = () => setAddTrip(false);
  const showAddTrip = () => setAddTrip(true);

  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState("");

  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trip = {
      countryName: countryName,
      cityName: cityName,
      date: date,
      duration: duration || null,

      userId: "6259d0ef3c13cbc5bbdb7caa",
    };
    try {
      const token = localStorage.getItem("accessToken");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(trip),
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          fetchTrips();
          setTripChanged((count) => count + 1);
        } else {
          alert("fetch failed");
        }
      });
      console.log("enteredValue", trip);
    } catch (error) {
      // if (response.ok) {
      //   const data = response.json();
      //   fetchExperiences();
      //   setExperienceChanged((count) => count + 1);
      // } else {
      //   console.error("fetch failed");
      // }
      console.error(error, "from catch");
    }
  };

  const fetchTrips = async () => {
    try {
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
      } else {
        console.log("fetch failed on line 86");
      }
    } catch (error) {
      console.log("I am catch error from line 90", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [tripChanged]);

  return (
    <Container fluid className="home">
      <div className="new-trip-top_margin pt-3">
        <Row className="justify-content-center mb-3 ">
          <Col xs={12} md={8} lg={6}>
            {" "}
            <h1 className="pl-2">Visited Countries: {trips.length} </h1>
          </Col>
          <Col xs={8} md={4} lg={3} className="d-flex align-items-center">
            <Button
              variant="warning"
              className="add_trips rounded-pill"
              onClick={showAddTrip}
            >
              <strong>Add</strong>
            </Button>
          </Col>
        </Row>

        {/* <Container> */}
        <Row
          className="d-flex justify-content-center"
          style={{ rowGap: "10px" }}
        >
          {trips &&
            trips.map(
              ({ cityName, _id: id, countryName, date, duration }, i) => (
                <Col
                  xs={8}
                  md={4}
                  lg={3}
                  key={id}
                  className="d-flex justify-content-center"
                >
                  <EditVisitedCountry
                    index={i}
                    cityName={cityName}
                    id={id}
                    countryName={countryName}
                    date={date}
                    duration={duration}
                    setTripChanged={() => setTripChanged((count) => count + 1)}
                  />
                </Col>
              )
            )}
        </Row>
        {/* </Container> */}

        <Modal show={addTrip} onHide={closeAddTrip}>
          <Modal.Header closeButton>
            <Modal.Title className="font-weight-normal">
              Add a visited country{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Row className="justify-content-between">
                <Col xs="auto">
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    City
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="City"
                    type="text"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    required
                  />
                </Col>
                <Col xs="auto">
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Country
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Country"
                    type="text"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                    required
                  />
                </Col>
              </Form.Row>

              <Form.Row className="justify-content-between">
                <Col xs="auto">
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Date
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    number
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Duration"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </Col>

                <Col xs="auto">
                  <Button
                    type="submit"
                    className="mb-2"
                    variant="warning"
                    onClick={closeAddTrip}
                  >
                    Submit
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
};

export default AddVisitedCountry;
