const express = require('express')
const morgan = require('morgan')
const app = express()
app.set('view engine', 'ejs')
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Home page')
})

app.get('/about', (req, res) => {
    res.send('About us')
})

app.get('/profile', (req, res) => {
    res.send('Profile page')
})

app.get('/form', (req, res) => {
    res.render('index')
})

app.get('/get-form-data', (req, res) => {
    console.log(req.query)
    res.send('Form data received')
})

app.listen(3000)