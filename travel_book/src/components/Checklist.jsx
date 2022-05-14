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
      <Row className="d-flex justify-content-center">
        <Col>
          {" "}
          <div className="title_details">Pre-travel Checklist</div>
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
                <span className="checklist_span">Transport</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span className="checklist_span">Accommodation</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span className="checklist_span">Insurance</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span className="checklist_span">Car rental</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span className="checklist_span">Driving license</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span className="checklist_span">Visa</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span className="checklist_span">Vaccination</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span className="checklist_span">Currency exchange</span>
              </label>
              <label>
                <input type="checkbox" />
                <i></i>
                <span className="checklist_span">Buy a SIM card</span>
              </label>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Checklist;
