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
import SinglePlace from "./SinglePlace";

const AddVisitPlace = (props) => {
  //   let { itineraryId } = useParams();
  const itinId = props.itineraryId;
  console.log(itinId);

  const url = `http://localhost:3001/itinerary`;
  const [toVisitPlaces, setToVisitPlaces] = useState([]);

  const [tripChanged, setTripChanged] = useState(0);

  const [singlePlace, setSinglePlace] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const plan = {
      place: singlePlace,
    };
    try {
      const token = localStorage.getItem("accessToken");
      fetch(`${url}/${itinId}/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(plan),
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          fetchToVisitPlaces();
          setTripChanged((count) => count + 1);
        } else {
          alert("fetch failed");
        }
      });
      console.log("enteredValue", plan);
    } catch (error) {
      console.error(error, "from catch");
    }
  };

  const fetchToVisitPlaces = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${url}/${itinId}/place`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const newData = await response.json();
        console.log(newData);
        setToVisitPlaces(newData);
      } else {
        console.log("fetch failed on line 86");
      }
    } catch (error) {
      console.log("I am catch error from line 90");
    }
  };

  useEffect(() => {
    fetchToVisitPlaces();
  }, [tripChanged]);

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">T</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="enter place and activity"
                  aria-label="Name of item"
                  aria-describedby="Name of item"
                  name="singlePlace"
                  value={singlePlace}
                  onChange={(e) => setSinglePlace(e.target.value)}
                  required
                />
              </InputGroup>
            </Col>

            <Col xs="auto">
              <Button
                type="submit"
                className="mb-2"
                style={{ background: "#ce9f11" }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        {/* </Container>

 
 <Container>
            <Row> */}
        {toVisitPlaces &&
          toVisitPlaces.map(({ place, _id: id }, i) => (
            // <Col
            //   xs={12}
            //   md={3}
            //   lg={4}
            //   key={id}
            //   className="d-flex justify-content-center"
            // >
            <SinglePlace
              itineraryid={itinId}
              index={i}
              singlePlace={place}
              id={id}
              tripChanged={tripChanged}
              setTripChanged={() => setTripChanged((count) => count + 1)}
            />
            // </Col>
          ))}
        {/* </Row> */}
      </Container>
    </>
  );
};

export default AddVisitPlace;
