import React from "react";
import { Alert } from "reactstrap";

const Success = (props) => {
  return (
    <Alert
      color="success"
      style={
        props.showAlert ? { visibility: "visible" } : { visibility: "hidden" }
      }
    >
      Post is successfully saved!
    </Alert>
  );
};

const Failure = (props) => {
  return (
    <Alert
      color="danger"
      style={
        props.showAlert ? { visibility: "visible" } : { visibility: "hidden" }
      }
    >
      An error occurred when saving the post. Please try again later.
    </Alert>
  );
};

const SaveAlert = (props) => {
  return props.isSuccessful ? (
      <Success showAlert={props.showAlert} />
    ) : (
      <Failure showAlert={props.showAlert} />
    )
}

export default SaveAlert;
