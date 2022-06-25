import { AppColor } from '@kkrawczyk/todo-common';
import React, { FC, useRef, RefObject } from 'react';
import { useRecoilValue } from 'recoil';
import { formToEditListTitleVisibilityState } from '../atoms';
import { useFocusingHandling } from '../hooks/useMouseHandling';
import { getDay, getDayName, getMonth } from '../utils/date';
import { EditListTitle } from './List/EditListTitle';
import { ListSettings } from './List/ListSettings';

interface IToolbar {
	name: string;
	colorType?: AppColor;
	isDateVisible?: boolean;
	children?: React.ReactNode;
	isListItem?: boolean;
}

export const Toolbar: FC<IToolbar> = ({ name, colorType, isDateVisible, children, isListItem }) => {
	const date = new Date();
	const elementRef: RefObject<HTMLInputElement> = useRef(null);
	const { isFocused, onClick, onBlur } = useFocusingHandling(elementRef);
	const isFormVisible = useRecoilValue(formToEditListTitleVisibilityState);
	const shouldFormBeVisible = (isFocused && isListItem) || (isFormVisible && isListItem);

	return (
		<div className='flex items-center mb-4'>
			<div
				className={`flex-row items-center flex p-2 overflow-hidden whitespace-nowrap text-xl font-semibold text-ellipsis text-${colorType}`}
				ref={elementRef}
				onClick={onClick}
				onBlur={onBlur}>
				{shouldFormBeVisible ? <EditListTitle title={name} className='border-2 border-solid w-[200px]' /> : name}
				{children}
			</div>
			{isListItem && <ListSettings />}
			<div className='flex pl-2 text-sm color-fontColor'>{isDateVisible && `${getDayName(date)}, ${getDay(date)} ${getMonth(date)}`}</div>
		</div>
	);
};
