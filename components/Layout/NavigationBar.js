import React from "react"
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button, Offcanvas, DropdownButton, Dropdown } from "react-bootstrap";
import SignUpAndLogin from "./SignUpAndLogin"

function NavigationBar() {
  return (
    <Navbar variant="dark" bg="dark" expand="{false}">
        <Container>
            <Navbar.Brand href="#home">Website Name Here</Navbar.Brand>
            <NavDropdown title="Menu" id="collasible-nav-dropdown" align="end">
              <SignUpAndLogin />
            </NavDropdown>
        </Container>
    </Navbar>
  )
}

export default NavigationBar