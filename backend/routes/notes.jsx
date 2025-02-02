const express = require("express");
const router = express.Router();
const Notes = require('../models/Notes.jsx');
var fetchuser = require('../middelware/fetchuser.jsx');
const { body, validationResult } = require('express-validator');


// Route 1:   Get all notes using: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured Bruh");
    }
})

// Route 2:   Add new notes using: GET "/api/notes/addnotes". login required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid Title !').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 chars !').isLength({ min: 5 }),
], async (req, res) => {
    try {
        
        const {title, description, tag} = req.body;
        // if their are error return request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
    
        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured Bruh");
    }
})

// Route 3:   Update existing notes using: PUT "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const {title, description, tag} = req.body ;

    // Create a newNote Object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send("not found")}
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote} , {new:true})
    res.json({note});
})


// Route 4:  Deleting notes using: DELETE "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        
    

    // Find the note to be deleted and deleted it
    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send("not found")}

    // Allow deletion only if user owns this Note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Successfly" :" note has been delete"});

} catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured Bruh");
}
})


module.exports = router
