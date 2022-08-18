import { FC, memo } from 'react';
import { MenuListItem } from '../MenuListItem/MenuListItem';
import { AppColor, IList } from '@kkrawczyk/todo-common';
import { ROUTE } from '../../enums';

const constantMenuList = [
	{
		title: 'Mój dzień',
		url: ROUTE.myDay,
		isMainList: true,
		themeColor: AppColor.dark,
	},
	{
		title: 'Ważne',
		url: ROUTE.important,
		isMainList: true,
		themeColor: AppColor.dark,
	},
	{
		title: 'Zaplanowane',
		url: ROUTE.planned,
		isMainList: true,
		themeColor: AppColor.blue,
	},
	{
		title: 'Przydzielone dla Ciebie',
		url: ROUTE.assigned,
		isMainList: true,
		themeColor: AppColor.dark,
	},
	{
		title: 'Zadania',
		url: ROUTE.inbox,
		isMainList: true,
		themeColor: AppColor.red,
	},
];

const MainListComponent: FC<{ isNavClosed: boolean }> = ({ isNavClosed }) => {
	return (
		<div className='flex flex-col mb-8'>
			{constantMenuList?.map((listItem: IList, index) => (
				<MenuListItem key={index} listItem={listItem} isNavClosed={isNavClosed} isMainMenu />
			))}
		</div>
	);
};

export const MainList = memo(MainListComponent);
