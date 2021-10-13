import React, { FC, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from '../constants';
import { InputType } from '../enums';
import { Plus } from '@styled-icons/feather/Plus';
import { Circle } from '@styled-icons/feather/Circle';
import { useField } from 'formik';

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

const InputStyled = styled.input<{ inputFocused: boolean; inputType: InputType }>`
    padding: 0.8rem;
    border: none;
    color: ${props => props.inputType === InputType.primary ? `${COLOURS.blue}`: `${COLOURS.white}`};
    outline: none;
    background-color: ${props => props.inputType === InputType.primary ? `inherit` : `${COLOURS.grey}`};
    ::placeholder {
        color: ${props => (props.inputType === InputType.primary && !props.inputFocused) ? `${COLOURS.blue}`: `${COLOURS.fontColor}`};
    }
`;

interface IInputProps {
    label?: string;
    value: string;
    disabled?: boolean;
    error?: any;
    name?: string;
    required?: boolean;
    type?: 'text' | 'date' | 'color' | 'datetime' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'range' | 'tel' | 'time' | 'url' | 'week';
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    debounceTime?: number;
    onDebouncedChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    autoFocus?: boolean;
    className?: string;
    innerRef?: React.MutableRefObject<HTMLInputElement>;
    inputType: InputType;
    isIcon: boolean;
    iconColor: string;
    inputFocused: boolean;
};

const Input: FC<IInputProps> = (props) => {
    console.log(props);
    return (
        <>
        <Wrapper type={props.inputType} inputFocused={props.inputFocused}>
            {/* <button type='submit'> */}
                {props.isIcon && (
                    <IconWrapper color={props.iconColor}>{props.inputFocused ? <Circle/> : <Plus />}</IconWrapper>
                )}
            {/* </button> */}
            <InputStyled 
                name={'title'}
                value={props.value || ''}
                disabled={props.disabled}
                placeholder={props.placeholder}
                type={props.type || 'text'}
                onChange={props.onChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                onClick={props.onClick}
                autoFocus={props.inputFocused}
                ref={props.innerRef}
                inputFocused={props.inputFocused}
                inputType={props.inputType}
            />
        </Wrapper>
        {/* {props.error && <span>{props.error}</span>} */}
        </>
    )
};

interface IFormikInput {
    name: string;
    inputType: InputType;
    isIcon: boolean
}

const FormikInput: FC<IFormikInput> = (props) => {
    const [field, meta, helpers] = useField<string>(props.name as string);
    const [inputFocused, setInputFocused] = useState<boolean>(false);

    const iconColor: string = useMemo(() => (props.inputType === InputType.primary && !inputFocused) ? COLOURS.blue : COLOURS.fontColor, [props.inputType, inputFocused]);

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        field.onChange(event);
    }, [field.onChange,]);

    const onFocus = useCallback(() => {
        setInputFocused(true);
    }, []);

    const onBlur = useCallback(() => {
        setInputFocused(false);
    }, []);

    console.log('elo', field);

    return (
        <Input 
            {...field} 
            {...props}
            name={props.name}
            value={field.value[0]}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            error={meta.touched && meta.error}
            iconColor={iconColor}
            inputType={props.inputType}
            inputFocused={inputFocused}
        />
    )
};

export default FormikInput;
