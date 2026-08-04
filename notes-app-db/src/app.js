const express = require("express")
const noteModel = require("./models/note.model")

const app = express();
app.use(express.json())

/* POST */
app.post("/notes", async (req, res) => {
    const data  = req.body
    
    await noteModel.create({
        title: data.title,
        description: data.description,
    })
     
    res. status(201).json({
        message: "Note created"
    })
})

/* Get */
app.get("/notes", async (req, res) => {
    /*
    find => [{}, {}] or []
    findOne => {} or null
    */
    
    // const notes = await noteModel.findOne({
    //     title: "test_title"    
    // })

    const notes = await noteModel.find({
        // title: "test_title"    
    })
    
    res.status(200).json({
        message: "Notes Fetched Successfully",
        notes: notes
    })
})

/* Delete */
app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete({
        _id : id
    })

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

/* Update */
app.patch("/notes/:id", async(req, res) => {
    const id = req.params.id
    const title = req.body.title
     
    await noteModel.findOneAndUpdate({
        _id: id
    }, {
        title: title
    })

     res.status(200).json({
        message: "Note updated successfully"
     })
    
})

module.exports = app 