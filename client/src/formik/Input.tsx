import { FC, useMemo } from 'react';
import { Field } from 'formik';
import { InputVersion } from '../enums';
import { Plus, Circle, Loader } from 'react-feather';
import { useFocusingHandling } from '../hooks/useMouseHandling';
import { InputType } from '../interfaces/app';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { InputEye } from '../components/InputEye/InputEye';

interface IInput<T = string | number | undefined> {
	name: string;
	placeholder?: string;
	isIcon?: boolean;
	colorType?: InputVersion;
	type?: InputType;
	isTaskInput?: boolean;
	readOnly?: boolean;
	isLoading?: boolean;
	className?: string;
}

export const Input: FC<IInput> = ({
	name,
	isIcon = false,
	placeholder = '',
	colorType = InputVersion.primary,
	type = InputType.text,
	isTaskInput,
	readOnly,
	isLoading,
	className,
	...rest
}) => {
	const { onFocus, onBlur, isFocused } = useFocusingHandling();
	const iconColor: string = useMemo(() => (colorType === InputVersion.primary && !isFocused ? 'text-blue' : 'text-fontColor'), [type, isFocused]);
	const { showPassword, handledSetPassword } = useTogglePasswordVisibility();

	return (
		<div className='flex items-center rounded px-3 py-0 cursor-pointer w-full relative'>
			{isIcon && (
				<button type='submit' className='bg-inherit border-none'>
					<div>{isFocused ? <Circle className={`icon-style ${iconColor}`} /> : <Plus className={`icon-style ${iconColor}`} />}</div>
					{isLoading && <Loader />}
				</button>
			)}
			<Field
				className={`${className} w-full border-none outline-none text-sm ${colorType === InputVersion.primary ? `bg-inherit` : 'bg-grey'} ${
					colorType === InputVersion.primary ? 'text-blue' : 'text-white'
				}`}
				name={name}
				type={!showPassword && type === InputType.password ? InputType.password : type}
				readOnly={readOnly}
				placeholder={placeholder}
				autoFocus
				onFocus={onFocus}
				onBlur={onBlur}
			/>
			{type === InputType.password && <InputEye showPassword={showPassword} handledSetPassword={handledSetPassword} />}
		</div>
	);
};
