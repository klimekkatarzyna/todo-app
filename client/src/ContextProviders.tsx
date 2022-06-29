import { FC } from 'react';
import { AuthProvider } from './AuthProvider';
import { ContextMenuProvider } from './ContextMenuProvider';
import { SocketProvider } from './providers/SocketProvider';
import { TasksContextMenuProvider } from './providers/TasksContextMenuProvider';
import { ThemeProvider } from './providers/ThemeContext';

export const ContextProviders: FC<{ children: unknown }> = ({ children }) => {
	return (
		<ThemeProvider>
			<AuthProvider>
				<SocketProvider>
					<ContextMenuProvider>
						<TasksContextMenuProvider>{children}</TasksContextMenuProvider>
					</ContextMenuProvider>
				</SocketProvider>
			</AuthProvider>
		</ThemeProvider>
	);
};
