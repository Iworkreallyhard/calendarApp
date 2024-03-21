const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const ejsMate = require('ejs-mate')
const bodyParser = require('body-parser')
const path = require('path')
const methodOverride = require('method-override')
const Event = require('./models/eventSchema')
const Month = require('./utils/global/monthGlobal')
const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/calendarApp');

app.set('view engine', 'ejs')
app.engine('ejs', ejsMate)
app.set('views', __dirname + '/views')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const events = await Event.find();
    sortByStartDate(events)

    res.render('show', { events, title: 'events', styles: [], scripts: [] })
})

app.get('/new', (req, res) => {
    const dateNow = new Date()
    res.render('new', { dateNow, title: 'new', styles: [], scripts: [] })
})

app.post('/new', async (req, res) => {
    req.body = calculateDate(req.body)

    let event = new Event(req.body)
    await event.save()
    res.redirect(`/${event._id}`)
})

app.get('/calendar', (req, res) => {
    let now = new Date()
    res.redirect(`/month/${now.getFullYear()}-${now.getMonth()}`)
})

app.get('/month/:month', async (req, res) => {
    let yearMonth = req.url.split('/')[2].split('-')
    let month = new Month.createMonth(yearMonth[0], yearMonth[1])
    //console.log(month)
    let startDate = new Date(`${month.monthString}-01`)
    let endDate = new Date(`${month.monthString}-${month.daysInMonth}`)
    endDate.setDate(endDate.getDate() + 1);
    // console.log(`Start date: ${startDate}`)
    // console.log(`end date: ${endDate}`)
    let events = await Event.find({
        startTime: {
            $lte: endDate
        },
        endTime: {
            $gt: startDate
        }
    })

    //console.log(events)
    res.render('calendarView', { title: 'month', styles: ['/css/monthView.css'], scripts: ['/js/calendarView.js'], month, events })
})

app.get('/day/:date', async (req, res) => {
    const { date } = req.params
    const StartDate = new Date(date)
    const endDate = new Date(StartDate)
    endDate.setDate(endDate.getDate() + 1)
    let eventsOnDay = await Event.find({
        startTime: {
            $gte: StartDate
        },
        endTime: {
            $lt: endDate
        }
    })
    res.render('dayView', { eventsOnDay, title: date, styles: ['/css/dayView.css'], scripts: [] })
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    const event = await Event.findById(id)
    res.render('viewIndividual', { event, title: event.name, styles: [], scripts: [] })
})

app.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    const event = await Event.findById(id)
    res.render('edit', { event, title: event.name, styles: [], scripts: ['/js/edit.js'] })
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    req.body = calculateDate(req.body)
    const event = await Event.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/${id}`)
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Event.findByIdAndDelete(id)
    res.redirect('/')
})

let calculateDate = function (body) {
    body.startTime = new Date(body['start.year'], body['start.month'] - 1, body['start.date'], body['start.hour'], body['start.minute'])
    body.endTime = new Date(body['end.year'], body['end.month'] - 1, body['end.date'], body['end.hour'], body['end.minute'])
    return body;
}

function sortByStartDate(arr) {
    return arr.sort((a, b) => {
        // Convert startDate strings to Date objects for comparison
        const dateA = new Date(a.startTime);
        const dateB = new Date(b.startTime);

        // Compare the dates
        if (dateA < dateB) {
            return -1;
        } else if (dateA > dateB) {
            return 1;
        } else {
            return 0;
        }
    });
}

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})