import React, { FC, useMemo } from 'react';
import { AppColorType } from '../enums';
import { getDay, getDayName, getMonth } from '../utils/date';

interface IToolbar {
	name: string;
	colorType?: AppColorType;
	isDateVisible?: boolean;
	children?: React.ReactNode;
}

export const Toolbar: FC<IToolbar> = ({ name, colorType = 'grey', isDateVisible, children }) => {
	const date = new Date();
	const color = useMemo(
		() =>
			(colorType === 'grey' && 'text-fontColor') ||
			(colorType === 'blue' && 'text-blue') ||
			(colorType === 'red' && 'text-red') ||
			(colorType === 'green' && ' text-green'),
		[colorType]
	);

	return (
		<div className='flex flex-row mb-4 items-center'>
			<div className={`flex p-2 overflow-hidden whitespace-nowrap text-xl font-semibold text-ellipsis ${color}`}>{name}</div>
			<div className='flex pl-2 text-sm color-fontColor'>{isDateVisible && `${getDayName(date)}, ${getDay(date)} ${getMonth(date)}`}</div>
			{children}
		</div>
	);
};
