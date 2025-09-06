const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {body, validationResult} = require('express-validator') 
const userModel = require('../models/user.model')


router.get('/register', (req, res) => {
    res.render('register')
 })

router.post('/register',
    body('email').trim().isEmail().isLength({min:5, max:100}),
    body('username').trim().isLength({min:3, max:30}),
    body('password').trim().isLength({min:6}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array() 
            })
        }

        const {username, email, password} = req.body
        const hashPass = await bcrypt.hash(password, 10) 
        
        const newUser = await userModel.create({
            username,
            email,
            password: hashPass
        })

        res.json(newUser)
    })

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', 
    body('username').trim().isLength({min:3, max:30}),
    body('password').trim().isLength({min:6}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array() 
            })
        }

        const {username, password} = req.body
        const user = await userModel.findOne({
            username: username
        })

        if(!user) {
            return res.status(400).json({
                msg: 'username or password is incorrect' 
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch) {
            return res.status(400).json({
                msg: 'username or password is incorrect'
            })
        }

        const token = jwt.sign({
            userId : user._id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET)

        res.cookie('token', token)
        res.send('Logged in')
})

module.exports = router;