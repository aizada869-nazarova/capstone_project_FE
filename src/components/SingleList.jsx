import React, { useState, useEffect } from "react";
import {
  ListGroup,
  Form,
  Button,
  Col,
  Modal,
  Row,
  Container,
} from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import "../styles/SingleList.css";

import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import "../styles/ListGroup.css";
const SingleList = ({
  id,
  nameOfItem,
  category,

  setTripChanged,
  index,
}) => {
  let { travelId } = useParams();

  const token = localStorage.getItem("accessToken");

  console.log(id);

  const [trips, setTrips] = useState(null);
  const [editList, setEditList] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  const [newNameOfItem, setNewNameOfItem] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const url = `https://personal-travel-book.herokuapp.com/travels/${travelId}/pakinglist`;
  const closeEditTrip = () => setEditList(false);
  const showEditTrip = async () => {
    setEditList(true);
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
        setNewNameOfItem(data.nameOfItem);
        setNewCategory(data.categoryOfList);
      } else {
        console.log("Fetch Failed line 48");
      }
    } catch (error) {
      console.error(error, "from line 51");
    }
  };

  useEffect(() => {
    setNewNameOfItem(nameOfItem);
    setNewCategory(category);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pakinglist = {
      nameOfItem: newNameOfItem,
      category: newCategory,
    };
    try {
      const response = await fetch(`${url}/${selectedList}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },

        body: JSON.stringify(pakinglist),
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
      const response = await fetch(`${url}/${selectedList}`, {
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
        console.log("fetch failed from delete line 104");
      }
    } catch (error) {
      console.error(error, "line 107 delete method");
    }
  };

  return (
    <>
      <div className="mt-6 w-100 ">
        <ListGroup style={{ color: "dark" }} className="mb-2">
          <ListGroup.Item id="list_itinerary">
            <Row>
              <Col className="d-flex">
                {/* <Form.Check aria-label="option 1" />{" "} */}
                {/* <strong> {nameOfItem}</strong> */}
                <label>
                  <input type="checkbox" />
                  <i></i>
                  <span className="itinerary_span">{nameOfItem}</span>
                </label>
              </Col>
              <Col xs={"auto"}>
                <IconButton
                  size="small"
                  aria-label="add an alarm"
                  onClick={() => {
                    setSelectedList(id);
                    showEditTrip();
                  }}
                >
                  <DragIndicatorIcon fontSize="small" className="color_icon" />
                </IconButton>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </div>

      <Modal show={editList} onHide={closeEditTrip}>
        <Modal.Header closeButton>
          <Modal.Title>Edit packing list</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row className="justify-content-between">
              <Col xs="auto">
                <Form.Label htmlFor="inlineFormInput" srOnly>
                  name of item
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder="name of item"
                  type="text"
                  value={newNameOfItem}
                  onChange={(e) => setNewNameOfItem(e.target.value)}
                  required
                />
              </Col>
              <Col xs="auto">
                <Form.Label htmlFor="inlineFormInput" srOnly>
                  Category
                </Form.Label>
                <Form.Control
                  as="select"
                  name="cathegory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  required
                >
                  <option>Category</option>
                  <option value="clothing">Clothing</option>
                  <option value="toiletries">Toiletries</option>
                  <option value="medications">Medications</option>
                  <option value="accessories">Accessories</option>
                  <option value="electronics">Electronics</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Col>
            </Form.Row>

            <div className="d-flex justify-content-between">
              <Button variant="warning" type="submit">
                Save changes
              </Button>
              <Button
                variant="danger"
                type="button"
                className="mr-4"
                onClick={handleDeleteExperience}
              >
                <FaTrashAlt />
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SingleList;
