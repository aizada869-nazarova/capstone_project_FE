import React, { useState, useEffect } from "react";
import Moment from "moment";
import {
  Card,
  Button,
  Modal,
  Form,
  InputGroup,
  Col,
  FormControl,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { format, parseISO } from "date-fns";
import "../styles/Card.css";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { FaTrashAlt } from "react-icons/fa";

import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

const SingleAccommodation = ({
  placeToStay,
  address,
  checkIn,
  checkInTime,
  checkOut,
  checkOutTime,
  contact,
  websiteUrl,
  id,
  setTripChanged,
}) => {
  let { travelId } = useParams();
  const url = `https://personal-travel-book.herokuapp.com/travels/${travelId}/accommodation`;
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [trips, setTrips] = useState(null);
  const [editTrip, setEditTrip] = useState(false);
  const [selectedAcc, setSelectedAcc] = useState(null);

  const [newPlaceToStay, setNewPlaceToStay] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCheckIn, setNewCheckIn] = useState("");
  const [newCheckInTime, setNewCheckInTime] = useState("");
  const [newCheckOut, setNewCheckOut] = useState("");
  const [newCheckOutTime, setNewCheckOutTime] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");

  const closeEditTrip = () => setEditTrip(false);
  const showEditTrip = async () => {
    setEditTrip(true);
    try {
      const response = await fetch(`${url}/${selected}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNewPlaceToStay(data.placeToStay);
        setNewAddress(data.address);
        setNewCheckIn(data.checkIn);
        setNewCheckInTime(data.checkInTime);
        setNewCheckOut(data.checkOut);
        setNewCheckOutTime(data.checkOutTime);
        setNewContact(data.contact);
        setNewWebsiteUrl(data.websiteUrl);
      } else {
        console.log("Fetch Failed");
      }
    } catch (error) {
      console.error(error, "from line 55");
    }
  };

  useEffect(() => {
    setNewPlaceToStay(placeToStay);
    setNewAddress(address);
    setNewCheckIn(checkIn);
    setNewCheckInTime(checkInTime);
    setNewCheckOut(checkOut);
    setNewCheckOutTime(checkOutTime);
    setNewContact(contact);
    setNewWebsiteUrl(websiteUrl);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accommodation = {
      placeToStay: newPlaceToStay,
      address: newAddress,
      checkIn: newCheckIn,
      checkInTime: newCheckInTime,
      checkOut: newCheckOut,
      checkOutTime: newCheckOutTime,
      contact: newContact,

      websiteUrl: newWebsiteUrl,
    };

    try {
      const response = await fetch(`${url}/${selected}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },

        body: JSON.stringify(accommodation),
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

  const handleDeleteAccom = async () => {
    try {
      const response = await fetch(`${url}/${selected}`, {
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
    <>
      <Container>
        <Row>
          <Col xs={12} className="d-flex justify-content-center mt-3">
            <div id="overview_card">
              <Table
                striped
                bordered
                hover
                className="table-bordered p-3  d-flex align-items-center flex-direction-column"
              >
                <tbody>
                  <tr>
                    <td className="orange_text">
                      <strong>Place to stay:</strong>{" "}
                    </td>
                    <td className="white_text">{placeToStay}</td>
                    <td className="orange_text">
                      <strong>Address:</strong>
                    </td>
                    <td className="white_text">{address}</td>
                  </tr>
                  <tr>
                    <td className="orange_text">
                      <strong>Check-in</strong>
                    </td>
                    <td className="white_text">
                      {Moment(checkIn).format("DD-MM-YYYY")}
                    </td>
                    <td className="orange_text">
                      <strong>Check-in time </strong>
                    </td>
                    <td className="white_text">{checkInTime}</td>
                  </tr>
                  <tr>
                    <td className="orange_text">
                      <strong>Check-out</strong>
                    </td>
                    <td className="white_text">
                      {Moment(checkOut).format("DD-MM-YYYY")}
                    </td>
                    <td className="orange_text">
                      <strong>check-out time</strong>
                    </td>

                    <td className="white_text">{checkOutTime}</td>
                  </tr>
                  <tr>
                    <td className="orange_text">
                      <strong>Contact</strong>
                    </td>
                    <td className="white_text">{contact}</td>
                    <td className="orange_text">
                      <strong>Link</strong>
                    </td>

                    <td className="white_text">{websiteUrl} </td>
                  </tr>
                </tbody>
              </Table>
              <Col className="d-flex justify-content-end">
                {" "}
                <IconButton
                  size="small"
                  aria-label="add an alarm"
                  className="edit_button"
                  onClick={() => {
                    showEditTrip();
                    setSelected(id);
                  }}
                >
                  <DragIndicatorIcon fontSize="medium" className="color_icon" />
                </IconButton>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal className="modal_bg" show={editTrip} onHide={closeEditTrip}>
        <Modal.Header closeButton>
          <Modal.Title>Edit accommodation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="place to stay">
                <Form.Label>Place to stay</Form.Label>
                <Form.Control
                  placeholder="ex: hotel, airbnb..."
                  type="text"
                  value={newPlaceToStay}
                  onChange={(e) => setNewPlaceToStay(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="enter address"
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Col xs={8}>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Check-in</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="start"
                    placeholder="Departure"
                    type="date"
                    min={new Date()}
                    value={newCheckIn.slice(0, 10)}
                    onChange={(e) => setNewCheckIn(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Time"
                  type="time"
                  value={newCheckInTime}
                  onChange={(e) => setNewCheckInTime(e.target.value)}
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xs={8}>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Check-out</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="check-out"
                    type="date"
                    value={newCheckOut.slice(0, 10)}
                    onChange={(e) => setNewCheckOut(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Time"
                  type="time"
                  value={newCheckOutTime}
                  onChange={(e) => setNewCheckOutTime(e.target.value)}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={6}>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="phone"
                    placeholder="enter phone number"
                    type="text"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col xs={6}>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>URL</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="url"
                    placeholder="enter the link"
                    type="text"
                    value={newWebsiteUrl}
                    onChange={(e) => setNewWebsiteUrl(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Form.Row>

            <div className="d-flex justify-content-between">
              <Button
                variant="danger"
                type="button"
                className="mr-4"
                onClick={handleDeleteAccom}
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

export default SingleAccommodation;
