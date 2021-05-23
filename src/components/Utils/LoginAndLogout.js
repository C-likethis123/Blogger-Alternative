import React, { useContext } from "react";
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { AuthContext } from '../../contexts/AuthContext';
import { google } from "../../keys";

const LoginAndLogout = () => {
  const { isAuthenticated, setAccessToken, logout } = useContext(AuthContext);
  const onSuccess = (response) => {
    console.log(response);
    setAccessToken(response.accessToken);
  }

  const onFailure = (response) => {
    console.log('failure');
  }

  return (
    <>
      {
        isAuthenticated ?
          <GoogleLogout
            clientId={google.clientID}
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
          :
          <GoogleLogin
            clientId={google.clientID}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
      }
    </>
  );
}

export default LoginAndLogout;
