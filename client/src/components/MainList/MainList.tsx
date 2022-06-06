import { FC, useCallback, memo } from 'react';
import { MenuListItem } from '../MenuListItem/MenuListItem';
import { Loader } from 'react-feather';
import { http, HttpResponse } from '../../utils/http';
import * as api from '../../services';
import { useQuery } from 'react-query';
import { IList } from '@kkrawczyk/todo-common';
import { QueryKey } from '../../enums';

export interface IMainListResponse {
	mainLists: IList[];
}

interface IMainList {
	isNavClosed: boolean;
}

const MainListComponent: FC<IMainList> = ({ isNavClosed }) => {
	// TODO: endpomt to update tasksNumber
	const getMainListAction = useCallback(async () => await http<IMainListResponse>(api.getMainList, 'GET'), []);
	const { data, isLoading } = useQuery<HttpResponse<IMainListResponse>>(QueryKey.getMainList, getMainListAction);

	return (
		<div className='flex flex-col mb-8'>
			{isLoading ? (
				<Loader className='m-auto' />
			) : (
				data?.body?.mainLists?.map((listItem: IList) => (
					<MenuListItem key={listItem?._id} listItem={listItem} isNavClosed={isNavClosed} isMainMenu />
				))
			)}
		</div>
	);
};

export const MainList = memo(MainListComponent);
