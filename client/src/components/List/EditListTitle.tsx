import { FC, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { CreateEditListType, createEditTaskSchema, IList } from '@kkrawczyk/todo-common';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import { QueryKey } from '../../enums';
import toast from 'react-hot-toast';
import { editListAction } from '../../actions/lists';
import { TitleForm } from '../TitleForm';
import { useParams } from 'react-router-dom';
import { IUseParams } from '../../interfaces/app';
import { HttpResponse } from '../../utils/http';
import { useRecoilState } from 'recoil';
import { formToEditListTitleVisibilityState } from '../../atoms';

export const EditListTitle: FC<{ title: string; className: string }> = ({ title }) => {
	const query = useQueryClient();
	const { listId } = useParams<IUseParams>();
	const [, setIsFormVisible] = useRecoilState(formToEditListTitleVisibilityState);

	const updateListTitle = useCallback(
		(lists: IList[] | undefined, response: HttpResponse<IList>) =>
			lists?.map(list => (list._id === response.body?._id ? { ...list, title: response.body?.title } : list)),
		[]
	);

	const { mutateAsync, isLoading } = useMutation(editListAction, {
		onSuccess: async response => {
			query.setQueryData<IList | undefined>([QueryKey.getListById, response.body?._id], list =>
				list?._id === response.body?._id ? { ...list, title: response.body?.title } : list
			);
			query.setQueryData<IList[] | undefined>(QueryKey.lists, lists => updateListTitle(lists, response));
			query.setQueryData<IList[] | undefined>(QueryKey.getImportanceTasks, lists => updateListTitle(lists, response));
			query.setQueryData<IList[] | undefined>(QueryKey.getMyDayTasks, lists => updateListTitle(lists, response));
			toast.success('Nazwa listy zmieniona');
		},
	});

	const initialValues: IList = { title: title };

	const onSubmit = useCallback(
		async (values: CreateEditListType, { resetForm }) => {
			if (isStringContainsWhitespace(values.title)) return;
			await mutateAsync({ _id: listId, title: values.title });
			resetForm();
			setIsFormVisible(false);
		},
		[listId, setIsFormVisible]
	);

	return <TitleForm isLoading={isLoading} initialValues={initialValues} validationSchema={createEditTaskSchema} onSubmit={onSubmit} />;
};
