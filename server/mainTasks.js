const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Task = require('./models/task');
const MainList = require('./models/mainList');

router.post('/addTaskToImportantList', async (req, res) => {
    Task.find({ id: req.body._id }, (err, docs) => {

    
    });
});

module.exports = router;