require('dotenv').config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import auth from './routes/auth';
import lists from './routes/lists';
import tasks from './routes/tasks';
import groups from './routes/groups';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

interface IAllSocketConnections {
	socketId: string;
	userId: string;
}

// connect to mongoDB server
connect(process.env.MONGODB_CONNECTION!);

/* MAIN SET UP */

const app = express();
const httpServer = createServer(app);

app.use(
	cors({
		origin: process.env.FRONTEND, // port which will fetch to server <= frontend port
		credentials: true,
	})
);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.get('/', (req, res) => {
	res.send('API working');
});

httpServer.listen(process.env.PORT, () => {
	console.log(`server running on port ${process.env.PORT}`);
});

app.use('/api', auth);
app.use('/api', lists);
app.use('/api', tasks);
app.use('/api', groups);
/* */

const io = new Server(httpServer, {
	cors: {
		origin: process.env.FRONTEND,
		credentials: true,
	},
});

let allSocketConnections = [] as IAllSocketConnections[]; // TODO: add redisś

io.on('connection', socket => {
	console.log('A Connection has been made from: ', socket.id);

	const socketHandShake = socket.handshake.headers.cookie || '';

	if (socketHandShake === '') return;

	const parsedSocketHandShake = parse(socketHandShake as string);
	const SECRET = process.env.SECRET_KEY!;

	if (parsedSocketHandShake?.access_token === undefined) return;
	const connectionToken = jwt?.verify(parsedSocketHandShake?.access_token || '', SECRET) as any;
	allSocketConnections.push({
		socketId: socket.id,
		userId: connectionToken._id,
	});

	console.log('======================');

	socket.on('message', message => {
		console.log(`message from ${socket.id} : ${message}`);
	});

	socket.on('disconnect', () => {
		console.log(`socket ${socket.id} disconnected`);
	});
});

export { io, allSocketConnections };
