import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from './models/user';
import auth from './middleware/auth';

const router = express.Router();

router.post('/register', async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = await User.findOne({ email: req.body.email });

    if (!(Object.keys(user || []).length)) {
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
            }, ':7HK2ATab_', { expiresIn: '24h' });

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
        })
        .catch((err: unknown) => {
            res.status(500).json({
                success: false,
                errorMessage: `registration failed`,
                err
            })
        });
    } else {
        res.status(400).json({
            success: false,
            errorMessage: `user already registered`
        });
    }
});

router.post('/login', async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    try {
        const user = await User.findOne({ email: req.body.email });

        const token = jwt.sign({
            data: 'tooken',
            userId: user._id
        }, ':7HK2ATab_', { expiresIn: '24h' });
        
        res.json({
            token,
            auth: true, 
            body: {
                _id: user._id,
                username: user.username,
                email: user.email,
                password: hashedPassword,
                createdAt: user.createdAt
            },
            message: `login user with email ${req.body.email}`
        });

    } catch (err: unknown) {
        res.status(500).json({
            success: false,
            errorMessage: `invalid credentials`,
            err
        })
    }
});

router.get('/me', auth, async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (token) {
        jwt.verify(token, ':7HK2ATab_', async (err, data) => {

            const user = await User.findById(data?.userId);
            if (user) {
                res.status(200).json({
                    auth: true,
                    message: 'Successful log in',
                    body: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        createdAt: user.createdAt
                    },
                    token
                });
            } else {
                res.status(403).json({
                    success: false,
                    errorMessage: 'unsuccesful log in',
                    err
                })
            }
        })
    }
});

router.post('/logout', async (req, res) => {
    try {
        res.status(200).json({ 
            auth: false, 
            token: undefined,
            body: {},
            message: 'User logout'
        });
    } catch {
        res.status(500).json({ 
            message: 'something went wrong'
        });
    }
});

export default router;
