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
    //desiredFirstOfMonth = firstDay(year, month)
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

let createMonthString = function () {
    let dateString = `${year}-`
    if (month < 10) {
        dateString += `0`
    }
    dateString += `${month}`
    return dateString
}

let clearDays = function () {
    let dayEls = document.querySelectorAll('.day-anchor');
    for (let day of dayEls) {
        day.innerHTML = ''
        day.setAttribute('href', '')
    }
}

let selectedMonth = document.querySelector('#month-picker')
selectedMonth.addEventListener('change', function (e) {
    let selectedMonthSplit = selectedMonth.value.split('-')
    year = parseInt(selectedMonthSplit[0])
    month = parseInt(selectedMonthSplit[1])
    window.location = `${year}-${month}`
})

let fillMonthSelector = function () {
    document.querySelector('#month-picker').setAttribute('value', `${createMonthString()}`)
}

let setup = function () {
    let url = window.location.href
    let desiredMonthYear = url.split('/')[4]
    month = desiredMonthYear.split('-')[1]
    year = desiredMonthYear.split('-')[0]
    fillMonthSelector()
    setDays()
}

setup()