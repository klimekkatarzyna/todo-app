import React, { FC } from 'react';
import styled from 'styled-components';
import { COLOURS } from "../constants";
import { AppColorType } from '../enums';
import { day, dayName, month } from '../utils/date';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

const ToolbarStyled = styled.div<{ colorType: AppColorType }>`
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.3rem;
    font-weight: 600;
    padding: 0.5rem;
    color: ${props => 
        (props.colorType === 'grey' && COLOURS.fontColor) || 
        (props.colorType === 'blue' && COLOURS.blue) ||
        (props.colorType === 'red' && COLOURS.red) ||
        (props.colorType === 'green' && COLOURS.green)};
`;

const DateToday = styled.div`
    display: flex;
    padding-left: 0.5rem;
    font-size: 0.8rem;
    color: ${COLOURS.fontColor};
`;

interface IToolbar {
    name: string;
    colorType?: AppColorType;
    isDateVisible?: boolean;
}

const Toolbar: FC<IToolbar> = ({ name, colorType = 'grey', isDateVisible }) => {
    return (
        <Wrapper>
            <ToolbarStyled colorType={colorType}>
                {name}
            </ToolbarStyled>
            <DateToday>{isDateVisible && `${dayName}, ${day} ${month}`}</DateToday>
        </Wrapper>
    );
};

export default Toolbar;