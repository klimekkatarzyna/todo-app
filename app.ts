import express, { RequestHandler } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './server/router';
import lists from './server/lists';
import tasks from './server/tasks';
import mainTasks from './server/mainTasks';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// connect to mongoDB server
mongoose.connect('mongodb+srv://user1:Klimek09@cluster0.hgr10.mongodb.net/User?retryWrites=true&w=majority');

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

app.use(cookieParser() as RequestHandler);

app.get('/', (req, res) => {
    res.send('API working');
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

app.use('/api', router);
app.use('/api', lists);
app.use('/api', tasks);
app.use('/api', mainTasks);
/* */