import React from "react";
import "../styles/MainHome.css";
import travel from "../assets/travel.png";
import { Container, Row, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MainHome() {
  const navigate = useNavigate();
  return (
    <Container className="main_home">
      <div className="main_text">
        <h1 className="main_title">Travel Made Easy</h1>
        <div className="subtittle">
          <h6>
            Travel planner helps you to organise your trip and keep all the
            information about your trp in one place. No more switching between
            different apps, tabs, and tools to keep track of your travel plans.
          </h6>
        </div>

        <Row>
          <Col>
            <Button
              className="home_button"
              variant="outline-secondary"
              onClick={() => {
                navigate(`/register`);
              }}
            >
              Sign up
            </Button>{" "}
          </Col>
          <Col>
            <Button
              className="home_button"
              variant="outline-secondary"
              onClick={() => {
                navigate(`/login`);
              }}
            >
              Sign in
            </Button>{" "}
          </Col>
        </Row>
      </div>
      <div className="hero-image">
        <img src={travel} alt="travel" />
      </div>
    </Container>
  );
}

export default MainHome;
