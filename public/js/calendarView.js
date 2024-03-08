let monthSelected = 'May'
let desiredFirstOfMonth
let count = 1
const months = {
    jan: 'Jan'
}

let getFirstDayOfMonth = function (month, year) {
    let day = new Date(`${year}-${month}-1`);
    return day
}

desiredFirstOfMonth = getFirstDayOfMonth(3, 2024)