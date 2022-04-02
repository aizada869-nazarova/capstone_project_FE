import React from "react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Register() {
  const navigate = useNavigate();
  const url = "http://localhost:3001/users/register";
  const [data, setData] = useState({
    userName: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        navigate("/login");
        setData({
          userName: "",
          surname: "",
          email: "",
          password: "",
        });
      } else {
        alert("Something went wrong :(");
      }
    });
    console.log("enteredValue", data);
  };

  const handleChange = (fieldName, value) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };
  return (
    <Container className="d-flex justify-content-center login align-self-center">
      <Row className="d-flex justify-content-center main_form">
        <Col md={12}>
          <Form onSubmit={handleSubmit}>
            <Container>
              <h1 className="mb-3 text-light">
                <strong>Register</strong>
              </h1>
              <Row>
                <Col md={12}>
                  <Form.Label className="text-dark">
                    <strong>Username</strong>
                  </Form.Label>

                  <Form.Control
                    className="rounded-pill"
                    id="email"
                    type="text"
                    placeholder="Enter username"
                    value={data.userName}
                    onChange={(e) => {
                      handleChange("userName", e.target.value);
                    }}
                  />
                </Col>
                <Col md={12}>
                  <Form.Label className="text-dark">
                    <strong>Surname</strong>
                  </Form.Label>

                  <Form.Control
                    className="rounded-pill"
                    id="surname"
                    type="text"
                    placeholder="Enter surname"
                    value={data.surname}
                    onChange={(e) => {
                      handleChange("surname", e.target.value);
                    }}
                  />
                </Col>
                <Col md={12}>
                  <Form.Label className="text-dark">
                    <strong>Email address</strong>
                  </Form.Label>

                  <Form.Control
                    className="rounded-pill"
                    type="email"
                    placeholder="Enter email"
                    value={data.email}
                    onChange={(e) => {
                      handleChange("email", e.target.value);
                    }}
                  />
                </Col>

                <Col md={12}>
                  <Form.Label className="text-dark">
                    <strong>Password</strong>
                  </Form.Label>
                
                  <Form.Control
                    className="rounded-pill"
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={data.password}
                    onChange={(e) => {
                      handleChange("password", e.target.value);
                    }}
                  />
                </Col>
             
                <Col md={12}
                >
                  <Button
                    variant="success"
                    type="submit"
                    className="rounded-pill"
                  >
                    Sign Up
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
