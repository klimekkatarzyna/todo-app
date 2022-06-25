import { useMemo } from 'react';
import { IList } from '@kkrawczyk/todo-common';
import { Sun, Star, Calendar, User, Home } from 'react-feather';
import { SideMenu } from '../enums';

export const useGenerateMenuIcon = (listItem: IList | undefined) => {
	const icon = useMemo(
		() =>
			(listItem?.url === `/${SideMenu.myDay}` && <Sun className='icon-style' />) ||
			(listItem?.url === `/${SideMenu.important}` && <Star className='icon-style' />) ||
			(listItem?.url === `/${SideMenu.planned}` && <Calendar className='icon-style stroke-blue' />) ||
			(listItem?.url === `/${SideMenu.assigned}` && <User className='icon-style stroke-green' />) ||
			(listItem?.url === `/${SideMenu.inbox}` && <Home className='icon-style stroke-red' />),
		[listItem]
	);

	return {
		icon,
	};
};
