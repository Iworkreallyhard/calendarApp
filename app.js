const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const path = require('path')
const methodOverride = require('method-override')
const Event = require('./models/eventSchema')
const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/calendarApp');

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    //res.send('Hello World!')
    const events = await Event.find();
    res.render('show', { events })
})

app.get('/new', (req, res) => {
    const dateNow = new Date()
    res.render('new', { dateNow })
})

app.post('/new', async (req, res) => {
    console.log(req.body)
    let event = new Event(req.body)
    await event.save()
    res.redirect(`/${event._id}`)
})

app.get('/calendar', (req, res) => {
    res.render('calendarView')
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    const event = await Event.findById(id)
    res.render('viewIndividual', { event })
})

app.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    const event = await Event.findById(id)

    res.render('edit', { event })
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
    body.start.calculated = `${body.start.year}-${body.start.month}-${body.start.date}T${body.start.hour}:${body.start.minute}`
    body.end.calculated = `${body.end.year}-${body.end.month}-${body.end.date}T${body.end.hour}:${body.end.minute}`
    return body;
}

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})