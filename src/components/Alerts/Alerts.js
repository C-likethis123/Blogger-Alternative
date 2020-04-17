import React, { Component } from "react";
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

class SaveAlert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.isSuccessful ? (
          <Success showAlert={this.props.showAlert} />
        ) : (
          <Failure showAlert={this.props.showAlert} />
        )}
      </div>
    );
  }
}

export default SaveAlert;
