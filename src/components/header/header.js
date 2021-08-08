import * as React from 'react';
import './header.scss';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Quotes App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Authors</Nav.Link>
        <Nav.Link href="/quotes">Quotes</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header;