import { FC, useCallback } from 'react';
import { isStringContainsWhitespace } from '../../../utils/utilsFunctions';
import { useMutation, useQueryClient } from 'react-query';
import { createListAction } from '../../../actions/lists';
import { createEditListSchema } from '@kkrawczyk/todo-common';
import { QueryKey } from '../../../enums';
import toast from 'react-hot-toast';
import { TitleForm } from '../../TitleForm';

export const CreateList: FC = () => {
	const query = useQueryClient();

	const { mutateAsync, isLoading, error } = useMutation(createListAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.lists]);
			toast.success('Lista dodana');
		},
	});

	const onSubmit = useCallback(async (values: ICreateListValue, { resetForm }) => {
		const title = isStringContainsWhitespace(values.title) ? 'Lista bez tytułu' : values.title;
		await mutateAsync({ title });
		resetForm();
		//TODO: redirect on created list
	}, []);

	interface ICreateListValue {
		title: string;
	}

	const initialValues: ICreateListValue = { title: '' };

	return (
		<div className='flex flex-col bg-light-grey transition ease-in-out delay-150 width w-full'>
			<TitleForm
				placeholder={'Nowa lista'}
				isIcon
				isLoading={isLoading}
				initialValues={initialValues}
				validationSchema={createEditListSchema}
				onSubmit={onSubmit}
			/>
		</div>
	);
};
