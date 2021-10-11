import { useEffect } from 'react';
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
import useAuthorization from './hooks/useAuthorization';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import useProviderAuth from './hooks/useProviderAuth';

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
    const { checkSession, authData } = useAuthorization();
    const { mutate: mutateCheckSession } = useMutation(checkSession);
    const { isUserAutorized } = useProviderAuth();
    
    const token = localStorage.getItem('token');

    useEffect(() => {
        token && mutateCheckSession(token as string);
    }, [token]);

    console.log('isUserAutorized', isUserAutorized, authData)

    return (
        <Wrapper>
            <Router>
                {authData.auth &&
                    <Header userName={''} />
                }
                <Content>
                    {authData.auth &&
                        <Sidebar />
                    }
                    <Switch>
                        {!authData.auth ? (
                            <>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            {/* <Route render={(routeProps) => {
                                return (
                                    <NotFound />
                                );
                            }} /> */}
                            </>
                        ) : (
                            <>
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
                            
                            </>
                        )}
                    </Switch>
                </Content>
            </Router>
        </Wrapper>
    );
};

export default BrowserRouter;