const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    description: String,
    startTime: Date,
    endTime: Date
})
const Event = mongoose.model('Event', eventSchema)

module.exports = Event;