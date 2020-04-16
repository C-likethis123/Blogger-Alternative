import React from "react";
import { Alert } from "reactstrap";

// TODO: Check why timeout does not work here
export const Success = (props) => {
  return (
    <Alert color="success" transition={{ timeout: 100 }}>
      Post is successfully saved!
    </Alert>
  );
};

export const Failure = (props) => {
  return (
    <Alert color="danger" transition={{ timeout: 100 }}>
      An error occurred when saving the post. Please try again later.
    </Alert>
  );
};
