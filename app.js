const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const path = require('path')
const Event = require('./models/eventSchema')
const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/calendarApp');

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    //res.send('Hello World!')
    const events = await Event.find();
    res.render('show', { events })
})

app.get('/new', (req, res) => {
    res.render('new')
})

app.post('/new', async (req, res) => {
    res.send('new post reached')
    req.body['startTime'] = req.body['start-time']
    req.body['endTime'] = req.body['end-time']
    let event = new Event(req.body)
    await event.save()
    res.redirect('/')
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    console.log(id)
    res.send('view event')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})