import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './AuthProvider';
import BrowserRouter from './Router';
import { ContextMenuProvider } from './ContextMenuProvider';
import { SocketProvider } from './providers/SocketProvider';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import { TasksContextMenuProvider } from './providers/TasksContextMenuProvider';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const App: FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<AuthProvider>
					<SocketProvider>
						<ContextMenuProvider>
							<TasksContextMenuProvider>
								{/* <ReactQueryDevtools initialIsOpen /> */}
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
			</RecoilRoot>
		</QueryClientProvider>
	);
};

export default App;
