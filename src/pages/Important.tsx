import React, { FC } from 'react';
import { Board } from '../components/Board';
import Toolbar from '../components/Toolbar';

const Important: FC = () => {

    return (
        <Board>
            <Toolbar name={'Wazne'} colorType={'blue'} />
        </Board>
    );
}

export default Important;