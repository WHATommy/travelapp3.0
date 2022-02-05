const express = require("express");
const Router = express.Router();
const { Trip, Event } = require("../models/TripModel");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const axios = require("axios");
const baseUrl = require("../utilsServer/baseUrl");

// Route    GET api/event
// Desc     Create a event for a trip
// Access   Private
Router.post(
    "/:tripId",
    check("name", "The name of the event is required").notEmpty(),
    check("location", "The location of the event is required").notEmpty(),
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

            // Save the event in the 'event' collection and the event id into the trip's list of events
            await newEvent.save().then(event => {
                trip.events.unshift(event._id);
            });

            // Route to the trip api to update the trip's event list
            await axios.put(`${baseUrl}/api/trip/${trip._id}`, { events: trip.events }, { headers: { "auth-token": req.header("auth-token") } });

            return res.status(200).json(newEvent);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)

module.exports = Router;