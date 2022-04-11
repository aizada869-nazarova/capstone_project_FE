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

  const transportArr = [
    "train",
    "plane",
    "bycecle"

  ]

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

  const handleCheckBox= (e)=>{
    if (e.target.checked) {
      setFormData({
        ...formData,
        transport: [...formData.transport, e.target.value],
      })
    } else {
      const transportMethod = formData.transport.filter(
        (method) => method !== e.target.value
      )
      console.log('newRecipieMethod', transportMethod)
      setFormData({
        ...formData,
        transport: [...transportMethod],
      })
    }
  }
  console.log(
    'formData.prepMethods out of handlePrepCheckboxes',
    formData.transport
  )
  
  

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
       
        <Form.Group>
        {transportArr.map((method) => (
                            <Form.Check
                              inline
                              key={`${method}`}
                              label={`${method}`}
                              name={`${method}`}
                              value={`${method}`}
                              onChange={handleCheckBox}

                              type="checkbox"
                              className="prepMethodsClass"
                            />
                          ))}
                           </Form.Group>
     
        
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
