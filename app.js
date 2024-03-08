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
    res.render('new')
})

app.post('/new', async (req, res) => {
    console.log(req.body)
    let event = new Event(req.body)
    await event.save()
    res.redirect('/new')
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
    const event = await Event.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/${id}`)
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Event.findByIdAndDelete(id)
    res.redirect('/')
})

// let formatTime = function (time) {
//     let dateNow = new Date(time)
//     console.log(dateNow)
//     console.log(dateNow.toLocaleDateString())
//     let dateTimeString = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}T${dateNow.getHours()}:${dateNow.getMinutes()}`
//     console.log(dateTimeString)
//     console.log(typeof test)
//     return dateTimeString
// }

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})