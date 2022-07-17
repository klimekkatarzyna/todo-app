import { FC, useMemo } from 'react';
import { Field } from 'formik';
import { InputVersion } from '../enums';
import { Plus, Circle, Loader } from 'react-feather';
import { useFocusingHandling } from '../hooks/useMouseHandling';
import { InputType } from '../interfaces/app';

interface IInput {
	name: string;
	placeholder?: string;
	isIcon?: boolean;
	colorType?: InputVersion;
	type?: InputType;
	isTaskInput?: boolean;
	readOnly?: boolean;
	isLoading?: boolean;
	className?: string;
	isSubmitting?: boolean;
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
	isSubmitting,
	...rest
}) => {
	const { onFocus, onBlur, isFocused } = useFocusingHandling();
	const iconColor: string = useMemo(
		() => (colorType === InputVersion.primary && !isFocused ? 'text-blue' : 'text-fontColor'),
		[isFocused, colorType]
	);

	return (
		<div className='flex items-center rounded py-0 cursor-pointer w-full relative'>
			{isIcon && (
				<button type='submit' className='bg-inherit border-none' disabled={isSubmitting}>
					<div>{isFocused ? <Circle className={`icon-style ${iconColor}`} /> : <Plus className={`icon-style ${iconColor}`} />}</div>
					{isLoading && <Loader />}
				</button>
			)}
			<Field
				className={`${className} w-full outline-none text-sm appearance-none rounded relative block border border-border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue focus:border-blue focus:z-10 ${
					colorType === InputVersion.primary ? `bg-white` : 'bg-grey'
				} ${colorType === InputVersion.primary ? 'text-blue' : 'text-white'}`}
				name={name}
				type={type}
				readOnly={readOnly}
				placeholder={placeholder}
				autoFocus
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		</div>
	);
};
