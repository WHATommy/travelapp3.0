const express = require('express');
const Router = express.Router();
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

Router.post(
    "/",
    check("username", "Username cannot be empty").isEmpty(),
    check("password", "Password cannot be empty").isEmpty(),

    async (req, res) => {
        // Check if there are any invalid inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Store request values into callable variables
        const {
            email,
            password
        } = req.body;

        try {
            // Check if incoming email exist in the database
            const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
            if(!user) {
                return res.status(401).send("Your email or password may be incorrect, or you have not register an account under these credentials.");
            }

            // Check if the incoming password matches with the selected user's password through bcrypt
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).send("Your email or password may be incorrect, or you have not register an account under these credentials.");
            }

            // Create a token for the user using JWT
            const payload = { userId: user._id };
            jwt.sign(payload, process.env.jwtSecret, {expiresIn: "7d"}, (err, token) => {
                if (err) throw err;
                res.status(200).json(token);
            });

        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)

module.exports = Router;
