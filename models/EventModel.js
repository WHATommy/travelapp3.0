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

const Event = mongoose.model('events', EventSchema);

module.exports = Event;