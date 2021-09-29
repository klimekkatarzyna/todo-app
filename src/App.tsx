import React, { FC } from 'react';
import styled from 'styled-components';
import { Board } from './components/Board';
import { Sidebar } from './components/Sidebar';

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
