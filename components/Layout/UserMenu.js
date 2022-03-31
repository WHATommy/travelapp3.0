import React, { useEffect, useState } from 'react'
import { Modal, Nav, Form, Button, Alert, NavDropdown } from "react-bootstrap";
import { destroyCookie } from 'nookies';
import { handleLogout, updateAccount, updatePassword } from "../../utils/auth";

function UserMenu(user) {
    const [account, setAccount] = useState({
        email: user.email,
        username: user.username,
        prevPassword: '', 
        newPassword: '', 
        confirmNewPassword: ''
    });
    const { email, username, prevPassword, newPassword, confirmNewPassword } = account;
    const [errorMsg, setErrorMsg] = useState(null);
    const [accountModal, setAccountModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true);


    useEffect(() => {
        if(accountModal) {
            email === user.email && username === user.username ? setBtnDisable(true) : setBtnDisable(false);
        }
        if(passwordModal) {
            prevPassword.length === 0 || newPassword.length === 0 || confirmNewPassword.length === 0 ? setBtnDisable(true) : setBtnDisable(false);
        }
    }, [account]);

    const onChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    }

    const handleAccountModal = () => {
        setAccount({...account, email: user.email, username: user.username});
        setAccountModal(!accountModal);
        setBtnDisable(true);
    }
    const handlePasswordModal = () => {
        setAccount({...account, prevPassword: '', newPassword: '', confirmNewPassword: ''});
        setPasswordModal(!passwordModal);
        setBtnDisable(true);
    }
    const logout = () => {
        handleLogout();
    }

    const submitAccountForm = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        updateAccount(username, email, setErrorMsg);
    }

    const submitPasswordForm = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        updatePassword(prevPassword, newPassword, confirmNewPassword, setErrorMsg);
    }

    return ( 
        <>
            <NavDropdown.Item onClick={handleAccountModal}>Edit Account</NavDropdown.Item>
            <Modal show={accountModal} onHide={handleAccountModal} onExit={() => setErrorMsg(null)} dialogClassName="accountModal">
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

            <NavDropdown.Item onClick={handlePasswordModal}>Change password</NavDropdown.Item>
            <Modal show={passwordModal} onHide={handlePasswordModal} onExit={() => setErrorMsg(null)} dialogClassName="passwordModal">
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
                            name="prevPassword"
                            type="password" 
                            value={prevPassword}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <hr></hr>
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
                        <Button variant="primary" type="submit" disabled={btnDisable}>
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