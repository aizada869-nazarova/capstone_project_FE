import React, { useState, useEffect } from "react";
import { ListGroup, Form, Button, Col, Modal, Row } from "react-bootstrap";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

import IconButton from "@material-ui/core/IconButton";

const SinglePlace = ({ id, singlePlace, itineraryid, setTripChanged }) => {
  const token = localStorage.getItem("accessToken");

  console.log(itineraryid);

  const [trips, setTrips] = useState(null);
  const [editPlace, setEditPlace] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [newEnteredPlace, setNewEnteredPlace] = useState("");

  const url = `https://personal-travel-book.herokuapp.com/itinerary/${itineraryid}/place`;
  const closeEditPlace = () => setEditPlace(false);
  const showEditPlace = async () => {
    setEditPlace(true);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setNewEnteredPlace(data.singlePlace);
      } else {
        console.log("Fetch Failed line 48");
      }
    } catch (error) {
      console.error(error, "from line 51");
    }
  };

  useEffect(() => {
    setNewEnteredPlace(singlePlace);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plan = {
      place: newEnteredPlace,
    };
    try {
      const response = await fetch(`${url}/${selectedPlace}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },

        body: JSON.stringify(plan),
      });

      if (response.ok) {
        const data = await response.json();
        setTrips(data);
        setTripChanged();
        closeEditPlace();
      } else {
        console.error("fetch failed in line 104 SingleTrip component");
      }
    } catch (error) {
      console.error(error, "I am from line 107 SingleTrip comp");
    }
  };

  const handleDeletePlace = async () => {
    try {
      const response = await fetch(`${url}/${selectedPlace}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        setTripChanged();
        closeEditPlace();
      } else {
        console.log("fetch failed from delete line 104");
      }
    } catch (error) {
      console.error(error, "line 107 delete method");
    }
  };

  return (
    <>
      <div className="mt-6 w-100">
        <ListGroup style={{ color: "dark" }} className="mb-2">
          <ListGroup.Item id="list_group">
            <Row>
              <Col className="d-flex">
                <label>
                  <input type="checkbox" />
                  <i></i>
                  <span className="itinerary_span">{singlePlace}</span>
                </label>
              </Col>
              <Col xs={"auto"} className="d-flex">
                <IconButton
                  size="small"
                  aria-label="add an alarm"
                  onClick={() => {
                    setSelectedPlace(id);
                    showEditPlace();
                    // navigate(`/${id}`)
                  }}
                >
                  <FaRegEdit
                    className="color_icon"
                    style={{ fontsize: "initial" }}
                  />
                </IconButton>
                {/* <IconButton
                  size="small"
                  aria-label="add"
                  onClick={handleDeletePlace}
                >
                  <FaTrashAlt className="trash_icon" />
                </IconButton> */}
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </div>

      <Modal show={editPlace} onHide={closeEditPlace}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Place and Activities</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row className="justify-content-between">
              <Col xs={12}>
                <Form.Label htmlFor="visitplace" srOnly>
                  enter place and activities
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="visitplace"
                  placeholder="enter place to visit"
                  type="text"
                  value={newEnteredPlace}
                  onChange={(e) => setNewEnteredPlace(e.target.value)}
                  required
                />
              </Col>
            </Form.Row>

            <div className="d-flex justify-content-between">
              <Button
                variant="danger"
                type="button"
                className="mr-4"
                onClick={handleDeletePlace}
              >
                <FaTrashAlt />
              </Button>
              <Button variant="warning" type="submit">
                Save changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SinglePlace;
