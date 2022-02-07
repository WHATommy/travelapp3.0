const express = require("express");
const Router = express.Router();
const Trip = require("../models/TripModel");
const User = require("../models/UserModel");
const authMiddleware = require("../middleware/authMiddleware");
const axios = require("axios");
const baseUrl = require("../utilsServer/baseUrl");

// Route    PUT api/invitation
// Desc     Add a user into the trip's pending user, add the invitation to the targeted user's invitation list
// Access   Private
Router.put(
    "/invite/:tripId/:userId",
    authMiddleware,

    async(req, res) => {
        const {
            tripId,
            userId
        } = req.params;
        try {
            // Find the user in the database
            const user = await User.findById(userId);
            if (!user) {
                return res.status(401).send("User does not exist");
            }

            // Find the trip in the database
            const trip = await Trip.findById(tripId);
            if (!trip) {
                return res.status(401).send("Trip does not exist");
            }

            const isAttendee = trip.attendees.find(attendee => attendee._id.valueOf() == user._id.valueOf());
            console.log(isAttendee)
            if(isAttendee) {
                return res.status(400).send("User is already attending this trip");
            }

            // Add the trip id into the user's list of invitations
            user.invitations.unshift(tripId);
            await axios.put(`${baseUrl}/api/user/${userId}`, { invitations: user.invitations }, { headers: { "auth-token": req.header("auth-token") } });

            // Add the user id into the trip's list of pending users
            trip.pendingUsers.unshift(userId);
            await axios.put(`${baseUrl}/api/trip/${tripId}`, { pendingUsers: trip.pendingUsers }, { headers: { "auth-token": req.header("auth-token") } });

            return res.status(200).send("Invite Success");
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)

// Route    PUT api/invitation
// Desc     Add a user into the trip's pending user, add the invitation to the targeted user's invitation list
// Access   Private
Router.put(
    "/accept/:tripId/:userId",
    authMiddleware,

    async(req, res) => {
        const {
            tripId,
            userId
        } = req.params;
        try {
            // Find the user in the database
            const user = await User.findById(userId);
            if (!user) {
                return res.status(401).send("User does not exist");
            }

            // Find the trip in the database
            const trip = await Trip.findById(tripId);
            if (!trip) {
                return res.status(401).send("Trip does not exist");
            }

            // Filter out the targeted trip id out of the user's list of invitation and add the trip id into the user's list of trips
            const invitations = user.invitations.filter(invitation => invitation._id.valueOf() !== tripId.valueOf());
            user.trips.unshift(tripId);
            await axios.put(`${baseUrl}/api/user/${userId}`, { trips: user.trips, invitations }, { headers: { "auth-token": req.header("auth-token") } });

            // Filter out the targeted user id in the trip's list of pending users and add the user id into the list of attendees
            const pendingUsers = trip.pendingUsers.filter(user => user._id.valueOf() !== userId.valueOf());
            trip.attendees.unshift(userId);
            await axios.put(`${baseUrl}/api/trip/${tripId}`, { attendees: trip.attendees, pendingUsers }, { headers: { "auth-token": req.header("auth-token") } });

            return res.status(200).send("Accept Success");
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)

// Route    PUT api/invitation
// Desc     Remove a user from the trip's pending user, remove the invitation from the targeted user's invitation list
// Access   Private
Router.put(
    "/decline/:tripId/:userId",
    authMiddleware,

    async(req, res) => {
        const {
            tripId,
            userId
        } = req.params;
        try {
            // Find the user in the database
            const user = await User.findById(userId);
            if (!user) {
                return res.status(401).send("User does not exist");
            }

            // Find the trip in the database
            const trip = await Trip.findById(tripId);
            if (!trip) {
                return res.status(401).send("Trip does not exist");
            }

            // Filter out the targeted trip id out of the user's list of invitation
            const invitations = user.invitations.filter(invitation => invitation._id.valueOf() !== tripId.valueOf());
            await axios.put(`${baseUrl}/api/user/${userId}`, { invitations }, { headers: { "auth-token": req.header("auth-token") } });

            // Filter out the targeted user id out of the trip's list of pending users
            const pendingUsers = trip.pendingUsers.filter(user => user._id.valueOf() !== userId.valueOf());
            await axios.put(`${baseUrl}/api/trip/${tripId}`, { pendingUsers }, { headers: { "auth-token": req.header("auth-token") } });

            return res.status(200).send("Decline Success");
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
    }
)

module.exports = Router;

