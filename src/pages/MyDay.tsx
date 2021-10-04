import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Board } from '../components/Board';
import Toolbar from '../components/Toolbar';
import { SideMenuType } from '../enums';

const Body = styled.div`
    flex: 1;
    background: linear-gradient(180deg, white, white 52px, #e5e5e5 52px, #e5e5e5 52px);
    background-size: 100% 53px;
    box-shadow: inset 0 1px 0 0 #e5e5e5;
`;

const MyDay: FC = () => {

    return (
        <Board>
            <Toolbar name={'Mój dzień'} viewType={SideMenuType.myDay} />
            <Body>

            </Body>
        </Board>
    );
}

export default MyDay;