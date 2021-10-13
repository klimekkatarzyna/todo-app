import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useMutation } from 'react-query';
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
import NotFound from './pages/NotFound';
import { AuthContext, AuthContextType } from './AuthContext';

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
    const { checkSession, authData, LoginIsLoading } = useContext<AuthContextType>(AuthContext);
    const { mutate: mutateCheckSession, isLoading: checkSessionIsLoading } = useMutation(checkSession);
    
    const token = localStorage.getItem('token');

    useEffect(() => {
        token && mutateCheckSession(token);
    }, []);

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
                                <PrivateRoute exact path="/">
                                    <MyDay />
                                </PrivateRoute>
                                <PrivateRoute exact path="/important">
                                    <Important />
                                </PrivateRoute>
                                <PrivateRoute exact path="/planned">
                                    <Planned />
                                </PrivateRoute>
                                <PrivateRoute exact path="/assigned_to_me">
                                    <Assigned />
                                </PrivateRoute>
                                <PrivateRoute exact path="/inbox">
                                    <Inbox />
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