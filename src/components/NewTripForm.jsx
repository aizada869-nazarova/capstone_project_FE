import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";

import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";

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
import SingleTrip from "./SingleTrip";

const NewTripForm = ({ userId }) => {
  const url = "https://personal-travel-book.herokuapp.com/travels";

  const [trips, setTrips] = useState([]);
  const [addTrip, setAddTrip] = useState(false);
  const [tripChanged, setTripChanged] = useState(0);

  const closeAddTrip = () => setAddTrip(false);
  const showAddTrip = () => setAddTrip(true);

  const [toCityName, setToCityName] = useState("");
  const [fromCityName, setFromCityName] = useState("");
  const [toCountryName, setToCountryName] = useState("");
  const [fromCountryName, setFromCountryName] = useState("");

  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [transport, setTransport] = useState([]);
  const [travelWith, setTravelWith] = useState([]);
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trip = {
      fromCityName: fromCityName,
      fromCountryName: fromCountryName,
      toCityName: toCityName,
      toCountryName: toCountryName,
      departureDate: departureDate,
      departureTime: departureTime,
      arrivalDate: arrivalDate,
      arrivalTime: arrivalTime,
      transport: transport,
      travelWith: travelWith,
      userId: userId,
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
        setIsLoading(false);
        setIsError(false);
      } else {
        console.log("fetch failed on line 86");
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("I am catch error from line 90");
      setIsError(true);
      setIsLoading(false);
    }
    setFromCityName("");
    setFromCountryName("");
    setToCityName("");
    setToCountryName("");
    setDepartureDate("");
    setDepartureTime("");
    setArrivalDate("");
    setArrivalTime("");
    setTransport("");
    setTravelWith("");
  };

  useEffect(() => {
    fetchTrips();
  }, [tripChanged]);

  return (
    <div className="new-trip-top_margin pt-3">
      <Row className="justify-content-center mb-3">
        <Col xs={12} md={8} lg={6}>
          <h1 className="pl-2">Coming Trips: {trips.length} </h1>{" "}
        </Col>
        <Col xs={8} md={4} lg={3} className="d-flex align-items-center">
          <Button
            variant="warning"
            className="add_trips rounded-pill"
            onClick={showAddTrip}
          >
            <strong>Add</strong>
          </Button>
        </Col>
      </Row>

      {/* <Container className="d-flex justify-content-center"> */}
      <Row className="d-flex justify-content-center" style={{ rowGap: "10px" }}>
        {isLoading === true && <Loading />}
        {isError === true && <Error />}
        {trips.length === 0 && isError === false && isLoading === false ? (
          <h3 style={{ color: " #eff871" }}>
            You have not added any trip yet!
          </h3>
        ) : (
          trips &&
          trips.map(
            (
              {
                toCityName,
                toCountryName,
                fromCityName,
                fromCountryName,
                arrivalTime,
                _id: id,
                from,
                departureDate,
                departureTime,
                travelWith,
                transport,

                arrivalDate,
              },
              i
            ) => (
              <Col
                xs={8}
                md={4}
                lg={3}
                key={id}
                className="d-flex justify-content-center"
              >
                <SingleTrip
                  index={i}
                  toCityName={toCityName}
                  toCountryName={toCountryName}
                  fromCityName={fromCityName}
                  fromCountryName={fromCountryName}
                  arrivalTime={arrivalTime}
                  id={id}
                  from={from}
                  travelWith={travelWith}
                  departureDate={departureDate}
                  departureTime={departureTime}
                  transport={transport}
                  arrivalDate={arrivalDate}
                  tripChanged={tripChanged}
                  setTripChanged={() => setTripChanged((count) => count + 1)}
                />
              </Col>
            )
          )
        )}
      </Row>
      {/* </Container> */}

      <Modal className="modal_bg" show={addTrip} onHide={closeAddTrip}>
        <Modal.Header closeButton>
          <Modal.Title>Add coming trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Col sm="2">
                <Form.Label>From</Form.Label>
              </Col>
              <Col xs="6" md="5">
                <Form.Control
                  className="mb-2"
                  id="city from"
                  placeholder="City"
                  type="text"
                  value={fromCityName}
                  onChange={(e) => setFromCityName(e.target.value)}
                  required
                />
              </Col>
              <Col xs="6" md="5">
                {/* <Form.Label htmlFor="inlineFormInput" srOnly>
                  Country
                </Form.Label> */}
                <Form.Control
                  className="mb-2"
                  id="country"
                  placeholder="Country"
                  type="text"
                  value={fromCountryName}
                  onChange={(e) => setFromCountryName(e.target.value)}
                  required
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col sm="2">
                <Form.Label>To</Form.Label>
              </Col>
              <Col xs="6" md="5">
                <Form.Control
                  className="mb-2"
                  id="city to"
                  placeholder="City"
                  type="text"
                  value={toCityName}
                  onChange={(e) => setToCityName(e.target.value)}
                  required
                />
              </Col>
              <Col xs="6" md="5">
                {/* <Form.Label htmlFor="inlineFormInput" srOnly>
                  Country
                </Form.Label> */}
                <Form.Control
                  className="mb-2"
                  id="country to"
                  placeholder="Country"
                  type="text"
                  value={toCountryName}
                  onChange={(e) => setToCountryName(e.target.value)}
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
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridTravelWith">
                <Form.Label>Traveling with</Form.Label>
                <Form.Control
                  placeholder="ex: family, friend..."
                  type="text"
                  value={travelWith}
                  onChange={(e) => setTravelWith(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Col xs={12} md={8}>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FaPlaneDeparture />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="start"
                    type="date"
                    min={new Date()}
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    required
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Time"
                  type="time"
                  className="mb-2"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xs={12} md={8}>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      {" "}
                      <FaPlaneArrival />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="inlineFormInputGroup"
                    placeholder="Arrival"
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    required
                  />
                </InputGroup>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Time"
                  type="time"
                  className="mb-2"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                />
              </Col>
            </Form.Row>
            <Row>
              <Col className="w-100 d-flex justify-content-end">
                <Button
                  className="w-25"
                  variant="warning"
                  type="submit"
                  onClick={closeAddTrip}
                >
                  Add
                </Button>
              </Col>
            </Row>
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
