import React from "react";
import {
  Form,
  Col,
  Row,
  Container,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";

function Register() {
  const navigate = useNavigate();
  const url = "https://personal-travel-book.herokuapp.com/users/register";
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
    <div className="body_back">
      <Container className="d-flex justify-content-center login align-self-center align-center">
        <Row className="d-flex justify-content-center main_form">
          <Col md={12}>
            <Form onSubmit={handleSubmit}>
              <Container>
                <h1 className="mb-5 mt-4 text-dark">
                  <strong>Register</strong>
                </h1>
                <Row>
                  <Col md={12}>
                    {/* <Form.Label className="text-dark">
                    <strong>Username</strong>
                  </Form.Label> */}
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          {" "}
                          <PersonIcon />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        id="inlineFormInputGroup"
                        placeholder="username"
                        type="text"
                        value={data.userName}
                        onChange={(e) => {
                          handleChange("userName", e.target.value);
                        }}
                        required
                      />
                    </InputGroup>
                    {/* <Form.Control
                    className="rounded-pill"
                    id="username"
                    type="text"
                   
                    value={data.userName}
                    onChange={(e) => {
                      handleChange("userName", e.target.value);
                    }}
                  /> */}
                  </Col>
                  <Col md={12}>
                    {/* <Form.Label className="text-dark">
                    <strong>Surname</strong>
                  </Form.Label> */}
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <SupervisorAccountOutlinedIcon />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        id="surname"
                        placeholder="user surname"
                        type="text"
                        value={data.surname}
                        onChange={(e) => {
                          handleChange("surname", e.target.value);
                        }}
                        required
                      />
                    </InputGroup>
                    {/* <Form.Control
                    className="rounded-pill"
                    id="surname"
                    type="text"
                    placeholder="Enter surname"
                    value={data.surname}
                    onChange={(e) => {
                      handleChange("surname", e.target.value);
                    }}
                  /> */}
                  </Col>
                  <Col md={12}>
                    {/* <Form.Label className="text-dark">
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
                  /> */}
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <AlternateEmailIcon />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        id="email"
                        type="email"
                        placeholder="enter email"
                        value={data.email}
                        onChange={(e) => {
                          handleChange("email", e.target.value);
                        }}
                        required
                      />
                    </InputGroup>
                  </Col>

                  <Col md={12}>
                    {/* <Form.Label className="text-dark">
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
                  /> */}
                    <InputGroup className="mb-4">
                      <InputGroup.Prepend className="icon_background">
                        <InputGroup.Text className="icon_background">
                          <LockIcon />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        id="password"
                        type="password"
                        placeholder="enter password"
                        value={data.password}
                        onChange={(e) => {
                          handleChange("password", e.target.value);
                        }}
                        required
                      />
                    </InputGroup>
                  </Col>

                  <Col md={12}>
                    <Button
                      className="login_button "
                      variant="outline-light"
                      type="submit"
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
    </div>
  );
}

export default Register;
