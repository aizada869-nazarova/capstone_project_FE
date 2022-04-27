import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import "../styles/Card.css";
import { useNavigate } from "react-router-dom";

const EditVisitedCountry=({id,
    from,
    travelWith,
    departureDate,
    transport,
    to,
    arrivalDate,
    tripChanged,
    setTripChanged,
    index,})=> {

    const url = "http://localhost:3001/visitedCountry";
    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false);
    const [trips, setTrips] = useState(null);
    const [editTrip, setEditTrip] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
  
    const [newFrom, setNewFrom] = useState("");
    const [newTo, setNewTo] = useState("");
    const [newTransport, setNewTransport] = useState([]);
    const [newTravelWith, setNewTravelWith] = useState([]);
    const [newDepartureDate, setNewDepartureDate] = useState("");
    const [newArrivalDate, setNewArrivalDate] = useState("");
  
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
          setNewFrom(data.from);
          setNewTo(data.to);
          setNewTransport(data.transport);
          setNewTravelWith(data.travelWith);
          setNewDepartureDate(data.departureDate);
          setNewArrivalDate(data.arrivalDate);
        } else {
          console.log("Fetch Failed line 54");
        }
      } catch (error) {
        console.error(error, "from line 55");
      }
    };
  
    useEffect(() => {
      setNewFrom(from);
      setNewTo(to);
      setNewTransport(transport);
      setNewTravelWith(travelWith);
      setNewDepartureDate(departureDate);
      setNewArrivalDate(arrivalDate);
      // eslint-disable-next-line
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const trip = {
        from: newFrom,
        to: newTo,
        transport: newTransport,
        travelWith: newTravelWith,
        departureDate: newDepartureDate,
        arrivalDate: newArrivalDate || null,
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
    <>
      <Card
        onClick={() => setSelected(!selected)}
        style={{ width: "18rem", margin: "30px" }}
        // border: selected ? "3px solid red": "none"
        className="cb1 "
      >
        <Card.Body>
          <span className="card_number fw-bold">{index + 1}</span>
          <Card.Title>Coming trip</Card.Title>
          <Card.Text>{from}</Card.Text>
          <Card.Text>
            {format(parseISO(departureDate), "EEEE, MMM, do")}
          </Card.Text>
          <Button
            variant="outline-light"
            className="rounded-pill button"
            
            onClick={() => {
              // setSelectedTrip(id);
              navigate(`/visitedCountry/${id}`)
            }}
          >
            {" "}
            Details{" "}
          </Button>
          <Button
            variant="outline-light"
            className="rounded-pill button"
            onClick={() => {
              showEditTrip();
              setSelectedTrip(id);
            }}
          >
            {" "}
            Edit{" "}
          </Button>
        </Card.Body>
      </Card>

      <Modal show={editTrip} onHide={closeEditTrip}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>From</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company"
                value={newFrom}
                onChange={(e) => setNewFrom(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Role"
                value={newTo}
                onChange={(e) => setNewTo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={newTransport}
                onChange={(e) => setNewTransport(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location"
                value={newTravelWith}
                onChange={(e) => setNewTravelWith(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={newDepartureDate.slice(0, 10)}
                onChange={(e) => setNewDepartureDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={newArrivalDate}
                onChange={(e) => setNewArrivalDate(e.target.value)}
              />
            </Form.Group>

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
  )
}

export default EditVisitedCountry