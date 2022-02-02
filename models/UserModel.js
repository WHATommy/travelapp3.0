const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    date: {
        type: Date,
        default: Date.now   
    },
    trips: {
        type: 'array'
    }
});

const User = mongoose.model('users',UserSchema);

module.exports = { User };