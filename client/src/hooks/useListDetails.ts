import { IList } from '@kkrawczyk/todo-common';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getListByIdAction } from '../api/lists';
import { QueryKey } from '../enums';
import { IUseParams } from '../interfaces/app';

export const useListDetails = () => {
	const { listId } = useParams<IUseParams>();
	const { data } = useQuery<IList | undefined>([QueryKey.getListById, listId], () => getListByIdAction({ _id: listId }), {
		enabled: !!listId,
	});

	return {
		data,
		members: data?.members,
		parentFolderId: data?._id,
	};
};
