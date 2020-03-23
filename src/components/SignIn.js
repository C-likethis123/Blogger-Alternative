import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientID: "50237112021-uubtivq4kujds2el4i0833bfjrm4fhs4.apps.googleusercontent.com",
      isSignedIn: false,
    }
  }

  onSuccess = response => {
    this.props.history.push("/blog");
  };

  onFailure = response => {
    console.log("failed!");
  };

  render() {
    if (this.state.isSignedIn) {
      return (
        <GoogleLogout
          clientId={this.state.clientID}
          buttonText="Logout"
          onLogoutSuccess={this.logout}
        />
      );
    } else {
      return (<GoogleLogin
        clientId={this.state.clientID}
        buttonText="Login"
        cookiePolicy={"single_host_origin"}
        onSuccess={this.onSuccess}
        onFailure={this.onFailure}
        isSignedIn={true}
      />);
    }
  }
}

export default SignIn;
