import React from 'react';
import { Board } from '../components/Board';
import Toolbar from '../components/Toolbar';

const Assigned = () => {
    return (
        <Board>
            <Toolbar name={'Przypisane do mnie'} colorType={'green'} />
        </Board>
    );
};

export default Assigned;