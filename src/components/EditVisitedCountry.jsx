import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Col, Row } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import "../styles/Card.css";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";

import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

const EditVisitedCountry = ({
  id,
  cityName,
  countryName,
  date,
  duration,

  setTripChanged,
  index,
}) => {
  const url = "http://localhost:3001/visitedCountry";
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [trips, setTrips] = useState(null);
  const [editTrip, setEditTrip] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const [newCityName, setNewCityName] = useState("");
  const [newCountryName, setNewCountryName] = useState("");

  const [newDate, setNewDate] = useState("");
  const [newDuration, setNewDuration] = useState("");

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
        setNewCityName(data.cityName);
        setNewCountryName(data.countryName);

        setNewDate(data.date);
        setNewDuration(data.duration);
      } else {
        console.log("Fetch Failed line 54");
      }
    } catch (error) {
      console.error(error, "from line 55");
    }
  };

  useEffect(() => {
    setNewCityName(cityName);
    setNewCountryName(countryName);

    setNewDate(date);
    setNewDuration(duration);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trip = {
      cityName: newCityName,
      countryName: newCountryName,

      date: newDate,
      duration: newDuration || null,
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
        console.error("fetch failed from delete line 117");
      }
    } catch (error) {
      console.error(error, "line 120 delete method");
    }
  };

  return (
    <>
      <Card
        // onClick={() => setSelected(!selected)}

        // border: selected ? "3px solid red": "none"
        className="cb1 w-100 "
      >
        <Card.Body>
          <span className="card_number fw-bold">{index + 1}</span>
          <Card.Title className="card_title">Visited country</Card.Title>
          <Card.Text>
            {cityName}, {countryName}
          </Card.Text>

          <Card.Text>{format(parseISO(date), "MMM do y")}</Card.Text>
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
                  navigate(`/visitedCountry/${id}/uploadPictures`);
                }}
              >
                {" "}
                Details{" "}
              </Button>
            </div>

            <IconButton
              size="small"
              aria-label="add an alarm"
              className="edit_button"
              onClick={() => {
                showEditTrip();
                setSelectedTrip(id);
              }}
            >
              <DragIndicatorIcon fontSize="medium" className="color_icon" />
            </IconButton>
          </div>
        </Card.Body>
      </Card>

      <Modal className="modal_bg" show={editTrip} onHide={closeEditTrip}>
        <Modal.Header closeButton>
          <Modal.Title>Edit visited country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row className="justify-content-between">
              <Col xs={12} md={6}>
                <Form.Label htmlFor="visitedcity" srOnly>
                  City
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="visitedcity"
                  placeholder="City"
                  type="text"
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={6}>
                <Form.Label htmlFor="visitedcountry" srOnly>
                  Country
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="visitedcountry"
                  placeholder="Country"
                  type="text"
                  value={newCountryName}
                  onChange={(e) => setNewCountryName(e.target.value)}
                  required
                />
              </Col>
            </Form.Row>

            <Form.Row className="justify-content-between">
              <Col xs={12} md={6}>
                <Form.Label htmlFor="inlineFormInput" srOnly>
                  Date
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder="Date"
                  type="date"
                  max={new Date()}
                  value={newDate.slice(0, 10)}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </Col>
              <Col xs={12} md={6}>
                <Form.Label htmlFor="inlineFormInput" srOnly>
                  number
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder="Duration"
                  type="number"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                />
              </Col>
            </Form.Row>

            <div className="d-flex justify-content-between">
              <Button
                variant="danger"
                type="button"
                className="mr-4"
                onClick={handleDeleteExperience}
              >
                <FaTrashAlt />
              </Button>
              <Button
                // style={{background: "#ce9f11", border: "none"}}
                type="submit"
                variant="warning"
              >
                Save changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditVisitedCountry;
