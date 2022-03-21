import { FC, useCallback, memo } from 'react';
import styled from 'styled-components';
import { MenuListItem } from '../MenuListItem/MenuListItem';
import { IMainListResponse } from '../../interfaces/list';
import { Loader } from '../Loader/Loader';
import { http, HttpResponse } from '../../utils/http';
import * as api from '../../services';
import { useQuery } from 'react-query';
import { IList } from '@kkrawczyk/common/src/types';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;
`;

interface IMainList {
	isNavClosed: boolean;
}

const MainListComponent: FC<IMainList> = ({ isNavClosed }) => {
	// TODO: endpomt to update tasksNumber
	const getMainListAction = useCallback(async () => await http<IMainListResponse>(api.getMainList, 'GET'), []);
	const { data: mainList, isLoading: mainListLoading } = useQuery<HttpResponse<IMainListResponse>>('getMainList', getMainListAction);

	return (
		<Wrapper>
			{mainListLoading ? (
				<Loader />
			) : (
				mainList?.body?.mainLists?.map((listItem: IList) => (
					<MenuListItem key={listItem?._id} listItem={listItem} isNavClosed={isNavClosed} />
				))
			)}
		</Wrapper>
	);
};

export const MainList = memo(MainListComponent);
