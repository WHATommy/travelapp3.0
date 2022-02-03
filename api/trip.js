const express = require("express");
const Router = express.Router();
const Trip = require("../models/TripModel");
const User = require("../models/UserModel");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

// Route    POST api/trip
// Desc     Create a trip for a user
// Access   Private
Router.post(
    "/",
    authMiddleware,
    check("name", "The name of the trip is required").notEmpty(),
    check("location", "The location is required").notEmpty(),
    check("startDate", "The start date is required").notEmpty(),
    check("endDate", "The end date is required").notEmpty(),
    check("startTime", "The start time is required").notEmpty(),
    check("endTime", "The end date is required").notEmpty(),

    async(req, res) => {
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
            startTime,
            endTime
        } = req.body;

        try {
            // Find the user inside the database
            const user = await User.findById(req.user);
            
            // Trip structure
            const newTrip = new Trip({
                owner: req.user,
                name,
                location,
                startDate,
                endDate,
                startTime,
                endTime,
                events: [],
                restaurants: [],
                housing: [],
                attendees: []
            });

            // Save the trip in the 'trip' collection and the trip id into the user's list of trips
            await newTrip.save().then(trip => {
                user.trips.unshift(trip._id);
                user.save().then(res.status(200).json(trip));
            });

        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    } 
)


// Route    GET api/trip/:tripId
// Desc     Retrieve a trip's information
// Access   Private
Router.get(
    "/:tripId",
    authMiddleware,

    async(req, res) => {
        try {
            const trip = await Trip.findById(req.params.tripId);

            if(!trip) {
                return res.status(404).send("The trip does not exist");
            }

            return res.status(200).json(trip);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)



module.exports = Router;
