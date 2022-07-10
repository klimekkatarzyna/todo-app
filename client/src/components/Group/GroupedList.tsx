import { IList } from '@kkrawczyk/todo-common';
import { FC } from 'react';
import { Loader } from 'react-feather';
import { useQuery } from 'react-query';
import { getListByIdAction } from '../../actions/lists';
import { QueryKey } from '../../enums';
import { MenuListItem } from '../MenuListItem/MenuListItem';

export const GroupedList: FC<{ listId: string }> = ({ listId }) => {
	const { data, isLoading } = useQuery<IList | undefined>([QueryKey.getListById, listId], () => getListByIdAction({ _id: listId }), {
		enabled: !!listId,
	});

	return (
		<>
			{isLoading && <Loader className='animate-spin icon-style m-auto' />}
			<MenuListItem key={listId} listItem={data} />
		</>
	);
};
