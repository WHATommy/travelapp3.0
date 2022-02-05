const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Attendee = mongoose.model('attendees', AttendeeSchema);

module.exports = Attendee;