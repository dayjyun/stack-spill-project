const express = require("express")
const router = express.Router()
const { Question } = require("../db/models")

// Get All Questions
router.get('/', async (req, res) => {
    const Questions = await Question.findAll()
    res.json({ Questions })
})


// Get Question from an ID



// Create A Question



// Edit A Question



// Delete A Question



module.exports = router;
