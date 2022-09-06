import React, { FC, useMemo } from 'react';
import { Tooltip } from '../Tooltip/Tooltip';

interface CheckboxProps {
	color: string | undefined;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
	id?: string;
	key?: string;
	disabled?: boolean;
	tooltipText?: string;
	name?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ disabled, color, checked, onChange, id, key, children, tooltipText, name }) => {
	const colorDefinition = useMemo(
		() =>
			(color === 'red' && 'border-red') ||
			(color === 'green' && 'border-green') ||
			(color === 'blue' && 'border-blue') ||
			(color === 'grey' && 'border-grey'),
		[color]
	);

	return (
		<Tooltip position={'left'} text={tooltipText}>
			<label className='relative cursor-pointer flex items-center leading-5'>
				<input
					name={name}
					type='checkbox'
					checked={!!checked}
					onChange={onChange}
					id={id}
					key={key}
					disabled={disabled}
					className={`w-5 h-5 rounded-full text-${color} border-solid border-2 ${colorDefinition}`}
				/>
				{children && <div className='text-sm ml-2'>{children}</div>}
			</label>
		</Tooltip>
	);
};
