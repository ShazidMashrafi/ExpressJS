const mongoose = require("mongoose")

async function connectDB() {
    await mongoose.connect("mongodb+srv://system:IB48xe9dn0px6KSY@cluster0.iklp7le.mongodb.net/notes-app")

    console.log("DB connected")
}

module.exports = connectDB