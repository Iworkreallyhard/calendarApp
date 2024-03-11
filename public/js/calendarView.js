let month //goes from 1-12
let year
let desiredFirstOfMonth //goes from 1 - 7
let daysInMonth
let count = 1
const months = {
    jan: 'Jan'
}

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
    let dayEls = document.querySelectorAll('.day');
    for (let i = 1; i <= dayEls.length - 1; i++) {
        if (i < desiredFirstOfMonth) {
            continue
        }
        if (date > daysInMonth) {
            break
        }
        dayEls[i - 1].innerHTML = date
        date++;
    }
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

let setup = function () {
    let today = new Date()
    month = today.getMonth() + 1
    year = today.getFullYear()
    setDays()
}



setup()