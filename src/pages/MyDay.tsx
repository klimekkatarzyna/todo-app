import React, { FC } from 'react';
import { Board } from '../components/Board';
import Toolbar from '../components/Toolbar';
import { Body } from '../constants';

const MyDay: FC = () => {
    return (
        <Board>
            <Toolbar name={'Mój dzień'} colorType={'grey'} isDateVisible />
            
            <Body>
            </Body>
        </Board>
    );
}

export default MyDay;