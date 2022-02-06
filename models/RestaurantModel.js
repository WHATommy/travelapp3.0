const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
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
    imgUrl: {
        type: Array
    }
});

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

module.exports = Restaurant;