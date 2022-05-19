import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import SingleItinerary from "./SingleItinerary";
import NavbarOfTrip from "./NavbarOfTrip";
import Loading from "./Loading";
import Error from "./Error";

function AddItinerary() {
  let { travelId } = useParams();

  const url = `https://personal-travel-book.herokuapp.com/itinerary`;

  const [itineraries, setItineraries] = useState([]);

  const [tripChanged, setTripChanged] = useState(0);

  const [singleItinerary, setSingleItinerary] = useState("");
  const [travel, setTravel] = useState(travelId);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const plan = {
      itinerary: singleItinerary,
      travelId: travel,
    };
    try {
      const token = localStorage.getItem("accessToken");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(plan),
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          fetchTrips();
          setTripChanged((count) => count + 1);
        } else {
          alert("fetch faied");
        }
      });
      console.log("enteredValue", plan);
    } catch (error) {
      console.error(error, "from catch");
    }
    setSingleItinerary("");
  };

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${url}/${travelId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const newData = await response.json();
        console.log(newData);
        setItineraries(newData);
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsError(true);
        setIsLoading(false);
        console.log("fetch failed on line 86");
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log("I am catch error from line 90");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [tripChanged]);

  return (
    <>
      <Container fluid className="paking_back">
        {isLoading === true && <Loading />}
        {isError === true && <Error />}
        <Row>
          <Col>
            <NavbarOfTrip />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col>
            {" "}
            <div className="title_details">Daily Itinerary</div>
          </Col>
        </Row>

        <Row className="input_margin">
          <Col xs={12} md={12} className="justify-content-center">
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col xs={12} md={6}>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        Day plan
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="enter day"
                      aria-label="enter day"
                      aria-describedby="enter day"
                      name="itinerary"
                      value={singleItinerary}
                      onChange={(e) => setSingleItinerary(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Col>

                <Col xs={12} md={2}>
                  <Button
                    type="submit"
                    className="mb-2 w-100"
                    style={{ background: "#ce9f11" }}
                    variant="warning"
                  >
                    <strong> Add</strong>
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {itineraries &&
            itineraries.map(({ itinerary, _id: id }, i) => (
              <Col
                xs={12}
                md={4}
                lg={3}
                key={id}
                className="d-flex justify-content-center"
              >
                <SingleItinerary
                  index={i}
                  singleItinerary={itinerary}
                  id={id}
                  tripChanged={tripChanged}
                  setTripChanged={() => setTripChanged((count) => count + 1)}
                />
                //{" "}
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default AddItinerary;
