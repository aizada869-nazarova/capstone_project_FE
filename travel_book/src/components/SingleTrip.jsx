import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  InputGroup,
  Col,
  FormControl,
} from "react-bootstrap";
import { format, parseISO } from "date-fns";
import "../styles/Card.css";
import { useNavigate } from "react-router-dom";

import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";

import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

const SingleTrip = ({
  id,
  fromCityName,
  fromCountryName,
  travelWith,
  departureDate,
  departureTime,
  transport,
  toCityName,
  toCountryName,
  arrivalDate,
  arrivalTime,
  tripChanged,
  setTripChanged,
  index,
}) => {
  const url = "http://localhost:3001/travels";
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [selected, setSelected] = useState(false);
  const [trips, setTrips] = useState(null);
  const [editTrip, setEditTrip] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const [newFromCityName, setNewFromCityName] = useState("");
  const [newFromCountryName, setNewFromCountryName] = useState("");
  const [newToCityName, setNewToCityName] = useState("");
  const [newToCountryName, setNewToCountryName] = useState("");
  const [newTransport, setNewTransport] = useState([]);
  const [newTravelWith, setNewTravelWith] = useState([]);
  const [newDepartureDate, setNewDepartureDate] = useState("");
  const [newDepartureTime, setNewDepartureTime] = useState("");
  const [newArrivalDate, setNewArrivalDate] = useState("");
  const [newArrivalTime, setNewArrivalTime] = useState("");

  const closeEditTrip = () => setEditTrip(false);
  const showEditTrip = async () => {
    setEditTrip(true);
    try {
      const response = await fetch(`${url}/${selectedTrip}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNewFromCityName(data.fromCityName);
        setNewFromCountryName(data.fromCountryName);
        setNewToCityName(data.toCityName);
        setNewToCountryName(data.toCountryName);
        setNewTransport(data.transport);
        setNewTravelWith(data.travelWith);
        setNewDepartureDate(data.departureDate);
        setNewDepartureTime(data.departureTime);
        setNewArrivalDate(data.arrivalDate);
        setNewArrivalTime(data.arrivalTime);
      } else {
        console.log("Fetch Failed");
      }
    } catch (error) {
      console.error(error, "from line 55");
    }
  };

  useEffect(() => {
    setNewFromCityName(fromCityName);
    setNewFromCountryName(fromCountryName);
    setNewToCityName(toCityName);
    setNewToCountryName(toCountryName);
    setNewTransport(transport);
    setNewTravelWith(travelWith);
    setNewDepartureDate(departureDate);
    setNewDepartureTime(departureTime);
    setNewArrivalDate(arrivalDate);
    setNewArrivalTime(arrivalTime);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trip = {
      fromCityName: newFromCityName,
      fromCountryName: newFromCountryName,
      toCityName: newToCityName,
      toCountryName: newToCountryName,
      transport: newTransport,
      travelWith: newTravelWith,
      departureDate: newDepartureDate,
      departureTime: newDepartureTime,
      arrivalDate: newArrivalDate,
      arrivalTime: newArrivalTime,
    };

    try {
      const response = await fetch(`${url}/${selectedTrip}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },

        body: JSON.stringify(trip),
      });

      if (response.ok) {
        const data = await response.json();
        setTrips(data);
        setTripChanged();
        closeEditTrip();
      } else {
        console.error("fetch failed in line 104 SingleTrip component");
      }
    } catch (error) {
      console.error(error, "I am from line 107 SingleTrip comp");
    }
  };

  const handleDeleteExperience = async () => {
    try {
      const response = await fetch(`${url}/${selectedTrip}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        setTripChanged();
        closeEditTrip();
      } else {
        console.error("fetch failed from delete line 127");
      }
    } catch (error) {
      console.error(error, "line 130 delete method");
    }
  };

  return (
    //  <>
    //   </>
    <>
      <Card
        onClick={() => setSelected(!selected)}
        // style={{ width: "100%"}}
        // border: selected ? "3px solid red": "none"
        className="cb1 w-100"
      >
        <Card.Body>
          <span className="card_number fw-bold">{index + 1}</span>
          <Card.Title className="card_title">Coming trip</Card.Title>
          <Card.Text>{toCityName}</Card.Text>
          <Card.Text>
            {format(parseISO(departureDate), "EEEE MMM do")}
          </Card.Text>
          <div
            className="d-flex flex-wrap justify-content-end"
            style={{ gap: "10px" }}
          >
            <div style={{ flexGrow: "1" }}>
              <Button
                variant="outline-light"
                className="rounded-pill button"
                onClick={() => {
                  // setSelectedTrip(id);
                  navigate(`/travels/${id}`);
                }}
              >
                {" "}
                Details{" "}
              </Button>
            </div>

            <IconButton
              size="small"
              // color="primary"
              aria-label="add an alarm"
              className="edit_button"
              onClick={() => {
                showEditTrip();
                setSelectedTrip(id);
              }}
            >
              <DragIndicatorIcon fontSize="medium" />
            </IconButton>
          </div>
        </Card.Body>
      </Card>

      <Modal show={editTrip} onHide={closeEditTrip}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Col sm="2">
                <Form.Label>From</Form.Label>
              </Col>
              <Col xs="5">
                <Form.Control
                  className="mb-2"
                  id="citytrip"
                  placeholder="City"
                  type="text"
                  value={newFromCityName}
                  onChange={(e) => setNewFromCityName(e.target.value)}
                  required
                />
              </Col>
              <Col xs="5">
                {/* <Form.Label htmlFor="inlineFormInput" srOnly>
                  Country
                </Form.Label> */}
                <Form.Control
                  className="mb-2"
                  id="countrytrip"
                  placeholder="Country"
                  type="text"
                  value={newFromCountryName}
                  onChange={(e) => setNewFromCountryName(e.target.value)}
                  required
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col sm="2">
                <Form.Label>To</Form.Label>
              </Col>
              <Col xs="5">
                <Form.Control
                  className="mb-2"
                  id="tocity"
                  placeholder="City"
                  type="text"
                  value={newToCityName}
                  onChange={(e) => setNewToCityName(e.target.value)}
                  required
                />
              </Col>
              <Col xs="5">
                {/* <Form.Label htmlFor="inlineFormInput" srOnly>
                  Country
                </Form.Label> */}
                <Form.Control
                  className="mb-2"
                  id="tocountry"
                  placeholder="Country"
                  type="text"
                  value={newToCountryName}
                  onChange={(e) => setNewToCountryName(e.target.value)}
                  required
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridTransport">
                <Form.Label>Transport</Form.Label>
                <Form.Control
                  placeholder="ex: plane, car..."
                  type="text"
                  value={newTransport}
                  onChange={(e) => setNewTransport(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridTravelWith">
                <Form.Label>Traveling with</Form.Label>
                <Form.Control
                  placeholder="ex: family, friend..."
                  type="text"
                  value={newTravelWith}
                  onChange={(e) => setNewTravelWith(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Col xs={8}>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FaPlaneDeparture />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="dateofdeparture"
                    placeholder="Departure"
                    type="date"
                    value={newDepartureDate.slice(0, 10)}
                    onChange={(e) => setNewDepartureDate(e.target.value)}
                    required
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Time"
                  type="time"
                  value={newDepartureTime.slice(0, 10)}
                  onChange={(e) => setNewDepartureTime(e.target.value)}
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xs={8}>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      {" "}
                      <FaPlaneArrival />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="dateofarrival"
                    placeholder="Arrival"
                    type="date"
                    value={newArrivalDate}
                    onChange={(e) => setNewArrivalDate(e.target.value)}
                    required
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Time"
                  type="time"
                  value={newArrivalTime}
                  onChange={(e) => setNewArrivalTime(e.target.value)}
                />
              </Col>
            </Form.Row>

            <div className="d-flex justify-content-end">
              <Button
                variant="danger"
                type="button"
                className="mr-4"
                onClick={handleDeleteExperience}
              >
                Delete
              </Button>
              <Button variant="success" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SingleTrip;
