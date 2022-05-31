import { IList } from '@kkrawczyk/todo-common';
import { FC } from 'react';
import { Loader } from 'react-feather';
import { useQuery } from 'react-query';
import { getListByIdAction } from '../../actions/lists';
import { QueryKey } from '../../enums';
import { MenuListItem } from '../MenuListItem/MenuListItem';

interface IGroupedListProps {
	listId: string;
}

export const GroupedList: FC<IGroupedListProps> = ({ listId }) => {
	const { data, isLoading } = useQuery<IList | undefined>([QueryKey.getListById, listId], () => getListByIdAction({ _id: listId }), {
		enabled: !!listId,
	});

	return (
		<>
			{isLoading && <Loader className='icon-style m-auto' />}
			<MenuListItem key={listId} listItem={data} />
		</>
	);
};
