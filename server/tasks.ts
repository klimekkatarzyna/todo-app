import express from 'express';
import jwt from 'jsonwebtoken';
import Task from './models/task';
import List from './models/list';

const tasks = express.Router();

tasks.post('/createTask', async (req, res) => {
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
        })
        .catch((err: unknown) => {
            res.status(500).json({
                success: false,
                errorMessage: `something went wrong`,
                err,
                status: 500
            })
        });
    });
});

tasks.get('/getTasks/:listId', async (req, res) => {
    Task.find({ parentFolderId: req.params.listId }, (err, docs) => {
        try {
            res.json({
                body: {
                    tasks: docs
                },
                status: 200
            });

            List.findOneAndUpdate({ _id: req.params.listId }, { $set: { taskNumber: docs.length } }, (err: unknown, docs: unknown) => {});
        } catch (error: unknown) {
            res.status(500).json({
                success: false,
                errorMessage: `something went wrong`,
                err,
                status: 500
            })
        }
    });
});

tasks.patch('/changeTaskStatus/:taskId', async (req, res) => {
    Task.updateOne({ _id: req.params.taskId }, { $set: { taskStatus: req.body.taskStatus } }, (err: unknown, docs: unknown) => {
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

tasks.delete('/removeTask', async (req, res) => {
    Task.deleteOne({ _id: req.body.taskId }, (err: unknown, docs: unknown) => {
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
    })
});

tasks.get('/getTask/:id', async (req, res) => {
    Task.find({ _id: req.params.id }, (err: unknown, docs: unknown) => {
        try {
            res.json({
                body: docs,
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

tasks.patch('/changeTaskImportance/:listId/:taskId', async (req, res) => {
    Task.updateOne({ _id: req.params.taskId, parentFolderId: req.params.listId }, { $set: { importance: req.body.importance } }, (err: unknown, docs: unknown) => {
        try {
            res.json({
                message: `importance successfully changed to ${req.body.importance}`,
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

export default tasks;
