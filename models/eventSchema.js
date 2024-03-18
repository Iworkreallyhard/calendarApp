const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    description: String,
    startTime: Date,
    endTime: Date
})

// eventSchema.methods.sortByStartDate = function(){
//     return arr.sort((a, b) => {
//         // Convert startDate strings to Date objects for comparison
//         const dateA = new Date(a.startTime);
//         const dateB = new Date(b.startTime);

//         // Compare the dates
//         if (dateA < dateB) {
//             return -1;
//         } else if (dateA > dateB) {
//             return 1;
//         } else {
//             return 0;
//         }
//     });
// }

const Event = mongoose.model('Event', eventSchema)

module.exports = Event;