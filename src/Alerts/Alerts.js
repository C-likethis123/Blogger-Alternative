import React, { Component } from 'react';
import { Alert } from "reactstrap";

const Success = (props) => {
  return (
    <Alert color="success">
      Post is successfully saved!
    </Alert>
  );
};

const Failure = (props) => {
  return (
    <Alert color="danger">
      An error occurred when saving the post. Please try again later.
    </Alert>
  );
};


class Alerts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>{this.props.showAlert ? this.props.isSuccessful ? <Success /> : <Failure /> : null}</div>);
  }
}

export default Alerts;
