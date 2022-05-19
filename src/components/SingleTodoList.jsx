import React, { useState, useEffect } from "react";
import { ListGroup, Form, Button, Col, Modal, Row } from "react-bootstrap";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const SingleTodoList = ({
  id,
  singleTodoList,
  itineraryid,
  setTripChanged,
}) => {
  const token = localStorage.getItem("accessToken");

  console.log(itineraryid);

  const [trips, setTrips] = useState(null);
  const [editTodo, setEditTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const [newEnteredTodo, setNewEnteredTodo] = useState("");

  const url = `https://personal-travel-book.herokuapp.com/itinerary/${itineraryid}/todo`;
  const closeEditPlace = () => setEditTodo(false);
  const showEditPlace = async () => {
    setEditTodo(true);
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

        setNewEnteredTodo(data.singleTodoList);
      } else {
        console.log("Fetch Failed line 48");
      }
    } catch (error) {
      console.error(error, "from line 51");
    }
  };

  useEffect(() => {
    setNewEnteredTodo(singleTodoList);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plan = {
      todo: newEnteredTodo,
    };
    try {
      const response = await fetch(`${url}/${selectedTodo}`, {
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
      const response = await fetch(`${url}/${selectedTodo}`, {
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
                  <span className="itinerary_span">{singleTodoList}</span>
                </label>
              </Col>
              <Col xs={"auto"}>
                <IconButton
                  size="small"
                  aria-label="add an alarm"
                  onClick={() => {
                    setSelectedTodo(id);
                    showEditPlace();
                  }}
                >
                  <FaRegEdit
                    fontSize="small"
                    className="color_icon"
                    style={{ fontsize: "initial" }}
                  />
                </IconButton>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </div>

      <Modal show={editTodo} onHide={closeEditPlace}>
        <Modal.Header closeButton>
          <Modal.Title>Edit todo list</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row className="justify-content-between">
              <Col xs={12}>
                <Form.Label htmlFor="todolist" srOnly>
                  todo list
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="todolist"
                  placeholder="enter to do list..."
                  type="text"
                  value={newEnteredTodo}
                  onChange={(e) => setNewEnteredTodo(e.target.value)}
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

export default SingleTodoList;
