const express = require("express");
const Router = express.Router();
const { Trip } = require("../models/TripModel");
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

// Route    GET api/trip
// Desc     Retrieve all of the user's trips
// Access   Private
Router.get(
    "/",
    authMiddleware,

    async(req, res) => {
        try {
            // Find the user inside the database
            const user = await User.findById(req.user);

            // User does not exist
            if(!user) {
                return res.status(404).send("User does not exist");
            };

            // Find each of the trip's infomation in the user's trips list
            const userTrips = await Trip.find( { _id: { $in: user.trips } } );
            
            return res.status(200).json(userTrips)
            
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)

// Route    PUT api/trip
// Desc     Update a trip's information
// Access   Private
Router.put(
    "/:tripId",
    authMiddleware,

    async(req, res) => {

        // Store request values into callable variables
        const {
            owner,
            name,
            location,
            startDate,
            endDate,
            startTime,
            endTime,
            events,
            restaurants,
            housing,
            attendees
        } = req.body;

        try {
            // Find the user inside the database
            let trip = await Trip.findById(req.params.tripId);

            // User does not exist
            if(!trip) {
                return res.status(404).send("The trip does not exist");
            };

            // Updated trip structure
            owner ? trip.owner = owner : null
            name ? trip.name = name : null
            location ? trip.location = location : null
            startDate ? trip.startDate = startDate : null
            endDate ? trip.endDate = endDate : null
            startTime ? trip.startTime = startTime : null
            endTime ? trip.endTime = endTime : null
            events ? trip.events = events : null
            restaurants ? trip.restaurants = restaurants : null
            housing ? trip.housing = housing : null
            attendees ? trip.attendees = attendees : null

            console.log(trip)

            // Save the trip in the 'trip' collection and the trip id into the user's list of trips
            await trip.save();
            
            return res.status(200).json(trip);
            
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)


// Route    PUT api/trip
// Desc     Delete a trip
// Access   Private
Router.delete(
    "/:tripId",
    authMiddleware,

    async(req, res) => {
        try {
            // Find the user inside the database
            let trip = await Trip.findById(req.params.tripId);

            // User does not exist
            if(!trip) {
                return res.status(404).send("The trip does not exist");
            };

            // Remove the trip id from the owner's and attendee's trips list
            const users = [trip.owner, ...trip.attendees];
            await users.map(userId => {
                User.findById(userId)
                .then(user => {
                    user.trips = user.trips.filter(userTrip => userTrip._id.valueOf() != trip._id.valueOf());
                    user.save();
                });
            });

            // Remove the trip from the database
            await trip.remove()
            
            return res.status(200).json("Trip has been removed");
            
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)

module.exports = Router;
