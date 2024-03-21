/**
 * this class is for all the month related calculations throughout the project
 * months will go from 1-12
 */
// export class Month {
// constructor(month, year) {
//     this.month = month
//     this.year = year
// }

module.exports.createMonth = function (year, month) {
    let createdMonth = {
        month: month,
        year: year,
        daysInMonth: getDaysInMonth(year, month),
        monthString: monthString(year, month),
        firstDay: firstDay(year, month)
    }
    return createdMonth
}

let getDaysInMonth = function (year, month) {
    let lastDay = new Date(year, month, 0);
    return lastDay.getDate()
}

let monthString = function (year, month) {
    let string = `${year}-`
    if (month < 10) {
        string += `0`
    }
    string += `${month}`
    return string
}

let firstDay = function (year, month) {
    let day = new Date(`${year}-${month}-1`);
    return day.getDay()
}