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

interface IEditListTitleProps {
	title: string;
	className: string;
}

export const EditListTitle: FC<IEditListTitleProps> = ({ title }) => {
	const query = useQueryClient();
	const { listId } = useParams<IUseParams>();

	const { mutateAsync, isLoading } = useMutation(editListAction, {
		onSuccess: () => {
			query.invalidateQueries(QueryKey.getListById);
			query.invalidateQueries(QueryKey.lists);
			query.invalidateQueries(QueryKey.getImportanceTasks);
			query.invalidateQueries(QueryKey.getMyDayTasks);
			toast.success('Nazwa listy zmieniona');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	const initialValues: IList = { title: title };

	const onSubmit = useCallback(
		async (values: CreateEditListType, { resetForm }) => {
			if (isStringContainsWhitespace(values.title)) return;
			await mutateAsync({ _id: listId, title: values.title });
			resetForm();
		},
		[listId]
	);

	return <TitleForm isLoading={isLoading} initialValues={initialValues} validationSchema={createEditTaskSchema} onSubmit={onSubmit} />;
};
