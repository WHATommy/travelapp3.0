import React, { useEffect, useState } from 'react'
import { Modal, Nav, Form, Button, Alert} from "react-bootstrap";
import { destroyCookie } from 'nookies';
import { registerUser, loginUser, handleLogout } from "../../utils/auth";

function UserMenu(user) {
    const [account, setAccount] = useState({
        email: user.email,
        username: user.username,
        newPassword: "",
        confirmNewPassword: ""
    });

    const { email, username, newPassword, confirmNewPassword } = account;
    const [errorMsg, setErrorMsg] = useState(null);
    const [showAccount, setShowAccount] = useState(false);

    const onChange = (e) => {
        setUser({ ...account, [e.target.name]: e.target.value });
    }
    const handleShowAccount = () => {
        setShowAccount(!showAccount);
    }
    const logout = () => {
        handleLogout();
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
    }

    return ( 
        <>
            <Nav.Link onClick={handleShowAccount}>Edit Account</Nav.Link>
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
                            value={username}
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