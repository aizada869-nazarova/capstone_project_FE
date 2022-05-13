import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "../styles/Overview.css";
import NavbarOfTrip from "./NavbarOfTrip";
import { format, parseISO } from "date-fns"
import Moment from 'moment'
const Overview=({trip})=> {
  return (<>
    <Container fluid >
      <Row>
        <Col>
          <NavbarOfTrip />
        </Col>
      </Row>
     
      <Row className='d-flex justify-content-center'>
    <Col> <div className='title_details'>Trip planner</div></Col>
   </Row>
      <Row>
        <Col xs={12} className="d-flex justify-content-center mt-3">
          <div id="overview_card">
            <Table striped bordered hover className="my-5 overview_table d-flex align-items-center flex-direction-column">
            
              
                  {/* <th>#</th>
                  <th>First Name</th> */}
                
                  {/* <th>Username</th> */}
                
              <tbody>
                <tr>
                  <td ><strong >From city name:</strong> </td>
                  <td className="white_text">{trip.fromCityName}</td>
                  <td><strong>From country name:</strong></td>
                  <td className="white_text">{trip.fromCountryName}</td>
                </tr>
                <tr>
                  <td><strong>To city name:</strong> </td>
                  <td className="white_text">{trip.toCityName}</td>
                  <td><strong>To country name:</strong></td>
                  <td className="white_text">{trip.toCountryName}</td>
                </tr>
                <tr>
                  <td><strong>Departure date</strong></td>
                  <td className="white_text">{Moment(trip.departureDate).format('DD-MM-YYYY')}</td>
                  <td><strong> Departure time</strong></td>
                  <td className="white_text">{trip.departureTime}</td>
                </tr>
                <tr>
                  <td><strong>Arrival date</strong></td>
                  <td className="white_text">{Moment(trip.arrivalDate).format('DD-MM-YYYY')}</td>
                  <td><strong>Arrival time</strong></td>
                
                  <td className="white_text">{trip.arrivalTime}</td>
                </tr>
                <tr>
                  <td ><strong>Transport</strong></td>
                  <td className="white_text">{trip.transport}</td>
                  <td><strong>Travel with</strong></td>
                
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
}

export default Overview;
