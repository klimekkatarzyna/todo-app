import React, { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { AuthContext } from '../AuthProvider';
import { DefaultEventsMap } from '@socket.io/component-emitter';

interface ISocketContext {
	socket: Socket;
}
export const SocketContext = createContext<ISocketContext>({} as ISocketContext);

interface ISocketProvider {
	children: React.ReactNode;
}
export const SocketProvider: FC<ISocketProvider> = ({ children }) => {
	const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
	const { authData } = useContext(AuthContext);

	useEffect(() => {
		// manage one global socket instance
		if (authData?._id === undefined) return;
		const socket = io(process?.env?.REACT_APP_SOCKET_LOCAL_URL || '', { withCredentials: true });
		socket.on('connect', () => {
			console.log('Client connected:', socket, socket.connected);
		});

		setSocket(socket);

		socket.onAny(eventName => {
			console.log(eventName);
		});

		socket.on('disconnect', reason => console.log(`Client disconnected: ${reason}`));

		socket.on('connect_error', reason => console.log(`Client connect_error: ${reason}`));
	}, [authData]);

	const value = useMemo(() => {
		return { socket };
	}, [socket]);

	return <SocketContext.Provider value={value as ISocketContext}>{children}</SocketContext.Provider>;
};