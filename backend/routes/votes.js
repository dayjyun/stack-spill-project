const express = require("express");
const router = express.Router();
const { Vote } = require('../db/models')

// Get All Votes
router.get('/', async(req, res) => {
    const votes = await Vote.findAll({
        order: [[ "createdAt", "DESC" ]]
    })
    res.json(votes)
})


module.exports = router
