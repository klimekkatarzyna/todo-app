import React from 'react';
import { Board } from '../components/Board';
import Toolbar from '../components/Toolbar';

const Inbox = () => {
    return (
        <Board>
            <Toolbar name={'Zadania'} colorType={'red'} />
        </Board>
    );
};

export default Inbox;