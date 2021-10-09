import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { COLOURS } from '../../constants';

interface IButtonProps {
    primary?: boolean;
    secondary?: boolean;
    disabled?: boolean;
    margin?: boolean;
}

const ButtonStyled = styled.button<IButtonProps>`
    padding: 0.5rem;
    border-radius: 0.3rem;
    min-width: 200px;
    border: none;
    cursor: pointer;
    color:  ${COLOURS.white};
    margin-top: ${props => props.primary && '1rem'};
    
    ${props => props.primary && css`
        background-color: ${COLOURS.blue};
    `};

    ${props => props.secondary && css`
        background-color: ${COLOURS.red};
    `};

    ${props => props.disabled && css`
        &:disabled {
            background-color: ${COLOURS.lightBlue};
            cursor: not-allowed;
        }
    `};
`;

interface IButton {
    children: React.ReactNode;
    type: 'button' | 'submit' | 'reset';
    primary?: boolean;
    secondary?: boolean;
    disabled?: boolean;
    margin?: boolean;
}

const Button: FC<IButton> = ({ primary, children, type = 'submit', secondary, disabled, margin }) => {
    return (
        <ButtonStyled primary={primary} secondary={secondary} type={type} disabled={disabled} margin={margin}>
            {children}
        </ButtonStyled>
    );
};

export default Button;