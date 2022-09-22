import { AppColor } from '@kkrawczyk/todo-common';
import React, { FC, useRef, RefObject } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { formToEditListTitleVisibilityState, mobileNavVisibilityState } from '../atoms';
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
	const { onClick, onBlur } = useFocusingHandling(elementRef);
	const isFormVisible = useRecoilValue(formToEditListTitleVisibilityState);
	const shouldFormBeVisible = isFormVisible && isListItem;

	const [, setIsVisible] = useRecoilState(mobileNavVisibilityState);

	return (
		<>
			<div className='mt-2 block md:hidden'>
				<button className='text-base font-semibold mb-4' onClick={() => setIsVisible(true)}>
					{'< Listy'}
				</button>
			</div>
			<div className='flex items-center mt-4 mb-4'>
				<div
					className={`flex-row items-center flex p-2 overflow-hidden whitespace-nowrap text-2xl font-semibold text-ellipsis text-${colorType} md:text-xl`}
					ref={elementRef}
					onClick={onClick}
					onBlur={onBlur}>
					{shouldFormBeVisible ? <EditListTitle title={name} className='border-2 border-solid w-[200px]' /> : name}
					{children}
				</div>
				{isListItem && <ListSettings />}
				<div className='flex pl-2 text-sm color-fontColor'>{isDateVisible && `${getDayName(date)}, ${getDay(date)} ${getMonth(date)}`}</div>
			</div>
		</>
	);
};
