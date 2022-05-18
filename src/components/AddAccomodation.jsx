import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SingleAccommodation from "./SingleAccommodation";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";

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

function AddAccomodation() {
  let { travelId } = useParams();

  const url = `http://localhost:3001/travels/${travelId}/accommodation`;
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [accommodations, setAccommodations] = useState([]);
  const [addAccomm, setAddAccomm] = useState(false);
  const [tripChanged, setTripChanged] = useState(0);
  const [placeToStay, setPlaceToStay] = useState("");
  const [address, setAddress] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [contact, setContact] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const closeAddAcc = () => setAddAccomm(false);
  const showAddAcc = () => setAddAccomm(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const accommodation = {
      placeToStay: placeToStay,
      address: address,
      checkIn: checkIn,
      checkInTime: checkInTime,
      checkOut: checkOut,
      checkOutTime: checkOutTime,
      contact: contact,

      websiteUrl: websiteUrl,
    };
    try {
      const token = localStorage.getItem("accessToken");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(accommodation),
      }).then((response) => {
        // console.log(response);
        if (response.ok) {
          fetchAccommodation();
          setTripChanged((count) => count + 1);
        } else {
          alert("fetch failed");
        }
      });
      console.log("enteredValue", accommodation);
    } catch (error) {
      console.error(error, "from catch");
    }
    setPlaceToStay("");
    setAddress("");
    setCheckIn("");
    setCheckInTime("");
    setCheckOut("");
    setCheckOutTime("");
    setContact("");
    setWebsiteUrl("");
  };

  const fetchAccommodation = async () => {
    try {
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
        setAccommodations(newData);
      } else {
        console.log("fetch failed on line 30");
      }
    } catch (error) {
      console.log("I am catch error from line 33", error);
    }
  };

  useEffect(() => {
    fetchAccommodation();
  }, [tripChanged]);

  return (
    <>
      <Row className="justify-content-center mb-3">
        <Col xs={12} md={12} lg={6}>
          <h2 className="pl-2 mt-5">Accommadation </h2>{" "}
          <Button
            variant="warning"
            className="rounded-pill w-50"
            // onClick={() => {
            //   navigate(`/travels/${travelId}/accommodation`);
            // }}
            onClick={showAddAcc}
          >
            <strong>Add</strong>
          </Button>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        {accommodations &&
          accommodations.map(
            ({
              placeToStay,
              address,
              checkIn,
              checkInTime,
              checkOut,
              checkOutTime,
              contact,
              websiteUrl,
              _id: id,
            }) => (
              <Col xs={12} key={id} className="d-flex justify-content-center">
                <SingleAccommodation
                  placeToStay={placeToStay}
                  id={id}
                  address={address}
                  checkIn={checkIn}
                  checkInTime={checkInTime}
                  checkOut={checkOut}
                  checkOutTime={checkOutTime}
                  contact={contact}
                  websiteUrl={websiteUrl}
                  setTripChanged={() => setTripChanged((count) => count + 1)}
                />
              </Col>
            )
          )}
      </Row>

      <Modal className="modal_bg" show={addAccomm} onHide={closeAddAcc}>
        <Modal.Header closeButton>
          <Modal.Title>Add accommodation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="place to stay">
                <Form.Label>Place to stay</Form.Label>
                <Form.Control
                  placeholder="ex: hotel, airbnb..."
                  type="text"
                  value={placeToStay}
                  onChange={(e) => setPlaceToStay(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="enter address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Col xs={8}>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text> Check-in </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="start"
                    type="date"
                    min={new Date()}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Time"
                  type="time"
                  value={checkInTime}
                  onChange={(e) => setCheckInTime(e.target.value)}
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
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Time"
                  type="time"
                  value={checkOutTime}
                  onChange={(e) => setCheckOutTime(e.target.value)}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={6}>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <PhoneAndroidIcon />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="start"
                    placeholder="enter phone number"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
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
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Form.Row>

            <Row>
              <Col className="w-100 d-flex justify-content-end">
                <Button className="w-25" variant="warning" type="submit">
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddAccomodation;
