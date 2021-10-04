import React, { FC } from 'react';
import styled from 'styled-components';
import { COLOURS } from "../constants";

const ToolbarStyled = styled.div<{ colorType: 'grey' | 'blue' | 'red' | 'green' }>`
    display: flex;
    margin-bottom: 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.3rem;
    font-weight: 600;
    padding: 0.5rem;
    color: ${props => 
        props.colorType === 'grey' && COLOURS.fontColor || 
        props.colorType === 'blue' && COLOURS.blue ||
        props.colorType === 'red' && COLOURS.red ||
        props.colorType === 'green' && COLOURS.green};
`;

interface IToolbar {
    name: string;
    colorType?: 'grey' | 'blue' | 'red' | 'green';
}

const Toolbar: FC<IToolbar> = ({ name, colorType = 'grey' }) => {
    return (
        <ToolbarStyled colorType={colorType}>
            {name}
        </ToolbarStyled>
    );
};

export default Toolbar;