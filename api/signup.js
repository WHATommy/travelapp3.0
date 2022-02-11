const express = require("express");
const Router = express.Router();
const User = require("../models/UserModel");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Route    POST api/signup
// Desc     Register user into the database
// Access   Public
Router.post(
    "/", 
    check("username", "Username is required").notEmpty(),
    check("email", "Email is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({min: 6}),

    async (req, res) => {
        // Check if there are any invalid inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Store request values into callable variables
        const {
            username,
            email,
            password
        } = req.body;

        try {
            // Initalize empty user varaible
            let user;

            // Check if a user with that email exist in the system
            user = await User.findOne({ email: email.toLowerCase() });
            if(user) {
                return res.status(401).send("Email is already in use");
            };

            // Check if a user with that username exist in the system
            user = await User.findOne({ username: username.toLowerCase() });
            if(user) {
                return res.status(401).send("Username is already taken");
            };

            // User structure
            user = new User({
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password,
                trips: []
            });

            // Hashing the password using bcrypt algorithm
            const rounds = Number(process.env.BCRYPT_SALT);
            user.password = await bcrypt.hash(password, rounds);

            // Save the user into the database
            await user.save().then(res.status(200).json(user));

        } catch (err) {
            console.log(err);
            res.status(500).send("Server Error")
        }
    }
)

module.exports = Router;