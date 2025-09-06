const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
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
        
        const newUser = await new userModel({
            username,
            email,
            password: hashPass
        })

        res.json(newUser)
    })



module.exports = router;