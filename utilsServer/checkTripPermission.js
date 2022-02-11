const Trip = require("../models/TripModel");
const Event = require("../models/EventModel");
const Restaurant = require("../models/RestaurantModel");
const Housing = require("../models/HousingModel");

module.exports = async function (req, res, next) {
    const {
        tripId,
        eventId,
        restaurantId,
        housingId
    } = req.body;

    try {
        // Find the trip in the database by ID
        const trip = await Trip.findById(tripId);

        if(!trip) {
            return res.status(401).json({ msg: "Trip does not exist" });
        }
        
        // Check if the user is the owner of the trip
        if(trip.owner.valueOf() == req.user) {
            return next();
        }

        // Check if the user is a attendee who is also a moderator for the trip
        const isMod = trip.attendees.every(attendeeId => {
            attendeeId == req.user.valueOf() && attendeeId.moderator == true;
        })
        if(isMod) {
            return next();
        }

        // Check if the user is the original poster for the event, restaurant, or housing item
        switch(req.baseUrl) {
            case "/api/event":
                const event = await Event.findById(eventId);
                if (event.originalPoster == req.user) {
                    return next();
                }
                break;

            case "/api/restaurant":
                const restaurant = await Restaurant.findById(restaurantId);
                if (restaurant.originalPoster == req.user) {
                    return next();
                }
                break;

            case "/api/housing":
                const housing = await Housing.findById(housingId);
                if (housing.originalPoster == req.user) {
                    return next();
                }
                break;

            default:
                break;
        }

        return res.status(401).json({ msg: "Access denied" });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
}