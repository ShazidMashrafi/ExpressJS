const mongoose = require('mongoose'); 

const connection = mongoose.connect('mongodb://0.0.0.0/demo').then(() => {
    console.log('Database connected')
}).catch((err) => {
    console.log('Database connection error', err)
})

module.exports = connection