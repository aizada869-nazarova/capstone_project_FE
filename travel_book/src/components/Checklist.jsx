import React from "react";
import "../styles/Checklist.css";
import { Container, Row, Col } from "react-bootstrap";
import NavbarOfTrip from "./NavbarOfTrip";
// import "../styles/Overview.css"
function Checklist() {
  return (
    <Container fluid className="overview_bg">
      <Row>
        <Col>
          <NavbarOfTrip />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="d-flex justify-content-center">
          <div className="list_checklist text size ">
            <h4>What to arrange before trip</h4>
            <div className="px-3 pb-3">
              <label>
                <input type="checkbox" />
                <i></i>
                <span>Transport</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span className="text">Accommodation</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span>Insurance</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span>Car rental</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span>Driving license</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span>Visa</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span>Vaccination</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span>Currency exchange</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span>Buy a SIM card</span>
              </label>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Checklist;
