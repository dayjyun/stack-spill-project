const express = require("express")
const router = express.Router()
const { Question } = require("../db/models");

// Get Question from an ID
router.get('/:questionId', async (req, res) => {
    const { questionId } = req.params;
    const Query = await Question.findByPk(questionId)

    if (!Query) {
        
    }

    res.json({ Query })
})


// Get All Questions
router.get('/', async (req, res) => {
    const Questions = await Question.findAll()
    res.json({ Questions })
})


// Create A Question



// Edit A Question



// Delete A Question



module.exports = router;
