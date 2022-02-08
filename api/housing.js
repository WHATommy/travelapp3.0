const express = require("express");
const Router = express.Router();
const Trip = require("../models/TripModel");
const Housing = require("../models/HousingModel");
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
            websiteUrl
        } = req.body;

        try {
            // Query the trip and see if it exists
            const trip = await Trip.findById(req.params.tripId);
            if(!trip) {
                return res.status(404).send("The trip does not exist");
            }

            // Trip structure
            let newHousing = new Housing({
                name,
                location,
                startDate,
                endDate,
                checkInTime,
                checkOutTime,
                cost,
                websiteUrl
            });

            // Save the housing in the 'housing' collection and the housing id into the trip's list of housings
            await newHousing.save().then(housing => {
                trip.housings.unshift(housing._id);
            });

            await axios.put(`${baseUrl}/api/trip`, { tripId: trip._id, housings: trip.housings }, { headers: { "auth-token": req.header("auth-token") } });

            return res.status(200).json(newHousing);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)

// Route    GET api/trip
// Desc     Retrieve information about a housing of a trip
// Access   Private
Router.get(
    "/:tripId/:housingId",
    authMiddleware,

    async(req, res) => {
        // Find a housing inside the database
        const housing = await Housing.findById(req.params.housingId);

        if(!housing) {
            return res.status(404).send("Housing does not exist");
        }

        return res.status(200).json(housing);
    }
)

// Route    GET api/trip
// Desc     Retrieve all of the trip's housings
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
        const tripHousings = await Housing.find( { _id: { $in: trip.housings } } );

        return res.status(200).json(tripHousings);
    }
)

// Route    PUT api/trip
// Desc     Update a housing
// Access   Private
Router.put(
    "/:tripId/:housingId",
    authMiddleware,

    async(req, res) => {
        // Store request values into callable variables
        const {
            name,
            location,
            startDate,
            endDate,
            checkInTime,
            checkOutTime,
            cost,
            websiteUrl
        } = req.body;

        try {
            // Retrieve a housing by ID
            let housing = await Housing.findById(req.params.housingId);

            // Check if housing exist in the database
            if (!housing) {
                return res.status(404).send("Housing does not exist");
            }

            // Update the housing structure
            name ? housing.name = name : null;
            location ? housing.location = location : null;
            startDate ? housing.startDate = startDate : null;
            endDate ? housing.endDate = endDate : null;
            checkInTime ? housing.checkInTime = checkInTime : null;
            checkOutTime ? housing.checkOutTime = checkOutTime : null;
            cost ? housing.cost = cost : null;
            websiteUrl ? housing.websiteUrl = websiteUrl : null;

            // Save the housing
            await housing.save();

            return res.status(200).json(housing);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
        
    }
)

// Route    DELETE api/trip
// Desc     Remove a housing
// Access   Private
Router.delete(
    "/:tripId/:housingId",
    authMiddleware,

    async(req, res) => {
        try {
            // Find a trip inside the database
            const trip = await Trip.findById(req.params.tripId);
            if(!trip) {
                return res.status(404).send("Trip does not exist");
            }

            // Find a housing inside the database
            const housing = await Housing.findById(req.params.housingId);
            if(!housing) {
                return res.status(404).send("Housing does not exist");
            }

            trip.housings = trip.housings.filter(housingId => housingId.valueOf() !== housing._id.valueOf());

            await axios.put(`${baseUrl}/api/trip`, { tripId: trip._id, housings: trip.housings }, { headers: { "auth-token": req.header("auth-token") } });

            await housing.remove();

            return res.status(200).send("Housing has been removed");

        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)

module.exports = Router;