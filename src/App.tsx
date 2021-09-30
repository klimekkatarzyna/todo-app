import React, { FC } from 'react';
import styled from 'styled-components';
import { Board } from './components/Board';
import { Sidebar } from './components/Sidebar';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Login from './pages/Login';

const Wrapper = styled.div`
    display: flex;
`;

const App: FC = () => {
    return (
        <Wrapper>
            <Sidebar />
            <Board />
        </Wrapper>
    );
}

export default App;
