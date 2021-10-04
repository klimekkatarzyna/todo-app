import React, { FC, useCallback, useState } from 'react';
import { Board } from '../components/Board';
import Toolbar from '../components/Toolbar';

const Important: FC = () => {

    return (
        <Board>
            <Toolbar name={'Wazne'} />
        </Board>
    );
}

export default Important;