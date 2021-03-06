import React, { useEffect, useState } from "react";
import NavbarOfTrip from "./NavbarOfTrip";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
// import "../styles/Overview.css"
import Overview from "./Overview";
import AddAccomodation from "./AddAccomodation";
import Loading from "./Loading";
import Error from "./Error";

const TripDetails = () => {
  const [trip, setTrip] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  let { travelId } = useParams();
  console.log(travelId);
  const url = `https://personal-travel-book.herokuapp.com/travels/${travelId}`;
  const token = localStorage.getItem("accessToken");

  const fetchTrips = async () => {
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
        setTrip(newData);
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
  }, []);
  return (
    <>
      <Container fluid className=" overview_bg ">
        {isLoading === true && <Loading />}
        {isError === true && <Error />}
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <Overview trip={trip} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TripDetails;
