let month //goes from 1-12
let year

let selectedMonth = document.querySelector('#month-picker')
selectedMonth.addEventListener('change', function (e) {
    let selectedMonthSplit = selectedMonth.value.split('-')
    year = parseInt(selectedMonthSplit[0])
    month = parseInt(selectedMonthSplit[1])
    window.location = `${year}-${month}`
})