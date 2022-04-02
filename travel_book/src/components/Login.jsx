import React from 'react'
import "../styles/Login.css"
import { FcGoogle } from "react-icons/fc"
import {Col, Form, Button, Row, Container} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {useState} from "react"

function Login() {
  const url = "http://localhost:3001/users/login";
  const navigate = useNavigate()
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
        const users = await response.json()
       localStorage.setItem("accessToken", users.accessToken)
       navigate("/")
       
        setData({
          email: "",
          password: "",
        });
      } else {
        alert("Something went wrong!")
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
    // <div className='body d-flex'>
    

    <Container className='d-flex justify-content-center login align-self-center'>
      <Row className="d-flex justify-content-center main_form">
        <Col md={12}>
        <Form onSubmit={handleSubmit}  >
          <Container>
            <Row>

         <Col md={12}>
          <h1 className="mb-5 text-light"><strong>Log in</strong></h1>
          </Col>
          <Col md={12}>
          <Form.Label className="text-light">Email address</Form.Label>
          <Form.Control
            className="rounded-pill bg-dark text-light"
            type="email"
            placeholder="Enter email"
            value={data.email}
            onChange={(e) => {
              handleInput("email", e.target.value);
            }}
          />
          </Col>
          <Col md={12}>
          <Form.Label className="text-light">Password</Form.Label>
          <Form.Control
            className="rounded-pill"
            id="password"
            value={data.password}
            onChange={(e) => {
              handleInput("password", e.target.value);
            }}
            type="password"
            placeholder="Enter password"
          />
          </Col>
         
          <Col md={12}>
          <Button variant="success" type="submit" className="mr-3 rounded-pill">
            Sign in
          </Button>
          </Col>
          <Col md={12}>
          
          <Button href="http://localhost:3001/users/googleLogin" variant="light" type="submit" className=" ml-3 rounded-pill">
            <FcGoogle style={{ fontSize: "25px" }}/>
            Continue with Google
          </Button>
          </Col>
          
          </Row>
          </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  
     
  // </div>
  )
}

export default Login