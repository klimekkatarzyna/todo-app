import React, { FC, useMemo, useRef, RefObject } from 'react';
import { AppColorType } from '../enums';
import { useFocusingHandling } from '../hooks/useMouseHandling';
import { getDay, getDayName, getMonth } from '../utils/date';
import { EditListTitle } from './List/EditListTitle';

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
	const elementRef: RefObject<HTMLInputElement> = useRef(null);
	const { isFocused, onClick, onBlur } = useFocusingHandling(elementRef);

	return (
		<div
			className={` flex-row mb-4 items-center flex p-2 overflow-hidden whitespace-nowrap text-xl font-semibold text-ellipsis ${color}`}
			ref={elementRef}
			onClick={onClick}
			onBlur={onBlur}>
			{isFocused ? <EditListTitle title={name} className='border-2 border-solid' /> : name}
			<div className='flex pl-2 text-sm color-fontColor'>{isDateVisible && `${getDayName(date)}, ${getDay(date)} ${getMonth(date)}`}</div>
			{children}
		</div>
	);
};
