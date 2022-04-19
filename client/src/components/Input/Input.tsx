import React, { FC, RefObject, useMemo } from 'react';
import { InputVersion } from '../../enums';
import { Plus, Circle } from 'react-feather';
import { useFocusingHandling } from '../../hooks/useMouseHandling';

type InputType = 'text' | 'password';

interface IInput<T = string | number | undefined> {
	name: string;
	value: T;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	isIcon?: boolean;
	colorType?: InputVersion;
	type?: InputType;
	autoFocus?: boolean;
	isTaskInput?: boolean;
	readOnly?: boolean;
	inputRef?: RefObject<HTMLInputElement>;
}

export const Input: FC<IInput> = ({
	name,
	value,
	isIcon = false,
	placeholder = '',
	colorType = InputVersion.primary,
	type = 'test',
	onChange,
	autoFocus,
	isTaskInput,
	readOnly,
	inputRef,
}) => {
	const { onFocus, onBlur, isFocused } = useFocusingHandling();
	const iconColor: string = useMemo(() => (colorType === InputVersion.primary && !isFocused ? 'text-blue' : 'text-fontColor'), [type, isFocused]);

	return (
		<div className='flex items-center rounded px-3 py-0 cursor-pointer w-full'>
			{isIcon && (
				<button type='submit' className='bg-inherit border-none'>
					<div>{isFocused ? <Circle className={`icon-style ${iconColor}`} /> : <Plus className={`icon-style ${iconColor}`} />}</div>
				</button>
			)}
			<input
				className={`w-full border-none outline-none text-sm ${colorType === InputVersion.primary ? `bg-inherit` : 'bg-grey'} ${
					colorType === InputVersion.primary ? 'text-blue' : 'text-white'
				}`}
				name={name}
				value={value}
				type={type}
				readOnly={readOnly}
				placeholder={placeholder}
				autoFocus={autoFocus || false}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				ref={inputRef}
			/>
		</div>
	);
};
