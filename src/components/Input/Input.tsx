import React, { FC, useCallback, useMemo, useState } from "react";
import styled from 'styled-components';
import { COLOURS, IconWrapper } from "../../constants";
import { InputType } from "../../enums";
import { Plus } from '@styled-icons/feather/Plus';
import { Circle } from '@styled-icons/feather/Circle';

const Wrapper = styled.div<{ type: InputType, inputFocused: boolean }>`
    display: flex;
    align-items: center;
    border-radius: 0.3rem;
    padding: 0 0.7rem;
    background-color: ${props => (props.type === InputType.primary) ? `inherit` : `${COLOURS.white}`};
    cursor: pointer;
    &:hover {
        background-color: ${COLOURS.white};
    }
`;

const InputStyled = styled.input<{ inputFocused: boolean }>`
    padding: 0.8rem;
    border: none;
    color: ${props => props.type === InputType.primary ? `${COLOURS.blue}`: `${COLOURS.white}`};
    outline: none;
    background-color: ${props => props.type === InputType.primary ? `inherit` : `${COLOURS.grey}`};
    ::placeholder {
        color: ${props => (props.type === InputType.primary && !props.inputFocused) ? `${COLOURS.blue}`: `${COLOURS.fontColor}`};
    }
`;

interface IInput {
    isIcon: boolean;
    type: InputType;
    placeholder?: string;
}

export const Input: FC<IInput> = ({ isIcon = true, placeholder = '', type }) => {
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const iconColor: string = useMemo(() => (type === InputType.primary && !inputFocused) ? COLOURS.blue : COLOURS.fontColor, [type, inputFocused]);

    // TODO: formik input
    // TODO: handle mouse click events: left, rigth click
    // TODO: handle enter key
    const onFocus = useCallback(() => {
        setInputFocused(true);
    }, []);

    const onBlur = useCallback(() => {
        setInputFocused(false);
    }, []);

    return (
        <Wrapper type={type} inputFocused={inputFocused}>
            {(isIcon && inputFocused) ? (
                <IconWrapper color={iconColor}><Circle/></IconWrapper>
            ) : (
                <IconWrapper color={iconColor}><Plus /></IconWrapper>
            )}
            <InputStyled
                type={type}
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
                inputFocused={inputFocused} />
        </Wrapper>
    )
}