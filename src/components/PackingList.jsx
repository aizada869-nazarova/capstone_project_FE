import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ListGroup,
  Form,
  Card,
  Nav,
  Link,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import SingleList from "./SingleList";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import "../styles/Background.css";
import NavbarOfTrip from "./NavbarOfTrip";

function PackingList() {
  let { travelId } = useParams();

  const url = `http://localhost:3001/travels/${travelId}/pakinglist`;
  const token = localStorage.getItem("accessToken");

  const [packinglists, setPakinglists] = useState([]);
  const [addTrip, setAddTrip] = useState(false);
  const [tripChanged, setTripChanged] = useState(0);
  const [nameOfItem, setNameOfItem] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const pakinglist = {
      nameOfItem: nameOfItem,
      category: category,
    };
    try {
      const token = localStorage.getItem("accessToken");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(pakinglist),
      }).then((response) => {
        // console.log(response);
        if (response.ok) {
          fetchPackingLists();
          setTripChanged((count) => count + 1);
        } else {
          alert("fetch failed");
        }
      });
      console.log("enteredValue", pakinglist);
    } catch (error) {
      console.error(error, "from catch");
    }
  };

  const fetchPackingLists = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const newData = await response.json();
        console.log(newData);
        setPakinglists(newData);
      } else {
        console.log("fetch failed on line 30");
      }
    } catch (error) {
      console.log("I am catch error from line 33", error);
    }
  };

  useEffect(() => {
    fetchPackingLists();
  }, [tripChanged]);

  return (
    <>
      <Container fluid className="paking_back">
        <Row>
          <Col>
            <NavbarOfTrip />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col>
            {" "}
            <div className="title_details">Packing List</div>
          </Col>
        </Row>

        <Row className="input_margin ">
          <Col xs={12} md={12} className=" justify-content-center">
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col xs={12} md={6}>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        <CardTravelIcon />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Name of item"
                      aria-label="Name of item"
                      aria-describedby="Name of item"
                      name="nameOfItem"
                      value={nameOfItem}
                      onChange={(e) => setNameOfItem(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Col>
                <Col xs={12} md={4}>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <strong>Category</strong>
                      </InputGroup.Text>
                    </InputGroup.Prepend>

                    <Form.Control
                      as="select"
                      name="cathegory"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="clothing">Clothing</option>
                      <option value="toiletries">Toiletries</option>
                      <option value="medications">Medications</option>
                      <option value="accessories">Accessories</option>
                      <option value="electronics">Electronics</option>
                      <option value="documents">Documents</option>
                      <option value="other">Other</option>
                    </Form.Control>
                  </InputGroup>
                </Col>
                <Col xs={"auto"}>
                  <Button
                    type="submit"
                    variant="outline"
                    className="mb-4"
                    style={{ background: "#fc6401", width: "6rem" }}
                  >
                    <strong>Add</strong>
                  </Button>
                </Col>
              </Row>
            </Form>
            <Row className="d-flex">
              {packinglists &&
                packinglists.map(({ nameOfItem, _id, category }, i) => (
                  <Col
                    xs={12}
                    md={12}
                    lg={2}
                    key={_id}
                    className="d-flex justify-content-center"
                  >
                    <SingleList
                      index={i}
                      nameOfItem={nameOfItem}
                      id={_id}
                      category={category}
                      tripChanged={tripChanged}
                      setTripChanged={() =>
                        setTripChanged((count) => count + 1)
                      }
                    />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PackingList;
