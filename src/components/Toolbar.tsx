import React, { FC } from 'react';
import styled from 'styled-components';
import { SideMenuType } from '../enums';

const ToolbarStyled = styled.div`
    display: flex;
    margin-bottom: 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.3rem;
    font-weight: 600;
    padding: 0.5rem;
`;

interface IToolbar {
    name: string;
    viewType: SideMenuType;
}

const Toolbar: FC<IToolbar> = ({ name }) => {
    return (
        <ToolbarStyled >
            {name}
        </ToolbarStyled>
    );
};

export default Toolbar;