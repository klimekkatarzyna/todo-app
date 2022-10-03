import { FC, memo } from 'react';
import { MenuListItem } from '../MenuListItem/MenuListItem';
import { AppColor, IList } from '@kkrawczyk/todo-common';
import { ROUTE } from '../../enums';
import i18next from '../../i18n';

const constantMenuList = [
	{
		title: i18next.t('my-day'),
		url: ROUTE.myDay,
		isMainList: true,
		themeColor: AppColor.dark,
	},
	{
		title: i18next.t('important-title'),
		url: ROUTE.important,
		isMainList: true,
		themeColor: AppColor.dark,
	},
	{
		title: i18next.t('planned-title'),
		url: ROUTE.planned,
		isMainList: true,
		themeColor: AppColor.blue,
	},
	{
		title: i18next.t('assigned-title'),
		url: ROUTE.assigned,
		isMainList: true,
		themeColor: AppColor.dark,
	},
	{
		title: i18next.t('tasks-title'),
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
