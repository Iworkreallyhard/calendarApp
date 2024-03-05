const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    description: String,
    startTime: Date,
    endTime: Date
})

module.exports = eventSchema;