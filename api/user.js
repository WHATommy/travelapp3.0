const express = require("express");
const Router = express.Router();
const User = require("../models/UserModel");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");
const checkTripPermission = require("../utilsServer/checkTripPermission");

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
    "/info",
    authMiddleware,

    async(req, res) => {

        // Find a user inside the database
        const user = await User.findById(req.body.userId);

        if(!user) {
            return res.status(404).send("User does not exist");
        }

        return res.status(200).json(user);

    }
)

// Route    PUT api/user
// Desc     Update a user's password
// Access   Private
Router.put(
    "/password",
    check("oldPassword", "Old password field cannot be empty").notEmpty(),
    check("newPassword", "New password field cannot be empty").notEmpty(),
    check("newPassword", "The new password must be at least 6 characters long").isLength({min: 6}),
    check("newPassword", "The new password cannot be the same as your old password").custom((value, { req }) => value !== req.body.oldPassword),
    authMiddleware,

    async(req, res) => {
        // Check if there are any invalid inputs
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Store request values into callable variables
        const {
            oldPassword,
            newPassword
        } = req.body;

        try {
            let user;
            // Retrieve a user by ID
            user = await User.findById(req.user).select("+password");

            // Check if user exist in the database
            if (!user) {
                return res.status(404).send("User does not exist");
            }

            // Check if the user's input for old password matches with their current password
            const isPassword = await bcrypt.compare(oldPassword, user.password);
            if (!isPassword) {
                return res.status(401).send("Input for old password is invalid");
            }

            // Update the user's password
            const rounds = Number(process.env.BCRYPT_SALT);
            user.password = await bcrypt.hash(newPassword, rounds);

            // Save the user
            await user.save();

            return res.status(200).send("Update successful");
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
        
    }
)


// Route    PUT api/trip
// Desc     Update a user
// Access   Private
Router.put(
    "/",
    authMiddleware,

    async(req, res) => {
        // Store request values into callable variables
        const {
            userId,
            username,
            email,
            trips,
            invitations
        } = req.body;

        try {
            let user;
            // Retrieve a user by ID
            user = await User.findById(userId);

            // Check if user exist in the database
            if (!user) {
                return res.status(404).send("User does not exist");
            }

            // Update the user structure
            // Check if the request is to change the user's sensitive info, it is from the user itself
            if(req.user == userId) {
                username ? user.username = username : null;
                email ? user.email = email : null;
            }
            trips ? user.trips = trips : null;
            invitations ? user.invitations = invitations : null;

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
    "/",
    authMiddleware,

    async(req, res) => {
        try {
            // Find a user inside the database
            const user = await User.findById(req.user);
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