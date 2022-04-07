import React, { useState } from "react";
import DisplayNewTrips from "./DisplayNewTrips";
import { Form, Button, Col } from "react-bootstrap";
import { FaPlane, FaShip } from "react-icons/fa";
const NewTripForm = (props) =>{
  const url = "http://localhost:3001/travels"

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    arrivalDate: "",
    transport: [],
    time: "",
    travelWith: [],
    userId:"624edd5d2e773b6d05fa070c"
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken")
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    Authorization: "Bearer " + token,
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        
        setFormData();
      } else {
        alert("Something went wrong :(");
      }
    });
    console.log("enteredValue",  formData);
  };

  
  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
   
  }
  
 
  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text"
            value={formData.from}
             onChange={(e) => {
              handleInputChange("from", e.target.value);
            }}
            required
          
            placeholder="Enter city, country" />
            
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" 
              value={formData.to}
             onChange={(e) => {
              handleInputChange("to", e.target.value);
            }}
            required
            placeholder="Enter city, country" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
            type="date"
            value={formData.departureDate}
            onChange={(e) => {
              handleInputChange("departureDate", e.target.value);
            }}
             placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="date"

             value={formData.arrivalDate}
             onChange={(e) => {
              handleInputChange("arrivalDate", e.target.value);
            }}
            placeholder="Password" />
          </Form.Group>
        </Form.Row>

        {["checkbox"].map((type) => (
          <div key={`inline-${type}`} className="mb-3 text-white">
            <Form.Check
              inline
              label={<FaShip />}
              name="group1"
              // checked={formData.transport}
            
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label={<FaPlane />}
              name="group1"
              // checked={formData.transport}
             
              type={type}
              id={`inline-${type}-2`}
            />
            <Form.Check
              inline
              label="2"
              name="group1"
              // checked={formData.transport}
              type={type}
              id={`inline-${type}-2`}
            />
            <Form.Check
              inline
              label="2"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
            />
            <Form.Check
              inline
              label="2"
              name="group1"
              checked={formData.transport}
              type={type}
              id={`inline-${type}-2`}
            />
            <Form.Check
              inline
              label="2"
              name="group1"
              checked={formData.transport}
              type={type}
              id={`inline-${type}-2`}
            />
          </div>
        ))}

        
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" 
             value={formData.time}
             onChange={(e) => {
              handleInputChange("time", e.target.value);
            }}
            placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text"
             value={formData.travelWith}
             onChange={(e) => {
              handleInputChange("travelWith", e.target.value);
            }}
            placeholder="Password" />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default NewTripForm;
