import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavLink, NavItem } from "reactstrap";

const Header = () => {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Blogger Alternative</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/posts">
              Posts
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={Link} to="/create">
              Create
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
}

export default Header;
