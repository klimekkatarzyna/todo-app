import React, { FC, useMemo, useRef, RefObject } from 'react';
import { AppColorType } from '../enums';
import useAppColor from '../hooks/useAppColor';
import { useFocusingHandling } from '../hooks/useMouseHandling';
import { getDay, getDayName, getMonth } from '../utils/date';
import { DropdownComponent } from './Dropdown';
import { EditListTitle } from './List/EditListTitle';

interface IToolbar {
	name: string;
	colorType?: AppColorType;
	isDateVisible?: boolean;
	children?: React.ReactNode;
	isListItem?: boolean;
}

export const Toolbar: FC<IToolbar> = ({ name, colorType = 'grey', isDateVisible, children, isListItem }) => {
	const date = new Date();
	const elementRef: RefObject<HTMLInputElement> = useRef(null);
	const { isFocused, onClick, onBlur } = useFocusingHandling(elementRef);
	const { color } = useAppColor(colorType);

	return (
		<div className='flex items-center mb-4'>
			<div
				className={`flex-row items-center flex p-2 overflow-hidden whitespace-nowrap text-xl font-semibold text-ellipsis ${color}`}
				ref={elementRef}
				onClick={onClick}
				onBlur={onBlur}>
				{isFocused && isListItem ? <EditListTitle title={name} className='border-2 border-solid w-[200px]' /> : name}
				{children}
			</div>
			{isListItem && <DropdownComponent />}
			<div className='flex pl-2 text-sm color-fontColor'>{isDateVisible && `${getDayName(date)}, ${getDay(date)} ${getMonth(date)}`}</div>
		</div>
	);
};
