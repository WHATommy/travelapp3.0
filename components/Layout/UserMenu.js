import React, { useEffect, useState } from 'react'
import { Modal, Nav, Form, Button, Alert, NavDropdown } from "react-bootstrap";
import { destroyCookie } from 'nookies';
import { handleLogout, updateAccountInfo } from "../../utils/auth";

function UserMenu(user) {
    const [account, setAccount] = useState({
        email: user.email,
        username: user.username,
        oldPassword: '', 
        newPassword: '', 
        confirmNewPassword: ''
    });
    const { email, username, oldPassword, newPassword, confirmNewPassword } = account;
    const [errorMsg, setErrorMsg] = useState(null);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true);


    useEffect(() => {
        account.email === user.email && account.username === user.username ? setBtnDisable(true) : setBtnDisable(false);
    }, [account]);

    const onChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    }

    const handleBtnDisable = () => {

    }

    const handleShowAccountModal = () => {
        setAccount({...account, email: user.email, username: user.username});
        setShowAccountModal(!showAccountModal);
    }
    const handleShowPasswordModal = () => {
        setShowPasswordModal(!showPasswordModal);
    }
    const logout = () => {
        handleLogout();
    }

    const submitAccountForm = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        updateAccountInfo(account.username, account.email, setErrorMsg);
    }

    const submitPasswordForm = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
    }

    return ( 
        <>
            <NavDropdown.Item onClick={handleShowAccountModal}>Edit Account</NavDropdown.Item>
            <Modal show={showAccountModal} onHide={handleShowAccountModal} onExit={() => setErrorMsg(null)} dialogClassName="accountModal">
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
                    <Modal.Title>Edit Account</Modal.Title>
                </Modal.Header>
                <Form name="signupForm" error={errorMsg !== null} className="p-3" onSubmit={submitAccountForm}>
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
                        <Button variant="primary" type="submit" disabled={btnDisable}>
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>

            <NavDropdown.Item onClick={handleShowPasswordModal}>Change password</NavDropdown.Item>
            <Modal show={showPasswordModal} onHide={handleShowPasswordModal} onExit={() => setErrorMsg(null)} dialogClassName="passwordModal">
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
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Form name="signupForm" error={errorMsg !== null} className="p-3" onSubmit={submitPasswordForm}>
                <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Old password</Form.Label>
                        <Form.Control 
                            name="oldPassword"
                            type="password" 
                            value={oldPassword}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>New password</Form.Label>
                        <Form.Control 
                            name="newPassword"
                            type="password" 
                            value={newPassword}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirm new password</Form.Label>
                        <Form.Control 
                            name="confirmNewPassword"
                            type="password" 
                            value={confirmNewPassword}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </div>
                </Form>
            </Modal>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </>
    )
}

export default UserMenu