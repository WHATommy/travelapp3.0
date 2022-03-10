import React, { useEffect, useState } from 'react'
import { Modal, Nav, Form, Button, Alert} from "react-bootstrap";
import { registerUser, loginUser } from "../../utils/auth";

function SignUpAndLogin() {
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [errorMsg, setErrorMsg] = useState(null);
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
        setUser({
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        });
        if(e.target.name == "redirectToLogin") {
            handleShowSignUp();
            handleShowLogin();
        } else {
            handleShowLogin();
            handleShowSignUp();
        }
    }
    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        if(e.target.name == "signupForm") {
            await registerUser(user, setErrorMsg, handleShowSignUp);
        }
        if(e.target.name == "loginForm") {
            await loginUser(user, setErrorMsg, handleShowLogin);
        }
    }

    return ( 
        <>
            <Nav.Link onClick={handleShowSignUp}>Sign Up</Nav.Link>
            <Modal show={showSignUp} onHide={handleShowSignUp} onExit={() => setErrorMsg(null)} dialogClassName="signupModal">
                {
                    errorMsg !== null ? 
                    <Alert
                        variant='danger'
                        onClose={() => setErrorMsg(null)}
                        dismissible
                    >
                        { errorMsg.map(error => <p>{error.msg}</p>) }
                    </Alert> 
                    : 
                    <></>
                }
                <Modal.Header closeButton>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Form name="signupForm" error={errorMsg !== null} className="p-3" onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            name="email"
                            type="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            name="username"
                            type="text" 
                            placeholder="Enter username" 
                            value={username}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            name="password"
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            name="confirmPassword"
                            type="password" 
                            placeholder="Confirm password" 
                            value={confirmPassword}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Need a account? <a className="float-right" name="redirectToLogin" onClick={redirectModal}>Sign in</a></Form.Label>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </div>
                </Form>
            </Modal>


            <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>
            <Modal show={showLogin} onHide={handleShowLogin} onExit={() => setErrorMsg(null)} dialogClassName="loginModal">
                {
                    errorMsg ? 
                    <Alert
                        variant='danger'
                        onClose={() => setErrorMsg(null)}
                        dismissible
                    >
                        { errorMsg.map(error => <p>{error.msg}</p>) }
                    </Alert> 
                    : 
                    <></>
                }
                <Modal.Header closeButton>
                    <Modal.Title>Sign in</Modal.Title>
                </Modal.Header>
                <Form name="loginForm" error={errorMsg !== null} className="p-3" onSubmit={submitForm}> 
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
                        <Form.Label>Already have a account? <a className="float-right" name="redirectToSignUp" onClick={redirectModal}>Sign up</a></Form.Label>
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default SignUpAndLogin