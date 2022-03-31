const express = require("express");
const Router = express.Router();
const Trip = require("../models/TripModel");
const Restaurant = require("../models/RestaurantModel");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const checkTripPermission = require("../utilsServer/checkTripPermission");
const axios = require("axios");
const baseUrl = require("../utilsServer/baseUrl");

// Route    POST api/restaurant
// Desc     Create a event for a trip
// Access   Private
Router.post(
    "/",
    check("name", "The name of the trip is required").notEmpty(),
    check("location", "The location is required").notEmpty(),
    check("date", "The start date is required").notEmpty(),
    check("checkInTime", "The check in time is required").notEmpty(),
    check("checkOutTime", "The check out time is required").notEmpty(),
    authMiddleware,

    async (req, res) => {
        // Check if there are any invalid inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Store request values into callable variables
        const {
            tripId,
            name,
            location,
            rating,
            date,
            checkInTime,
            checkOutTime,
            cost,
            categories,
            phoneNumber,
            websiteUrl,
            imgUrl
        } = req.body;

        try {
            // Query the trip and see if it exists
            const trip = await Trip.findById(tripId);
            if(!trip) {
                return res.status(404).send("The trip does not exist");
            }

            // Trip structure
            let newRestaurant = new Restaurant({
                name,
                location,
                rating,
                date,
                checkInTime,
                checkOutTime,
                cost,
                categories,
                phoneNumber,
                websiteUrl,
                imgUrl
            });

            // Save the restaurant in the 'restaurant' collection and the restaurant id into the trip's list of restaurants
            await newRestaurant.save().then(restaurant => {
                trip.restaurants.unshift(restaurant._id);
            });

            await axios.put(`${baseUrl}/api/trip`, { tripId, restaurants: trip.restaurants }, { headers: { "token": req.header("token") } });

            return res.status(200).json(newRestaurant);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)

// Route    GET api/restaurant
// Desc     Retrieve information about a restaurant of a trip
// Access   Private
Router.get(
    "/info",
    authMiddleware,

    async(req, res) => {
        // Store request values into callable variables
        const {
            restaurantId
        } = req.body;

        // Find a restaurant inside the database
        const restaurant = await Restaurant.findById(restaurantId);

        if(!restaurant) {
            return res.status(404).send("Restaurant does not exist");
        }

        return res.status(200).json(restaurant);
    }
)

// Route    GET api/restaurant
// Desc     Retrieve all of the trip's restaurants
// Access   Private
Router.get(
    "/",
    authMiddleware,

    async(req, res) => {
        // Store request values into callable variables
        const {
            tripId
        } = req.body;

        // Find the trip inside the database
        const trip = await Trip.findById(tripId);
        
        if(!trip) {
            return res.status(404).send("Trip does not exist");
        }

        // Find each of the trip's infomation in the user's trips list
        const tripRestaurants = await Restaurant.find( { _id: { $in: trip.restaurants } } );

        return res.status(200).json(tripRestaurants);
    }
)

// Route    PUT api/restaurant
// Desc     Update a restaurant
// Access   Private
Router.put(
    "/",
    authMiddleware,
    checkTripPermission,

    async(req, res) => {
        // Store request values into callable variables
        const {
            restaurantId,
            name,
            location,
            rating,
            date,
            checkInTime,
            checkOutTime,
            cost,
            categories,
            phoneNumber,
            websiteUrl,
            imgUrl
        } = req.body;

        try {
            // Retrieve a restaurant by ID
            let restaurant = await Restaurant.findById(restaurantId);

            // Check if restaurant exist in the database
            if (!restaurant) {
                return res.status(404).send("Restaurant does not exist");
            }

            // Update the restaurant structure
            name ? restaurant.name = name : null;
            location ? restaurant.location = location : null;
            rating ? restaurant.rating = rating : null;
            date ? restaurant.date = date : null;
            checkInTime ? restaurant.checkInTime = checkInTime : null;
            checkOutTime ? restaurant.checkOutTime = checkOutTime : null;
            cost ? restaurant.cost = cost : null;
            categories ? restaurant.categories = categories : null;
            phoneNumber ? restaurant.phoneNumber = phoneNumber : null;
            websiteUrl ? restaurant.websiteUrl = websiteUrl : null;
            imgUrl ? restaurant.imgUrl = imgUrl : null;

            // Save the restaurant
            await restaurant.save();

            return res.status(200).json(restaurant);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
        
    }
)

// Route    DELETE api/restaurant
// Desc     Remove a restaurant
// Access   Private
Router.delete(
    "/",
    authMiddleware,
    checkTripPermission,

    async(req, res) => {
        // Store request values into callable variables
        const {
            tripId,
            restaurantId
        } = req.body;

        try {
            // Find a trip inside the database
            const trip = await Trip.findById(tripId);
            if(!trip) {
                return res.status(404).send("Trip does not exist");
            }

            // Find a restaurant inside the database
            const restaurant = await Restaurant.findById(restaurantId);
            if(!restaurant) {
                return res.status(404).send("Restaurant does not exist");
            }

            trip.restaurants = trip.restaurants.filter(restaurantId => restaurantId.valueOf() !== restaurant._id.valueOf());

            await axios.put(`${baseUrl}/api/trip`, { tripId, restaurants: trip.restaurants }, { headers: { "token": req.header("token") } });

            await restaurant.remove();

            return res.status(200).send("Restaurant has been removed");

        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)

module.exports = Router;