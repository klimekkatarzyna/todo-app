const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const List = require('./models/list');
const auth = require('./middleware/auth');

router.post('/register', async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.find({ email: req.body.email }, (err, docs) => {
        if (!(docs || []).length) {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                id: req.body._id,
                createdAt: Date.now()
            });
            
            user.save()
            .then(() => {
                const token = jwt.sign({
                    data: 'tooken',
                    userId: user._id,
                }, ':7HK2ATab_', { expiresIn: '1h' });

                res.json({ 
                    auth: true, 
                    token,
                    body: {
                        username: user.username,
                        email: user.email,
                        id: user._id,
                        createdAt: user.createdAt
                    },
                    message: `registered user with email ${req.body.email}`,
                    status: 200
                });

                res.send(user);
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    errorMessage: `registration failed`,
                    err,
                    status: 500
                })
            });
        } else {
            res.status(400).json({
                success: false,
                errorMessage: `user already registered`,
                status: 400
            });
        }
    });
});

router.post('/login', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.find({ email: req.body.email }, (err, docs) => {
        if ((docs || []).length) {
            const data = docs?.[0];

            const token = jwt.sign({
                data: 'tooken',
                userId: data._id
            }, ':7HK2ATab_', { expiresIn: '3h' });
            
            res.json({
                token,
                auth: true, 
                body: {
                    _id: data._id,
                    username: data.username,
                    email: data.email,
                    password: hashedPassword,
                    createdAt: data.createdAt
                },
                message: `login user with email ${req.body.email}`
            });

        } else {
            res.status(500).json({
                success: false,
                errorMessage: `invalid credentials`,
                err
            })
        } 
    });
});

router.get('/me', auth, async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if (token) {
        jwt.verify(token, ':7HK2ATab_', async (err, data) => {

            const user = await User.find({ _id: data.userId});
            if (err) {
                res.status(403).json({
                    success: false,
                    errorMessage: 'unsuccesful log in',
                    err
                })
            } else {
                res.json({
                    auth: true,
                    message: 'Successful log in',
                    body: {
                        _id: user[0]._id,
                        username: user[0].username,
                        email: user[0].email,
                        createdAt: user[0].createdAt
                    }
                });
            }
        })
    }
});

router.post('/logout', (req, res) => {
    res.json({
        auth: false,
        status: 200
    });;
});

router.post('/createList', async (req, res) => {
    List.find({ id: req.body._id }, (err, docs) => {
        if (!(docs || []).length) {
            const list = new List({
                title: req.body.title,
                email: req.body.email,
                id: req.body._id,
                createdAt: Date.now()
            });
            
            list.save()
            .then(() => {
                    const token = jwt.sign({
                        data: 'tooken',
                        userId: user._id,
                    }, ':7HK2ATab_', { expiresIn: '1h' });

                    res.json({ 
                        auth: true, 
                        token,
                        body: {
                            title: list.title,
                            email: list.email,
                            id: list._id,
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
        } else {
            res.status(400).json({
                success: false,
                errorMessage: `wtf?`,
                status: 400
            });
        }
    });
});

module.exports = router;
