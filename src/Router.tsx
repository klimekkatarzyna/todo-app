import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
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
import { AuthContext } from './AuthProvider';
import useAuthorization from './hooks/useAuthorization';
import Header from './components/Header';

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
    const { checkSession } = useAuthorization();
    const { mutate: mutateCheckSession, data, isLoading, error, status } = useMutation(checkSession);
    const { setAuthData, isUserAutorized, userData } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        token && mutateCheckSession(token as string);
    }, [token]);

    useEffect(() => {
        setAuthData(data);
    }, [setAuthData, data]);

    //console.log('isUserAutorized', error, status);

    return (
        <Wrapper>
            <Router>
                {isUserAutorized &&
                    <Header userName={userData.username} />
                }
                <Content>
                    {isUserAutorized &&
                        <Sidebar />
                    }
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
                </Content>
            </Router>
        </Wrapper>
    );
};

export default BrowserRouter;