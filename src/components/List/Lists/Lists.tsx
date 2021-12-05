import { FC } from 'react';
import styled from 'styled-components';
import { IListItem } from '../../../interfaces/list';
import useList from '../useList';
import { MenuListItem } from '../../MenuListItem/MenuListItem';
import { Loader } from '../../Loader/Loader';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 0.9rem;
`;

interface ILists {
	isNavClosed: boolean;
}

export const Lists: FC<ILists> = ({ isNavClosed }) => {
	const { getListsLoading, getListsQuery } = useList();

	return (
		<Wrapper>
			{getListsLoading && <Loader />}
			{getListsQuery?.body?.lists?.map((item: IListItem) => (
				<MenuListItem listItem={item} isNavClosed={isNavClosed} />
			))}
		</Wrapper>
	);
};
