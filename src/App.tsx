import { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './AuthProvider';
import BrowserRouter from './Router';
import { ShowModalProvider } from './ShowModalProvider';
import { ContextualMenuProvider } from './ContextualMenuProvider';
import { ListsProvider } from './providers/ListsProviders';
import { SocketProvider } from './providers/SocketProvider';
import { TasksProvider } from './providers/TasksProvider';
import { useParams } from 'react-router-dom';
import { IUseParams } from './interfaces/app';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 1rem;
        height: 100%;
    }

    #root {
        height: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
`;

const App: FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<SocketProvider>
					<ListsProvider>
						<TasksProvider>
							<ShowModalProvider>
								<ContextualMenuProvider>
									{/* <ReactQueryDevtools initialIsOpen /> */}
									<GlobalStyle />
									<BrowserRouter />
								</ContextualMenuProvider>
							</ShowModalProvider>
						</TasksProvider>
					</ListsProvider>
				</SocketProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;
