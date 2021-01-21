import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, NavbarBrand, Nav, NavLink, NavItem } from "reactstrap";
import Paths from '../../constants/paths';
import styled from 'styled-components';

const AppBar = styled(Navbar)`
  background-color: #212121;
`;

const Header = () => {
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
        </Nav>
      </Container>
    </AppBar>
  );
}

export default Header;
