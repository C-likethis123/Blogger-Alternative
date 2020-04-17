import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavLink, NavItem } from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Blogger Alternative</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/create">
                Create
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
