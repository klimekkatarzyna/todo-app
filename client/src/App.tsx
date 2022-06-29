import { FC } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import BrowserRouter from './Router';
import { RecoilRoot } from 'recoil';
import toast, { Toaster } from 'react-hot-toast';
import { ContextProviders } from './ContextProviders';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
	queryCache: new QueryCache({
		onError: error => toast.error(`Something went wrong: ${error}`),
	}),
});

const App: FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<ContextProviders>
					{/* <ReactQueryDevtools initialIsOpen /> */}
					<BrowserRouter />
					<Toaster
						toastOptions={{
							className: 'p-4 text-fontColor',
						}}
					/>
				</ContextProviders>
			</RecoilRoot>
		</QueryClientProvider>
	);
};

export default App;
