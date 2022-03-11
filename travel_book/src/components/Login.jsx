import React from 'react'
import "./Login.css"
// import { FcGoogle } from "react-icons/fc"
import {Col, Form, Button, Row, Container} from "react-bootstrap"
import {Link} from "react-router-dom"

function Login() {
  return (
      <div className='body'>
    <Form className='main_form'>
    <Container>
          <Row className="d-flex justify-content-center">
            <Col md={6}>
            
              <h1 className="mb-5 text-light"><strong>WELCOME</strong></h1>
              
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control className='input-container d-flex' type="email" placeholder="Enter email" />
    
  </Form.Group>
  
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control className='input-container ' type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  </Col>
          </Row>
        </Container>
        
</Form>

</div>
  )
}

export default Login