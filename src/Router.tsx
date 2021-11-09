import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import MyDay from './pages/MyDay';
import Important from './pages/Important';
import Planned from './pages/Planned';
import { Sidebar } from './components/Sidebar';
import Inbox from './pages/Inbox';
import Assigned from './pages/Assigned';
import PrivateRoute from './PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Tasks from './pages/Tasks';
import NotFound from './pages/NotFound';
import { AuthContext, AuthContextType } from './AuthContext';
import { HttpResponse } from './utils/http';
import { IUserData } from './interfaces';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0px;
`;

const Content= styled.div`
    display: flex;
    flex: 1 1 0px;
`;
  
const BrowserRouter = () => {
    const { checkSession, authData, LoginIsLoading, setAuthData, loginoutData } = useContext<AuthContextType>(AuthContext);
    const token = localStorage.getItem('token');
    const { isLoading: checkSessionIsLoading, data } = useQuery('checkSession', async () => {
        const response = await checkSession(token as string);
        return response;
    });

    useEffect(() => {
        if (data) {
            setAuthData(data as React.SetStateAction<HttpResponse<IUserData>>);
        }
    }, [data]);

    return (
        <Wrapper>
            {(LoginIsLoading || checkSessionIsLoading) ? (
                <div>{'loading...'}</div>
            ) : (
            <Router>
                {authData?.auth &&
                    <Header userName={authData?.body?.username || ''} />
                }
                <Content>
                    {authData?.auth &&
                        <Sidebar />
                    }
                    <Switch>
                        {authData?.auth ? (
                            <>
                                <PrivateRoute exact path="/tasks/">
                                    <MyDay />
                                </PrivateRoute>
                                <PrivateRoute exact path="/tasks/important">
                                    <Important />
                                </PrivateRoute>
                                <PrivateRoute exact path="/tasks/planned">
                                    <Planned />
                                </PrivateRoute>
                                <PrivateRoute exact path="/tasks/assigned_to_me">
                                    <Assigned />
                                </PrivateRoute>
                                <PrivateRoute exact path="/tasks/inbox">
                                    <Inbox />
                                </PrivateRoute>
                                <PrivateRoute exact path="/tasks/:listId">
                                    <Tasks />
                                </PrivateRoute>
                                <PrivateRoute exact path="/tasks/:listId/:taskId">
                                    <Tasks />
                                </PrivateRoute>

                            {/* <Route render={(routeProps) => {
                                return (
                                    <NotFound />
                                );
                            }} /> */}
                            </>
                        ) : (
                            <>
                                <Route path="/register">
                                    <Register />
                                </Route>
                                <Route path="/login">
                                    <Login />
                                </Route>
                            </>
                        )}
                    </Switch>
                </Content>
            </Router>
            )}
        </Wrapper>
    );
};

export default BrowserRouter;