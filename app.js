const express = require('express')
const morgan = require('morgan')
const userModel = require('./models/user')
const dbConnection = require('./config/db')
const app = express()

app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Home page')
})

app.get('/about', (req, res) => {
    res.send('About us')
})

app.get('/profile', (req, res) => {
    res.send('Profile page')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const {username, email, password} = req.body
    const newUser = await userModel.create({username, email, password}) 

    res.send(newUser)
})

app.listen(3000)