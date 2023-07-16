import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, NavbarBrand, Nav, NavLink, NavItem } from "reactstrap";
import Paths from '../../constants/paths';
import styled from 'styled-components';
import axios from "axios";
import { useHistory } from "react-router-dom";

const AppBar = styled(Navbar)`
  background-color: #212121;
`;

const Header = () => {
    const history = useHistory();
    const logout = () => {
        axios
            .post("http://localhost:8000/logout")
            .then(() => history.push(Paths.Default));
        
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
            <button
            >
                <a href="http://localhost:8000/login/google">Login to Google</a>
            </button>
            <button onClick={logout}>Logout</button>
          </NavItem>
        </Nav>
      </Container>
    </AppBar>
  );
}

export default Header;
