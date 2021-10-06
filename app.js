const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./server/router');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// connect to mongoDB server
mongoose.connect('mongodb+srv://user1:Klimek09@cluster0.hgr10.mongodb.net/User?retryWrites=true&w=majority', { useNewUrlParser: true });

/* MAIN SET UP */

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}));

// Middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API working');
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

app.use('/api', router);

/* */