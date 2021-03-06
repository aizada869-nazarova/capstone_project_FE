import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Card, Container, Row, Col, Image } from "react-bootstrap";

function UploadPic() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const [tripChanged, setTripChanged] = useState(0);
  const url = "https://personal-travel-book.herokuapp.com/visitedCountry";
  let { visitedCountry } = useParams();
  const addPostFunction = async (e) => {
    e.preventDefault();
    //  ;
    //     try {
    //         const token = localStorage.getItem("accessToken")
    //       const res = await fetch(`${url}/${visitedCountry}/uploadPictures`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json",
    //         Authorization: "Bearer " + token, },

    //         body: JSON.stringify({
    //           images: imageSrc
    //         }),
    //       });
    //       if (res.ok) {
    //         const data = await res.json();
    //         if (selectedFile !== null) {
    //           addImage(data._id);
    //         }
    //       } else {
    //         console.error("fetch failed");
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    const addImage = async (id) => {
      const token = localStorage.getItem("accessToken");
      let fd = new FormData();
      fd.append("exp-image", selectedFile);
      try {
        const res = await fetch(`${url}/${visitedCountry}/uploadPictures`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: fd,
        });
        if (res.ok) {
          const data = await res.json();
          setTripChanged((count) => count + 1);
        } else {
          console.error("fetch failed");
        }
      } catch (error) {
        console.error(error);
      }
    };
  };
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col>
            <div className="title_details" style={{ color: "black" }}>
              Upload pictures
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="d-flex justify-content-center mt-3">
            <Form.Group>
              <Form.File
                className="position-relative"
                required
                name="file"
                type="file"
                //   isInvalid={!!errors.file}
                //   feedback={errors.file}
                id="validationFormik107"
                feedbackTooltip
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                  setImageSrc(URL.createObjectURL(e.target.files[0]));
                  console.log(selectedFile);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        {selectedFile && (
          <Container>
            <Row>
              <Col xs={6} md={6}>
                <Image src={imageSrc} thumbnail />
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </>
  );
}

export default UploadPic;
