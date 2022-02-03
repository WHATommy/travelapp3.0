const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'trips'
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    checkInTime: {
        type: String
    },
    checkOutTime: {
        type: String
    },
    cost: {
        type: String
    },
    description: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    websiteUrl: {
        type: String
    }
});

const RestaurantSchema = new Schema({
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'trips'
    },
    user: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    date: {
        type: Date
    },
    checkInTime: {
        type: String
    },
    checkOutTime: {
        type: String
    },
    cost: {
        type: String
    },
    categories: {
        type: Array
    },
    phoneNumber: {
        type: String
    },
    websiteUrl: {
        type: String
    },
    img_url: {
        type: Array
    }
});

const HousingSchema = new Schema({
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'trips'
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    checkInTime: {
        type: String
    },
    checkOutTime: {
        type: String
    },
    cost: {
        type: Number
    },
    websiteUrl: {
        type: String
    }, 
    attendees: {
        type: Array
    }
});

const AttendeeSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    username: {
        type: String
    },
    moderator: {
        type: Boolean
    },
    attending: {
        type: Boolean
    }
});

const TripSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    events: {
        type: [EventSchema]
    },
    restaurants: {
        type: [RestaurantSchema]
    },
    housings: {
        type: [HousingSchema]
    },
    attendees: {
        type: [AttendeeSchema]
    }
});

const Trip = mongoose.model('trips', TripSchema);

module.exports = Trip;