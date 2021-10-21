const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const List = require('./models/list');
const MainList = require('./models/mainList');

router.post('/createList', async (req, res) => {
    List.find({ id: req.body._id }, (err, docs) => {

        const list = new List({
            title: req.body.title,
            themeColor: 'blue',
            taskNumber: undefined,
            createdAt: Date.now()
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
                    taskNumber: list.taskNumber,
                    createdAt: list.createdAt
                },
                message: `created list successfully`,
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

router.get('/getLists', async (req, res) => {
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

router.get('/getList/:id', async (req, res) => {
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

router.delete('/removeList', async (req, res) => {
    List.deleteOne({ _id: req.body.listId }, (err, docs) => {
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

router.post('/createMainList', async (req, res) => {
    MainList.find((err, docs) => {
        const data = new MainList(req.body.data);
        console.log(docs, data)

        const token = jwt.sign({
            data: 'tooken',
        }, ':7HK2ATab_', { expiresIn: '24h' });
        
        data.save()
        .then(() => {
            res.json({
                token,
                body: data,
                message: `created list successfully`,
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

router.get('/getMainList', async (req, res) => {
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

module.exports = router;
