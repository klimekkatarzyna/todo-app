import { List } from '../models/list';
import { io, allSocketConnections } from '../app';

export const taskSocket = (eventName: string, parentFolderId: string, task?: any) =>
	List.findById({ _id: parentFolderId }, (err: unknown, list: any) => {
		const members = [...new Set(list?.members)];
		const allMembers = members.concat(list?.userId?.toString());
		for (let [socketId, socket] of io.sockets.sockets) {
			allSocketConnections?.map(data => {
				if (socketId === data?.socketId) {
					return allMembers?.map(member => {
						if (member === data?.userId) {
							return socket.emit(eventName, task);
						}
					});
				}
			});
		}
	});
