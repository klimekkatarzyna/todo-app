import express from 'express';
import Task from '../models/task';

const mainTasks = express.Router();

mainTasks.post('/addTaskToImportantList', async (req, res) => {
    Task.find({ id: req.body._id }, (err, docs) => {

    
    });
});

export default mainTasks;