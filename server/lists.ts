import express from 'express';
import jwt from 'jsonwebtoken';
import List from './models/list';
import MainList from './models/mainList';

const lists = express.Router();

lists.post('/createList', async (req, res) => {
    List.find({ id: req.body._id }, (err, docs) => {

        const list = new List({
            title: req.body.title,
            themeColor: 'blue',
            createdAt: Date.now(),
            taskNumber: req.body.taskNumber
        });

        const token = jwt.sign({
            data: 'tooken',
        }, ':7HK2ATab_', { expiresIn: '24h' });
        
        list.save()
        .then(() => {
            res.json({
                token,
                body: {
                    id: list._id,
                    title: list.title,
                    themeColor: list.themeColor,
                    createdAt: list.createdAt,
                    taskNumber: list.taskNumber
                },
                message: `created list successfully`,
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

lists.get('/getLists', async (req, res) => {
    List.find((err, docs) => {
        try {
            res.json({
                body: {
                    lists: docs
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

lists.get('/getList/:id', async (req, res) => {
    List.find({ _id: req.params.id }, (err, docs) => {
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

lists.delete('/removeList', async (req, res) => {
    List.deleteOne({ _id: req.body.listId }, (err: unknown, docs: unknown) => {
        try {
            res.json({
                body: {
                    lists: docs
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

lists.get('/getMainList', async (req, res) => {
    MainList.find((err, docs) => {
        try {
            res.json({
                body: {
                    mainLists: docs
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

export default lists;
