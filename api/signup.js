const express = require("express");
const Router = express.Router();
const User = require("../models/UserModel");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const baseUrl = require("../utilsServer/baseUrl");

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
        if(req.body.password !== req.body.confirmPassword) {
            errors.errors.push({msg: "Password and confirm password do not match"})
        }
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
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
                return res.status(401).send([{msg:"Email is already in use"}]);
            };

            // Check if a user with that username exist in the system
            user = await User.findOne({ username: username.toLowerCase() });
            if(user) {
                return res.status(401).send([{msg:"Username is already taken"}]);
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
            await user.save().then(() => {
                // Create a token for the user using JWT
                const payload = { userId: user._id };
                jwt.sign(payload, process.env.jwtSecret, {expiresIn: "7d"}, (err, token) => {
                    if (err) throw err;
                    res.status(200).json(token);
                });
            });

        } catch (err) {
            console.log(err);
            res.status(500).send("Server Error")
        }
    }
)

module.exports = Router;