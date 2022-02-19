import React, { useEffect, useState } from 'react'
import { Modal, Nav, Form, Button} from "react-bootstrap";

function SignUpAndLogin() {
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    
    const { email, username, password, confirmPassword } = user;
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const handleShowSignUp = () => {
        setShowSignUp(!showSignUp);
    }
    const handleShowLogin = () => {
        setShowLogin(!showLogin);
    }
    const redirectModal = (e) => {
        e.preventDefault();
        if(e.target.name == "redirectToLogin") {
            handleShowSignUp();
            handleShowLogin();
        } else {
            handleShowLogin();
            handleShowSignUp();
        }
    }
    const submitForm = (e) => {
        e.preventDefault();
        
        if(e.target.name == "signupForm") {
            console.log(email, username, password, confirmPassword);
        }
        if(e.target.name == "loginForm") {
            console.log(email, password);
        }
    }

    return ( 
        <>
            <Nav.Link onClick={handleShowSignUp}>Sign Up</Nav.Link>
            <Modal show={showSignUp} onHide={handleShowSignUp} dialogClassName="signupModal">
                <Modal.Header closeButton>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Form name="signupForm" className="p-3" onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            name="email"
                            type="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            name="username"
                            type="text" 
                            placeholder="Enter username" 
                            value={username}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            name="password"
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            name="confirmPassword"
                            type="password" 
                            placeholder="Confirm password" 
                            value={confirmPassword}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Need a account? <Button className="float-right" name="redirectToLogin" onClick={redirectModal}>Sign in</Button></Form.Label>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Continue
                    </Button>
                </Form>
            </Modal>
            <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>
            <Modal show={showLogin} onHide={handleShowLogin} dialogClassName="loginModal">
                <Modal.Header closeButton>
                    <Modal.Title>Sign in</Modal.Title>
                </Modal.Header>
                <Form name="loginForm" className="p-3" onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            name="email"
                            type="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            name="password"
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Already have a account? <Button className="float-right" name="redirectToSignUp" onClick={redirectModal}>Sign up</Button></Form.Label>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Continue
                    </Button>
                </Form>
            </Modal>
        </>
    )
}

export default SignUpAndLogin