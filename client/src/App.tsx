import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './AuthProvider';
import { BrowserRouter } from './Router';
import { ContextMenuProvider } from './ContextMenuProvider';
import { SocketProvider } from './providers/SocketProvider';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import { TasksContextMenuProvider } from './providers/TasksContextMenuProvider';
import { ThemeProvider } from './providers/ThemeContext';

const queryClient = new QueryClient({});

const App: FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<ThemeProvider>
					<AuthProvider>
						<SocketProvider>
							<ContextMenuProvider>
								<TasksContextMenuProvider>
									<BrowserRouter />
									<Toaster
										toastOptions={{
											className: 'p-4 text-fontColor',
										}}
									/>
								</TasksContextMenuProvider>
							</ContextMenuProvider>
						</SocketProvider>
					</AuthProvider>
				</ThemeProvider>
			</RecoilRoot>
		</QueryClientProvider>
	);
};

export default App;
