const Trip = require("../models/TripModel");

module.exports = async function (req, res, next) {
    const {
        tripId
    } = req.body;

    try {
        // Find the trip in the database by ID
        const trip = await Trip.findById(tripId);

        // Check if the user is the owner of the trip
        if(trip.owner.valueOf() == req.user) {
            return next();
        }

        return res.status(401).json({ msg: "Access denied" });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
}