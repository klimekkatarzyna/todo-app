import React, { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { AuthContext } from '../AuthProvider';
import { DefaultEventsMap } from '@socket.io/component-emitter';

interface ISocketContext {
	socket: Socket;
}
export const SocketContext = createContext<ISocketContext>({} as ISocketContext);

export const SocketProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
	const { authData } = useContext(AuthContext);

	useEffect(() => {
		if (authData?._id === undefined) return;
		const socket = io(process?.env?.REACT_APP_SOCKET_LOCAL_URL || '', { withCredentials: true });

		setSocket(socket);

		socket.on('connect_error', reason => console.log(`Client connect_error: ${reason}`));
	}, [authData]);

	const value = useMemo(() => {
		return { socket };
	}, [socket]);

	return <SocketContext.Provider value={value as ISocketContext}>{children}</SocketContext.Provider>;
};
