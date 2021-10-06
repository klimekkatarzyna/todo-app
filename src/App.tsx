import React, { FC } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './AuthProvider';
import MyDay from './pages/MyDay';
import Important from './pages/Important';
import Planned from './pages/Planned';
import { Sidebar } from './components/Sidebar';
import Inbox from './pages/Inbox';
import Assigned from './pages/Assigned';
// import Routers from './routes';
import PrivateRoute from './PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';

const queryClient = new QueryClient();

const Wrapper = styled.div`
    display: flex;
    flex: 1 1 0px;
    will-change: width;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
`;
  

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

const App: FC = (props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ReactQueryDevtools initialIsOpen />
                <GlobalStyle />
                <Wrapper>
                    <Router>
                        {localStorage.getItem('token') && ( //TODO: it should be user 
                            <Sidebar />
                        )} 

                        <Switch>
                            <Route exact path="/register">
                                <Register />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <PrivateRoute exact path="/">
                                <MyDay />
                            </PrivateRoute>
                            <PrivateRoute exact path="/my_day">
                                <MyDay />
                            </PrivateRoute>
                            <PrivateRoute path="/important">
                                <Important />
                            </PrivateRoute>
                            <PrivateRoute path="/planned">
                                <Planned />
                            </PrivateRoute>
                            <PrivateRoute path="/assigned_to_me">
                                <Assigned />
                            </PrivateRoute>
                            <PrivateRoute path="/inbox">
                                <Inbox />
                            </PrivateRoute>
                        </Switch>
                    </Router>
                </Wrapper>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
