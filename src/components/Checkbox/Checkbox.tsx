import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { COLOURS } from '../../constants';

interface CheckboxWrapperProps {
    round?: boolean;
    color?: 'blue' | 'gray' | 'red';
    disabled?: boolean;
}


const CheckboxWrapper = styled.div<CheckboxWrapperProps>`
    position: relative;
    display: flex;
    ${props => props.disabled && css`
        opacity: .5;
    `}

    label {
        position: relative;
        cursor: pointer;
        line-height: 1.3rem;
        display: flex;
        align-items: center;
    }

    input { 
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked ~ span {
            ${props => props.color === 'blue' && css`
                background-color: ${COLOURS.blue};
            `}
            ${props => props.color === 'red' && css`
                background-color: ${COLOURS.red};
            `}
            ${props => props.color === 'gray' && css`
                background-color: ${COLOURS.grey};
            `}
        }
        &:checked ~ span:after {
            display: block;
        }
    }
    
    span {
        position: relative;
        top: 0;
        left: 0;
        height: 1.3rem;
        width: 1.3rem;
        border-radius: 0.3rem;
        flex-shrink: 0;

        ${props => props.color === 'blue' && css`
            border: 1px solid ${COLOURS.blue};
        `}

        ${props => props.color === 'red' && css`
            border: 1px solid ${COLOURS.red};
        `}

        ${props => props.color === 'gray' && css`
            border: 1px solid ${COLOURS.grey};
        `}

        ${props => props.round && css`
            border-radius: 50%;
            height: 15px;
            width: 15px;
        `}

        &:after {
            content: "";
            position: absolute;
            display: none;
            left: 6px;
            top: 2px;
            width: 2px;
            height: 7px;
            border: solid ${COLOURS.white};
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    }
`;

const Label = styled.div`
    font-size: 0.9rem;
    margin-left: 0.5rem;

    span {
        position: relative;
        border: none;
    }
`;

interface CheckboxProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    name?: string;
    id?: string;
    key?: string;
    round?: boolean;
    color?: 'blue' | 'gray' | 'red';
    disabled?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ round, color, disabled, name, checked, onChange, id, key, children }) => {
    // TODO: formik implementation
    return (
        <CheckboxWrapper round={round} color={color || 'blue'} disabled={disabled}>
            <label>
                <input type="checkbox" name={name} checked={!!checked} onChange={onChange} id={id} key={key} disabled={disabled} />
                <span />
                {children && <Label>{children}</Label>}
            </label>
        </CheckboxWrapper>
    );
};

export default Checkbox;