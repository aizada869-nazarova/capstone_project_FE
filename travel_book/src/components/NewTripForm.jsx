import React, { useState, useEffect } from "react";
import DisplayNewTrips from "./DisplayNewTrips";
import { Container, Form, Button, Col, Row, Modal } from "react-bootstrap";
import { FaPlane, FaShip } from "react-icons/fa";
import SingleTrip from "./SingleTrip";

const NewTripForm = () => {
  const url = "http://localhost:3001/travels";

  const [trips, setTrips] = useState([]);
  const [addTrip, setAddTrip] = useState(false);
  const [tripChanged, setTripChanged] = useState(0);

  const closeAddTrip = () => setAddTrip(false);
  const showAddTrip = () => setAddTrip(true);

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [transport, setTransport] = useState([]);
  const [travelWith, setTravelWith] = useState([]);
  const [arrivalDate, setArrivalDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trip = {
      from: from,
      to: to,
      departureDate: departureDate,
      arrivalDate: arrivalDate || null,
      transport: transport,
      travelWith: travelWith,
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
      console.log("I am catch error from line 90");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [tripChanged]);

  return (
    <div className="profile-sub-section mt-4 single-list-item">
      <Row className="justify-content-between px-3">
        <h4 className="pt-4 pl-3">trip</h4>
        <Button variant="success" onClick={showAddTrip}>
          Add
        </Button>
      </Row>

      <Container>
        <Row>
          {trips &&
            trips.map(
              (
                {
                  to,
                  _id: id,
                  from,
                  departureDate,
                  travelWith,
                  transport,

                  arrivalDate,
                },
                i
              ) => (
                <Col
                  xs={12}
                  md={4}
                  key={id}
                  className="d-flex justify-content-center"
                >
                  <SingleTrip
                    index={i}
                    to={to}
                    id={id}
                    from={from}
                    travelWith={travelWith}
                    departureDate={departureDate}
                    transport={transport}
                    arrivalDate={arrivalDate}
                    tripChanged={tripChanged}
                    setTripChanged={() => setTripChanged((count) => count + 1)}
                  />
                </Col>
              )
            )}
        </Row>
      </Container>

      <Modal show={addTrip} onHide={closeAddTrip}>
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>From</Form.Label>
              <Form.Control
                type="text"
                placeholder="to"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>To</Form.Label>
              <Form.Control
                type="text"
                placeholder="from"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>transport</Form.Label>
              <Form.Control
                type="text"
                placeholder="transport"
                value={transport}
                onChange={(e) => setTransport(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Travel with</Form.Label>
              <Form.Control
                type="text"
                placeholder="travel with..."
                value={travelWith}
                onChange={(e) => setTravelWith(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Add
            </Button>
            
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );

  // const [formData, setFormData] = useState({
  //   from: "",
  //   to: "",
  //   departureDate: "",
  //   arrivalDate: "",
  //   transport: [],
  //   time: "",
  //   travelWith: [],
  //   userId:"6259d0ef3c13cbc5bbdb7caa"
  // });

  // const transportArr = [
  //   "train",
  //   "plane",
  //   "bycecle"

  // ]

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("accessToken")
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //   Authorization: "Bearer " + token,
  //     },
  //     body: JSON.stringify(formData),
  //   }).then((response) => {
  //     console.log(response);
  //     if (response.ok) {

  //       setFormData();
  //     } else {
  //       alert("Something went wrong :(");
  //     }
  //   });
  //   console.log("enteredValue",  formData);
  // };

  // const handleInputChange = (fieldName, value) => {
  //   setFormData({
  //     ...formData,
  //     [fieldName]: value,
  //   });

  // }

  // const handleCheckBox= (e)=>{
  //   if (e.target.checked) {
  //     setFormData({
  //       ...formData,
  //       transport: [...formData.transport, e.target.value],
  //     })
  //   } else {
  //     const transportMethod = formData.transport.filter(
  //       (method) => method !== e.target.value
  //     )
  //     console.log('newRecipieMethod', transportMethod)
  //     setFormData({
  //       ...formData,
  //       transport: [...transportMethod],
  //     })
  //   }
  // }
  // console.log(
  //   'formData.prepMethods out of handlePrepCheckboxes',
  //   formData.transport
  // )

  // return (
  //   <>
  //     <Form onSubmit={handleFormSubmit} >
  //       <Form.Row>
  //         <Form.Group as={Col} controlId="formGridEmail">
  //           <Form.Label>Email</Form.Label>
  //           <Form.Control type="text"
  //           value={formData.from}
  //            onChange={(e) => {
  //             handleInputChange("from", e.target.value);
  //           }}
  //           required

  //           placeholder="Enter city, country" />

  //         </Form.Group>

  //         <Form.Group as={Col} controlId="formGridPassword">
  //           <Form.Label>Password</Form.Label>
  //           <Form.Control type="text"
  //             value={formData.to}
  //            onChange={(e) => {
  //             handleInputChange("to", e.target.value);
  //           }}
  //           required
  //           placeholder="Enter city, country" />
  //         </Form.Group>
  //       </Form.Row>

  //       <Form.Row>
  //         <Form.Group as={Col} controlId="formGridEmail">
  //           <Form.Label>Email</Form.Label>
  //           <Form.Control
  //           type="date"
  //           value={formData.departureDate}
  //           onChange={(e) => {
  //             handleInputChange("departureDate", e.target.value);
  //           }}
  //            placeholder="Enter email" />
  //         </Form.Group>

  //         <Form.Group as={Col} controlId="formGridPassword">
  //           <Form.Label>Password</Form.Label>
  //           <Form.Control type="date"

  //            value={formData.arrivalDate}
  //            onChange={(e) => {
  //             handleInputChange("arrivalDate", e.target.value);
  //           }}
  //           placeholder="Password" />
  //         </Form.Group>
  //       </Form.Row>

  //       <Form.Group>
  //       {transportArr.map((method) => (
  //                           <Form.Check
  //                             inline
  //                             key={`${method}`}
  //                             label={`${method}`}
  //                             name={`${method}`}
  //                             value={`${method}`}
  //                             onChange={handleCheckBox}

  //                             type="checkbox"
  //                             className="prepMethodsClass"
  //                           />
  //                         ))}
  //                          </Form.Group>

  //       <Form.Row>
  //         <Form.Group as={Col} controlId="formGridEmail">
  //           <Form.Label>Email</Form.Label>
  //           <Form.Control type="text"
  //            value={formData.time}
  //            onChange={(e) => {
  //             handleInputChange("time", e.target.value);
  //           }}
  //           placeholder="Enter email" />
  //         </Form.Group>

  //         <Form.Group as={Col} controlId="formGridPassword">
  //           <Form.Label>Password</Form.Label>
  //           <Form.Control type="text"
  //            value={formData.travelWith}
  //            onChange={(e) => {
  //             handleInputChange("travelWith", e.target.value);
  //           }}
  //           placeholder="Password" />
  //         </Form.Group>
  //       </Form.Row>

  //       <Button variant="primary" type="submit">
  //         Submit
  //       </Button>
  //     </Form>
  //   </>
  // );
};

export default NewTripForm;
