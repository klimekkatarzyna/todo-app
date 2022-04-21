import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './AuthProvider';
import BrowserRouter from './Router';
import { ModalVisibilityProvider } from './ModalVisibilityProvider';
import { ContextualMenuProvider } from './ContextualMenuProvider';
import { SocketProvider } from './providers/SocketProvider';
import { ElementVisibilityProvider } from './providers/ElementVisibilityProvider';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';

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
						<ModalVisibilityProvider>
							<ContextualMenuProvider>
								<ElementVisibilityProvider>
									{/* <ReactQueryDevtools initialIsOpen /> */}
									<BrowserRouter />
									<Toaster
										toastOptions={{
											className: 'p-4 text-fontColor',
										}}
									/>
								</ElementVisibilityProvider>
							</ContextualMenuProvider>
						</ModalVisibilityProvider>
					</SocketProvider>
				</AuthProvider>
			</RecoilRoot>
		</QueryClientProvider>
	);
};

export default App;
