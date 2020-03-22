import React, { Component } from "react";
import GoogleLogin from "react-google-login";

class SignIn extends Component {
  clientID =
    "AIzaSyDAhnFQxcN_mEXklbNYKRokeiZ__s4vYMA.apps.googleusercontent.com";

  onSuccess = (response) => {
    this.props.history.push("/blog");
  };

  onFailure = (response) => {
      console.log("failed!");
  }

  render() {
    return (
      <div>
        <GoogleLogin
          clientId={this.clientID}
          buttonText="Login"
          cookiePolicy={"single_host_origin"}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          isSignedIn={true}
        />
      </div>
    );
  }
}

export default SignIn;
