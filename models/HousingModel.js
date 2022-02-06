const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
});

const Housing = mongoose.model('housing', HousingSchema);

module.exports = Housing;