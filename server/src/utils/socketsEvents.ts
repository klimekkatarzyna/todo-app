import { List } from '../models/list';
import { io, allSocketConnections } from '../app';

export const taskSocket = (eventName: string, parentFolderId: string, task?: any) =>
	List.findById({ _id: parentFolderId }, (err: unknown, list: any) => {
		const members = [...new Set(list?.members)];
		const allMembers = members.concat(list?.userId?.toString());
		for (let [socketId, socket] of io.sockets.sockets) {
			console.log(io.sockets.sockets);
			allSocketConnections?.map(data => {
				console.log({ allSocketConnections });
				if (socketId === data?.socketId) {
					console.log({ socketId });
					return allMembers?.map(member => {
						console.log(allMembers);
						if (member === data?.userId) {
							console.log({ task });
							return socket.emit(eventName, task);
						}
					});
				}
			});
		}
	});
