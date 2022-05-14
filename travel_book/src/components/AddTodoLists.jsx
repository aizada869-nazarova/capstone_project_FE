import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import SingleTodoList from "./SingleTodoList";

const AddTodoLists = (props) => {
  const itinId = props.itineraryId;
  console.log(itinId);

  const url = `http://localhost:3001/itinerary`;
  const [todoLists, setTodoLists] = useState([]);

  const [tripChanged, setTripChanged] = useState(0);

  const [singleTodoList, setSingleTodoList] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const plan = {
      todo: singleTodoList,
    };
    try {
      const token = localStorage.getItem("accessToken");
      fetch(`${url}/${itinId}/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(plan),
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          fetchTodoLists();
          setTripChanged((count) => count + 1);
        } else {
          alert("fetch failed");
        }
      });
      console.log("enteredValue", plan);
    } catch (error) {
      console.error(error, "from catch");
    }
  };

  const fetchTodoLists = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${url}/${itinId}/todo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const newData = await response.json();
        console.log(newData);
        setTodoLists(newData);
      } else {
        console.log("fetch failed on line 86");
      }
    } catch (error) {
      console.log("I am catch error from line 90");
    }
  };

  useEffect(() => {
    fetchTodoLists();
  }, [tripChanged]);

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">T</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="enter todo "
                  aria-label="todo"
                  aria-describedby="todo"
                  name="singleTodoList"
                  value={singleTodoList}
                  onChange={(e) => setSingleTodoList(e.target.value)}
                  required
                />
              </InputGroup>
            </Col>

            <Col xs="auto">
              <Button
                type="submit"
                className="mb-2"
                style={{ background: "#ce9f11" }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        {/* </Container>

 
 <Container>
            <Row> */}
        {todoLists &&
          todoLists.map(({ todo, _id: id }, i) => (
            // <Col
            //   xs={12}

            //   key={id}
            //   className="d-flex justify-content-center"
            // >
            <SingleTodoList
              itineraryid={itinId}
              index={i}
              singleTodoList={todo}
              id={id}
              tripChanged={tripChanged}
              setTripChanged={() => setTripChanged((count) => count + 1)}
            />
            // </Col>
          ))}
        {/* </Row> */}
      </Container>
    </>
  );
};

export default AddTodoLists;
