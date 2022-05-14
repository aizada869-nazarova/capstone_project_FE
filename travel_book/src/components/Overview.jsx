import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "../styles/Overview.css";
import NavbarOfTrip from "./NavbarOfTrip";
import { format, parseISO } from "date-fns";
import Moment from "moment";
const Overview = ({ trip }) => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <NavbarOfTrip />
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col>
            {" "}
            <div className="title_details">Destination Overview</div>
          </Col>
        </Row>
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
                      <strong>From city name:</strong>{" "}
                    </td>
                    <td className="white_text">{trip.fromCityName}</td>
                    <td className="orange_text">
                      <strong>From country name:</strong>
                    </td>
                    <td className="white_text">{trip.fromCountryName}</td>
                  </tr>
                  <tr>
                    <td className="orange_text">
                      <strong>To city name:</strong>{" "}
                    </td>
                    <td className="white_text">{trip.toCityName}</td>
                    <td className="orange_text">
                      <strong>To country name:</strong>
                    </td>
                    <td className="white_text">{trip.toCountryName}</td>
                  </tr>
                  <tr>
                    <td className="orange_text">
                      <strong>Departure date</strong>
                    </td>
                    <td className="white_text">
                      {Moment(trip.departureDate).format("DD-MM-YYYY")}
                    </td>
                    <td className="orange_text">
                      <strong> Departure time</strong>
                    </td>
                    <td className="white_text">{trip.departureTime}</td>
                  </tr>
                  <tr>
                    <td className="orange_text">
                      <strong>Arrival date</strong>
                    </td>
                    <td className="white_text">
                      {Moment(trip.arrivalDate).format("DD-MM-YYYY")}
                    </td>
                    <td className="orange_text">
                      <strong>Arrival time</strong>
                    </td>

                    <td className="white_text">{trip.arrivalTime}</td>
                  </tr>
                  <tr>
                    <td className="orange_text">
                      <strong>Transport</strong>
                    </td>
                    <td className="white_text">{trip.transport}</td>
                    <td className="orange_text">
                      <strong>Travel with</strong>
                    </td>

                    <td className="white_text">{trip.travelWith} </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Overview;
