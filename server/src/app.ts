import express, { RequestHandler } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/router';
import lists from './routes/lists';
import tasks from './routes/tasks';
import groups from './routes/groups';
import mainTasks from './routes/mainTasks';
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
connect('mongodb+srv://user1:Klimek09@cluster0.hgr10.mongodb.net/User?retryWrites=true&w=majority');

/* MAIN SET UP */
require('dotenv').config();

const app = express();
const httpServer = createServer(app);

app.use(
	cors({
		origin: 'http://localhost:8080', // port which will fetch to server <= frontend port
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

httpServer.listen(process.env.SOCKET_PORT, () => {
	console.log(`socket io running on port ${process.env.SOCKET_PORT}`);
});

app.listen(process.env.PORT, () => {
	console.log(`server started on port ${process.env.PORT}, Hello World  🤘`);
});

app.use('/api', router);
app.use('/api', lists);
app.use('/api', tasks);
app.use('/api', mainTasks);
app.use('/api', groups);
/* */

const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:8080',
		credentials: true,
	},
});

let allSocketConnections = [] as IAllSocketConnections[]; // TODO: add redisś

io.on('connection', socket => {
	console.log('A Connection has been made from: ', socket.id);

	const socketHandShake = socket.handshake.headers.cookie || '';

	if (socketHandShake === '') return;

	const parsedSocketHandShake = parse(socketHandShake as string);
	const SECRET = '.Ge~!!Wcv|vREPrmRrm.p3m$pm.5.$';
	const connectionToken = jwt?.verify(parsedSocketHandShake.access_token, SECRET) as any;

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
