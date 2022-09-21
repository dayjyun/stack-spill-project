const express = require("express");
const router = express.Router();
const { Vote } = require('../db/models')
const { requireAuth } = require('../utils/auth')

// Get All Votes //! Not in Wiki
router.get('/', async(req, res) => {
    const votes = await Vote.findAll({
        order: [[ "createdAt", "DESC" ]]
    })
    res.json(votes)
})


module.exports = router
