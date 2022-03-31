import { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './AuthProvider';
import BrowserRouter from './Router';
import { ModalVisibilityProvider } from './ModalVisibilityProvider';
import { ContextualMenuProvider } from './ContextualMenuProvider';
import { SocketProvider } from './providers/SocketProvider';
import { ElementVisibilityProvider } from './providers/ElementVisibilityProvider';
import { RecoilRoot } from 'recoil';

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
		overflow: hidden;
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
			<RecoilRoot>
				<AuthProvider>
					<SocketProvider>
						<ModalVisibilityProvider>
							<ContextualMenuProvider>
								<ElementVisibilityProvider>
									{/* <ReactQueryDevtools initialIsOpen /> */}
									<GlobalStyle />
									<BrowserRouter />
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
