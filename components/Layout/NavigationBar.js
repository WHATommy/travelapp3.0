import React from "react"
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button, Offcanvas, DropdownButton, Dropdown } from "react-bootstrap";
import SignUpAndLogin from "./SignUpAndLogin";
import UserMenu from "./UserMenu";

function NavigationBar(user) {
  return (
    <Navbar variant="dark" bg="dark" expand="{false}">
        <Container>
            <Navbar.Brand href="/">Website Name Here</Navbar.Brand>
            {Object.keys(user).length === 0 ? 
              <NavDropdown title="Menu" id="guest-nav-dropdown" align="end">
                {
                  <SignUpAndLogin />
                }
              </NavDropdown>
              :
              <NavDropdown title={user.username} id="user-nav-dropdown" align="end">
                {
                  <UserMenu {...user} />
                }
              </NavDropdown>
            }
        </Container>
    </Navbar>
  )
}

export default NavigationBar