let month //goes from 1-12
let year
let desiredFirstOfMonth //goes from 1 - 7
let daysInMonth

let getFirstDayOfMonth = function () {
    let day = new Date(`${year}-${month}-1`);
    desiredFirstOfMonth = day.getDay()
}

let getDaysInMonth = function () {
    let lastDay = new Date(year, month, 0);
    daysInMonth = lastDay.getDate()
}

let setDays = function () {
    getFirstDayOfMonth()
    getDaysInMonth()
    let date = 1
    let dayEls = document.querySelectorAll('.day .day-anchor');
    for (let i = 1; i <= dayEls.length - 1; i++) {
        if (i < desiredFirstOfMonth) {
            continue
        }
        if (date > daysInMonth) {
            break
        }
        let dateString = createDateString(date)
        dayEls[i - 1].innerHTML = date //date starts at 1, but first element is 0, so need to take off 1 to get it to the right place
        dayEls[i - 1].setAttribute('href', `/day/${dateString}`)
        //dayEls[i - 1].setAttribute('class', 'check')
        date++;
    }
}

let createDateString = function (date) {
    let dateString = `${year}-`
    if (month < 10) {
        dateString += `0`
    }
    dateString += `${month}-`
    if (date < 10) {
        dateString += `0`
    }
    dateString += `${date}`
    return dateString
}

let clearDays = function () {
    let dayEls = document.querySelectorAll('.day');
    for (let day of dayEls) {
        day.innerHTML = ''
    }
}

let selectedMonth = document.querySelector('#month-picker')
selectedMonth.addEventListener('change', function (e) {
    let selectedMonthSplit = selectedMonth.value.split('-')
    year = parseInt(selectedMonthSplit[0])
    month = parseInt(selectedMonthSplit[1])
    clearDays()
    setDays()
})

let fillMonthSelector = function () {
    let today = new Date()
    let monthString = `${today.getFullYear()}-${today.getMonth() + 1}`
    document.querySelector('#month-picker').setAttribute('value', `2024-03`)
}

let setup = function () {
    let today = new Date()
    month = today.getMonth() + 1 //date format month goes from 0-11. add 1 so it goes from 1-12
    year = today.getFullYear()
    fillMonthSelector()
    setDays()
}



setup()