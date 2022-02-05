const express = require("express");
const Router = express.Router();
const { Trip, Event } = require("../models/TripModel");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const axios = require("axios");
const baseUrl = require("../utilsServer/baseUrl");

Router.post(
    "/:tripId",
    check("name", "The name of the trip is required").notEmpty(),
    check("location", "The location is required").notEmpty(),
    check("startDate", "The start date is required").notEmpty(),
    check("endDate", "The end date is required").notEmpty(),
    check("checkInTime", "The check in time is required").notEmpty(),
    check("checkOutTime", "The check out time is required").notEmpty(),
    authMiddleware,

    async (req, res) => {
        // Check if there are any invalid inputs
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Store request values into callable variables
        const {
            name,
            location,
            startDate,
            endDate,
            checkInTime,
            checkOutTime,
            cost,
            description,
            phoneNumber,
            websiteUrl
        } = req.body;

        try {
            // Query the trip and see if it exists
            const trip = await Trip.findById(req.params.tripId);
            if(!trip) {
                return res.status(404).send("The trip does not exist");
            }

            // Trip structure
            let newEvent = new Event({
                name,
                location,
                startDate,
                endDate,
                checkInTime,
                checkOutTime,
                cost,
                description,
                phoneNumber,
                websiteUrl
            });
            let eventList = trip.events;

            // Save the event in the 'event' collection and the event id into the trip's list of events
            await newEvent.save().then(event => {
                eventList.unshift(event._id);
            });

            const token = req.header("auth-token");
            await axios.put(`${baseUrl}/api/trip/${trip._id}`, { events: eventList }, { headers: { "auth-token": token } });

            return res.status(200).json(newEvent);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)

// Route    GET api/trip
// Desc     Retrieve information about a event of a trip
// Access   Private
Router.get(
    "/:tripId/:eventId",
    authMiddleware,

    async(req, res) => {
        // Find a event inside the database
        const event = await Event.findById(req.params.eventId);

        if(!event) {
            return res.status(404).send("Event does not exist");
        }

        return res.status(200).json(event);
    }
)

// Route    GET api/trip
// Desc     Retrieve all of the trip's events
// Access   Private
Router.get(
    "/:tripId",
    authMiddleware,

    async(req, res) => {
        // Find the trip inside the database
        const trip = await Trip.findById(req.params.tripId);
        
        if(!trip) {
            return res.status(404).send("Trip does not exist");
        }

        // Find each of the trip's infomation in the user's trips list
        const tripEvents = await Event.find( { _id: { $in: trip.events } } );

        return res.status(200).json(tripEvents);
    }
)

module.exports = Router;