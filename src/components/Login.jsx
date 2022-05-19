import React from "react";
import "../styles/Login.css";
import { FcGoogle } from "react-icons/fc";

import {
  Col,
  Form,
  Button,
  Row,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";
function Login() {
  const url = "https://personal-travel-book.herokuapp.com/users/login";
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        const users = await response.json();
        localStorage.setItem("accessToken", users.accessToken);
        navigate("/travels");

        setData({
          email: "",
          password: "",
        });
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (fieldName, value) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };
  return (
    <div className=" d-flex  body_back ">
      <Container className=" d-flex justify-content-center login align-self-center align-center">
        <Row className="d-flex justify-content-center main_form">
          <Col md={12}>
            <Form onSubmit={handleSubmit}>
              <Container>
                <Row>
                  <Col md={12}>
                    <h1 className="mb-4 mt-4 text-dark">
                      <strong>Login</strong>
                    </h1>
                  </Col>
                  <Col md={12}>
                    <Form.Label className="text-dark">Email address</Form.Label>
                    {/* <Form.Control
            className="rounded-pill bg-dark text-light"
            type="email"
            placeholder="Enter email"
            value={data.email}
            onChange={(e) => {
              handleInput("email", e.target.value);
            }}
          /> */}

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <AlternateEmailIcon />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        id="inlineFormInputGroup"
                        type="email"
                        placeholder="enter email"
                        value={data.email}
                        onChange={(e) => {
                          handleInput("email", e.target.value);
                        }}
                        required
                      />
                    </InputGroup>
                  </Col>
                  <Col md={12}>
                    <Form.Label className="text-dark mt-3">Password</Form.Label>
                    {/* <Form.Control
            className="rounded-pill"
            id="password"
            value={data.password}
            onChange={(e) => {
              handleInput("password", e.target.value);
            }}
            type="password"
            placeholder="Enter password"
          /> */}
                    <InputGroup className="mb-4">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <LockIcon />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        id="password"
                        value={data.password}
                        onChange={(e) => {
                          handleInput("password", e.target.value);
                        }}
                        type="password"
                        placeholder="enter password"
                        required
                      />
                    </InputGroup>
                  </Col>

                  <Col md={12}>
                    <Button
                      type="submit"
                      className="my-3 login_button"
                      variant="outline-light"
                    >
                      Sign in
                    </Button>
                  </Col>
                  <Col md={12}>
                    <Button
                      href="http://localhost:3001/users/googleLogin"
                      variant="outline-light"
                      type="submit"
                      className="google_button mb-4 "
                    >
                      <FcGoogle style={{ fontSize: "25px" }} />
                      Continue with Google
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
