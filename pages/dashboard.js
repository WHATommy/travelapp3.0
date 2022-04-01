import { parseCookies } from 'nookies';
import { useState, Fragment, useEffect } from 'react'
import { Modal, Button, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import baseUrl from '../utilsServer/baseUrl';
import axios from "axios"; 
import moment from "moment";
import { createTrip } from "../utils/trip";

function Dashboard({ user, trips }) {
    const [newTrip, setNewTrip] = useState({
        name: "",
        location: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: ""
    });

    const { name, location, startDate, endDate, startTime, endTime } = newTrip;
    const [errorMsg, setErrorMsg] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleTripForm = () => {
        setShowForm(!showForm);
    }

    const submitTripForm = async (e) => {
        e.preventDefault();
        const trip = {
            name, location, startDate, endDate, startTime, endTime
        }
        createTrip(trip, setErrorMsg, handleTripForm);
    }

    const onChange = (e) => {
        setNewTrip({ ...newTrip, [e.target.name]: e.target.value });
    }
    return (
        <Fragment>
            <Row xs={1} md={4} className="g-4 mt-3 text-center">
                {trips.map(trip => (
                    <Col>
                        <Card style={{minheight: "271px"}}>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title className="pb-2">{trip.name}</Card.Title>
                                <hr></hr>
                                <Card.Text>
                                    <p>Location: { trip.location ? trip.location : "TBD" } </p>
                                    <p>Start Date: { trip.startDate ? moment(trip.startDate).utc().format("MM-DD-YYYY") : "TBD" }</p>
                                    <p>End Date: { trip.endDate ? moment(trip.endDate).utc().format("MM-DD-YYYY") : "TBD" }</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                <Col onClick={() => handleTripForm()}>
                    <Card style={{height: "271px"}}>
                        <Card.Body style={{paddingTop: "110px", backgroundColor: "#c7f2d2"}}>
                            Add new trip
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            <Modal show={showForm} onHide={handleTripForm} onExit={() => setErrorMsg(null)} dialogClassName="formModal">
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
                    <Modal.Title>Create new trip</Modal.Title>
                </Modal.Header>
                <Form name="tripForm" error={errorMsg !== null} className="p-3" onSubmit={submitTripForm}> 
                    <Form.Group className="mb-3" controlId="formTripName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            name="name"
                            type="text" 

                            value={name}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTripLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control 
                            name="location"
                            type="text" 
                            value={location}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <hr />
                    <Form.Group className="mb-3" controlId="formTripStartDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control 
                            name="startDate"
                            type="date" 
                            value={startDate}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTripStartTime">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control 
                            name="startTime"
                            type="time" 
                            value={startTime}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <hr />
                    <Form.Group className="mb-3" controlId="formTripEndDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control 
                            name="endDate"
                            type="date" 
                            value={endDate}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTripEndTime">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control 
                            name="endTime"
                            type="time"  
                            value={endTime}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </div>
                </Form>
            </Modal>
        </Fragment>
    )
}


Dashboard.getInitialProps = async ctx => {
    const { token } = parseCookies(ctx);
    const payload = { headers: { token: token } };
    const url = `${baseUrl}/api/trip/`;
    const res = await axios.get(url, payload);
    return { trips: res.data };
}

export default Dashboard;