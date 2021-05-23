import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, NavbarBrand, Nav, NavLink, NavItem } from "reactstrap";
import Paths from '../../constants/paths';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import { AuthContext } from '../../contexts/AuthContext';
import { google } from "../../keys";
const AppBar = styled(Navbar)`
  background-color: #212121;
`;

const Header = () => {
  const { setAccessToken } = useContext(AuthContext);
  const onSuccess = (response) => {
    console.log('success');
    setAccessToken(response.accessToken);
  }

  const onFailure = (response) => {
    console.log('failure');
  }

  return (
    <AppBar dark expand="md">
      <Container fluid="xl">
        <NavbarBrand href="/">Blogger Alternative</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to={Paths.PostsList}>
              Posts
            </NavLink>
          </NavItem>
          <NavItem>
            <GoogleLogin
              clientId={google.clientID}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
            />
          </NavItem>
        </Nav>
      </Container>
    </AppBar>
  );
}

export default Header;
