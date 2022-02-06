const express = require("express");
const Router = express.Router();
const User = require("../models/UserModel");
const authMiddleware = require("../middleware/authMiddleware");

// Route    GET api/user
// Desc     Retrieve information the current user
// Access   Private
Router.get(
    "/",
    authMiddleware,

    async(req, res) => {

        // Find a user inside the database
        const user = await User.findById(req.user);

        if(!user) {
            return res.status(404).send("User does not exist");
        }

        return res.status(200).json(user);

    }
)

// Route    GET api/user
// Desc     Retrieve information about a user
// Access   Private
Router.get(
    "/:userId",
    authMiddleware,

    async(req, res) => {

        // Find a user inside the database
        const user = await User.findById(req.params.userId);

        if(!user) {
            return res.status(404).send("User does not exist");
        }

        return res.status(200).json(user);

    }
)

// Route    PUT api/trip
// Desc     Update a user
// Access   Private
Router.put(
    "/:userId",
    authMiddleware,

    async(req, res) => {
        // Store request values into callable variables
        const {
            username,
            email,
            password,
            trips,
            invitation
        } = req.body;

        try {
            // Retrieve a user by ID
            let user = await User.findById(req.params.userId);

            // Check if user exist in the database
            if (!user) {
                return res.status(404).send("User does not exist");
            }

            // Update the user structure
            username ? user.username = username : null;
            email ? user.email = email : null;
            password ? user.password = password : null;
            trips ? user.trips = trips : null;
            invitation ? user.invitation = invitation : null;

            // Save the user
            await user.save();

            return res.status(200).json(user);

        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
        
    }
)

// Route    DELETE api/trip
// Desc     Remove a user
// Access   Private
Router.delete(
    "/:userId",
    authMiddleware,

    async(req, res) => {
        try {
            // Find a user inside the database
            const user = await User.findById(req.params.userId);
            if(!user) {
                return res.status(404).send("User does not exist");
            }

            await user.remove(); 

            return res.status(200).send("User has been removed");

        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }

    }
)

module.exports = Router;