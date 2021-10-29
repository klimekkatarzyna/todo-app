const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Task = require('./models/task');
const List = require('./models/list');

router.post('/createTask', async (req, res) => {
    Task.find({ id: req.body._id }, (err, docs) => {

        const task = new Task({
            title: req.body.title,
            parentFolderId: req.body.parentFolderId,
            importance:  req.body.importance,
            themeColor: req.body.themeColor,
            createdAt: Date.now(),
            taskStatus: req.body.taskStatus
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
                    themeColor: task.themeColor,
                    createdAt: task.createdAt,
                    taskStatus: task.taskStatus
                },
                message: `created task successfully`,
                status: 200
            });

            List.findOneAndUpdate({ _id: req.body.parentFolderId }, { $set: { taskNumber: docs.length } }, (err, docs) => {});
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

            List.findOneAndUpdate({ _id: req.params.listId }, { $set: { taskNumber: docs.length } }, (err, docs) => {});
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

router.patch('/changeTaskStatus/:taskId', async (req, res) => {
    Task.updateOne({ _id: req.params.taskId }, { $set: { taskStatus: req.body.taskStatus } }, (err, docs) => {
        try {
            res.json({
                message: `status changed successfully to ${req.body.taskStatus}`,
                status: 200
            });
        } catch (err) {
            console.log(err);
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
