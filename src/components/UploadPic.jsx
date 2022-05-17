import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";

function UploadPic() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const [tripChanged, setTripChanged] = useState(0);
  const url = "http://localhost:3001/visitedCountry";
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
      {selectedFile && <img src={imageSrc} className="w-100" />}
      <Form.Group>
        <Form.File
          className="position-relative"
          required
          name="file"
          label="File"
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
    </>
  );
}

export default UploadPic;
