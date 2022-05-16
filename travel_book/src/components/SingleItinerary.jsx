import React, { useState, useEffect } from "react";
import { ListGroup, Form, Button, Col, Modal, Row } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

import "../styles/ListGroup.css";
import "../styles/Itinerary.css";
import AddVisitPlace from "./AddVisitPlace";
import IconButton from "@material-ui/core/IconButton";

import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import AddTodoLists from "./AddTodoLists";
const SingleItinerary = ({
  id,
  singleItinerary,

  setTripChanged,
  index,
}) => {
  const token = localStorage.getItem("accessToken");

  console.log(id);

  const [trips, setTrips] = useState(null);
  const [editItinerary, setEditItinerary] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  const [newEnteredItinerary, setNewEnteredItinerary] = useState("");

  const url = `http://localhost:3001/itinerary`;
  const closeEditItinerary = () => setEditItinerary(false);
  const showEditItinerary = async () => {
    setEditItinerary(true);
    try {
      const response = await fetch(`${url}/${selectedItinerary}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setNewEnteredItinerary(data.singleItinerary);
      } else {
        console.log("Fetch Failed line 48");
      }
    } catch (error) {
      console.error(error, "from line 51");
    }
  };

  useEffect(() => {
    setNewEnteredItinerary(singleItinerary);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plan = {
      itinerary: newEnteredItinerary,
    };
    try {
      const response = await fetch(`${url}/${selectedItinerary}`, {
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
        closeEditItinerary();
      } else {
        console.error("fetch failed in line 104 SingleTrip component");
      }
    } catch (error) {
      console.error(error, "I am from line 107 SingleTrip comp");
    }
  };

  const handleDeleteItinerary = async () => {
    try {
      const response = await fetch(`${url}/${selectedItinerary}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        setTripChanged();
        closeEditItinerary();
      } else {
        console.log("fetch failed from delete line 104");
      }
    } catch (error) {
      console.error(error, "line 107 delete method");
    }
  };

  return (
    <>
      {/* <Row>
        <Col xs={12} className="d-flex justify-content-center"> */}
      <div className="list_itinerary text size  ">
        {/* <Row> */}
        <div className="display justify-content-between">
          <div>
            <h4>{singleItinerary}</h4>{" "}
          </div>
          {/* </Col>
          <Col> */}{" "}
          <div className="icon_button">
            <IconButton
              size="small"
              className="size_icon"
              aria-label="add an alarm"
              onClick={() => {
                setSelectedItinerary(id);
                showEditItinerary();
                // navigate(`/${id}`)
              }}
            >
              <DragIndicatorIcon className="color_icon" />
            </IconButton>
            {/* </Row> */}
          </div>
        </div>
        <div>
          {/* <Button
            variant="outline-light"
            style={{ color: "black" }}
            className="mx-1"
            
          >
            Add place to visit
          </Button > */}{" "}
          {/* <h2>
            {" "}
            <span className="itinerary_span">Visits and Activities</span>
          </h2> */}
          <div className="h_5">
            <h5>Place to visit</h5>
          </div>
          <span>
            {" "}
            <AddVisitPlace itineraryId={id} />
          </span>
          <div className="h_5">
            {" "}
            <h5>Add to do list</h5>{" "}
          </div>{" "}
          <span>
            <AddTodoLists itineraryId={id} />
          </span>
        </div>
      </div>
      {/* </Col>
      </Row> */}

      {/* <ListGroup>
        <ListGroup.Item>{singleItinerary}</ListGroup.Item>
        <Button
          variant="outline-dark"
          className="rounded-pill button"
          onClick={() => {
            setSelectedItinerary(id);
            showEditItinerary();
            // navigate(`/${id}`)
          }}
        >
          Edit{" "}
        </Button>
      </ListGroup> */}

      <Modal show={editItinerary} onHide={closeEditItinerary}>
        <Modal.Header closeButton>
          <Modal.Title>Edit day plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row className="justify-content-between">
              <Col xs="auto">
                <Form.Label htmlFor="inlineFormInput" srOnly>
                  Planning your day
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder="enter Day "
                  type="text"
                  value={newEnteredItinerary}
                  onChange={(e) => setNewEnteredItinerary(e.target.value)}
                  required
                />
              </Col>
            </Form.Row>

            <div className="d-flex justify-content-between">
              <Button
                // style={{background: "#ce9f11", border: "none"}}
                type="submit"
              >
                Save changes
              </Button>
              <Button
                variant="danger"
                type="button"
                className="mr-4"
                onClick={handleDeleteItinerary}
              >
                <FaTrashAlt />
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* <AddVisitPlace itineraryId={id} /> */}
    </>
  );
};

export default SingleItinerary;
