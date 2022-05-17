import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <>
      <Spinner animation="grow" size="sm" variant="warning" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="warning" />
    </>
  );
}

export default Loading;
