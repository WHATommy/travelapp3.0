import React from "react";
import { parseCookies } from 'nookies';
import { useState, Fragment, useEffect } from 'react'
import { Button, Nav, Tab, Row, Col, ToggleButton, ButtonGroup } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import baseUrl from '../utilsServer/baseUrl';
import axios from "axios"; 

function Dashboard({ user, trips }) {
    const [radioValue, setRadioValue] = useState('home');
    console.log("TRIPS: " + trips);

    return (
        <Fragment>
            <Tab.Container id="" defaultActiveKey="Home">
                <Row>
                    <Col sm={2} className="p-0 text-center">
                        <Nav variant="pills" className="flex-column">
                            <ButtonGroup>
                                <ToggleButton>
                                    Home
                                </ToggleButton>
                            </ButtonGroup>
                            <ButtonGroup>
                                {trips.map(trip => (
                                    <ToggleButton id={trip._id}>
                                        {trip.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </Nav>
                        <div className="d-grid gap-2">
                            <Button variant="success">
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Tab.Container>
        </Fragment>
    )
}

Dashboard.getInitialProps = async ctx => {
    const { token } = parseCookies(ctx);
    if(!token) {
        return { trips: [] };
    }
    const payload = { headers: { token: token } };
    const url = `${baseUrl}/api/trip/`;
    const res = await axios.get(url, payload);
    return { trips: res.data };
}

export default Dashboard;