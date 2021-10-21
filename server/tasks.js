const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Task = require('./models/task');

router.post('/createTask', async (req, res) => {
    Task.find({ id: req.body._id }, (err, docs) => {

        const task = new Task({
            title: req.body.title,
            parentFolderId: req.body.parentFolderId,
            importance:  req.body.importance,
            createdAt: Date.now()
        });

        const token = jwt.sign({
            data: 'tooken',
        }, ':7HK2ATab_', { expiresIn: '24h' });
        
        task.save()
        .then(() => {
            res.json({
                token,
                body: {
                    id: task._id,
                    title: task.title,
                    parentFolderId: task.parentFolderId,
                    importance: task.importance,
                    createdAt: task.createdAt
                },
                message: `created task successfully`,
                status: 200
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                errorMessage: `something went wrong`,
                err,
                status: 500
            })
        });
    });
});

router.get('/getTasks/:listId', async (req, res) => {
    Task.find({ parentFolderId: req.params.listId }, (err, docs) => {
        try {
            res.json({
                body: {
                    tasks: docs
                },
                status: 200
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                errorMessage: `something went wrong`,
                err,
                status: 500
            })
        }
    });
});

module.exports = router;
