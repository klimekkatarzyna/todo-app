import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { COLOURS } from '../../constants';

interface IButtonProps {
    primary?: boolean;
    secondary?: boolean;
    outline?: boolean;
    disabled?: boolean;
    margin?: boolean;
}

const ButtonStyled = styled.button<IButtonProps>`
    padding: 0.5rem;
    border-radius: 0.3rem;
    border: none;
    cursor: pointer;
    color: ${COLOURS.fontColor};
    margin-top: ${props => props.primary && '1rem'};
    margin-left: 0.5rem;
    
    ${props => props.primary && css`
        background-color: ${COLOURS.blue};
        color:  ${COLOURS.white};
    `};

    ${props => props.secondary && css`
        background-color: ${COLOURS.red};
        color:  ${COLOURS.white};
    `};

    ${props => props.outline && css`
        background: none;
        border: 1px solid;
        color:  ${COLOURS.white};
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
    type?: 'button' | 'submit' | 'reset';
    primary?: boolean;
    secondary?: boolean;
    outline? : boolean;
    disabled?: boolean;
    margin?: boolean;
    onClick?: () => void;
}

const Button: FC<IButton> = ({ primary, children, type = 'submit', secondary, outline, disabled, margin, onClick }) => {
    return (
        <ButtonStyled
            primary={primary}
            secondary={secondary}
            outline={outline}
            type={type}
            disabled={disabled}
            margin={margin}
            onClick={onClick}>
                {children}
        </ButtonStyled>
    );
};

export default Button;