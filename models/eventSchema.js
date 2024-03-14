const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    description: String,
    // start: {
    //     year: Number,
    //     month: Number,
    //     date: Number,
    //     hour: Number,
    //     minute: Number,
    //     calculated: Date
    // },
    // end: {
    //     year: Number,
    //     month: Number,
    //     date: Number,
    //     hour: Number,
    //     minute: Number,
    //     calculated: Date
    // }
    startTime: Date,
    endTime: Date
})
const Event = mongoose.model('Event', eventSchema)

module.exports = Event;