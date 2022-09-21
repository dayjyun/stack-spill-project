const express = require('express');
const router = express.Router()
const { Answer } = require("../db/models")

// Get Answer using ID
router.get('/:answerId', async (req, res) => {
    const { answerId } = req.params;
    const answer = await Answer.findByPk(answerId)

    if (!answer) {
        const error = new Error("Answer not found")
        error.status = 404;
        throw error;
    }
    res.json(answer)
})


// Get All Answers
router.get('/', async (req, res) => {
    const Answers = await Answer.findAll({
        order: [[ 'createdAt', 'DESC' ]]
    })
    res.json({ Answers })
})



// Create an Answer
router.post('/')


// Edit Answer



// Delete Answer

module.exports = router;
