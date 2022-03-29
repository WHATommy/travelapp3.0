import React, { useEffect, useState } from 'react'
import { Modal, Nav, Form, Button, Alert} from "react-bootstrap";
import { registerUser, loginUser } from "../../utils/auth";

function UserMenu(user) {
    console.log(user)
    const [account, setAccount] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const { email, username, password, confirmPassword } = account;
    const [errorMsg, setErrorMsg] = useState(null);
    const [showAccount, setShowAccount] = useState(false);

    const onChange = (e) => {
        setUser({ ...account, [e.target.name]: e.target.value });
    }
    const handleShowAccount = () => {
        setShowAccount(!showAccount);
    }
    const logout = () => {
        destroyCookie(ctx, 'token');
        redirectUser(ctx, "/");
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
    }

    return ( 
        <>
            <Nav.Link onClick={handleShowAccount}>Account</Nav.Link>
            <Modal show={showAccount} onHide={handleShowAccount} onExit={() => setErrorMsg(null)} dialogClassName="signupModal">
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
                    <Modal.Title>Account</Modal.Title>
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
                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
        </>
    )
}

export default UserMenu