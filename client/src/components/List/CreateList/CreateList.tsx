import { FC, useCallback } from 'react';
import { isStringContainsWhitespace } from '../../../utils/utilsFunctions';
import { useMutation, useQueryClient } from 'react-query';
import { createListAction } from '../../../actions/lists';
import { Formik, Form } from 'formik';
import { createEditListSchema } from '@kkrawczyk/todo-common';
import { Input } from '../../../formik/Input';
import { ErrorMessageComponent } from '../../../formik/ErrorMessageComponent';

export const CreateList: FC = () => {
	const query = useQueryClient();

	const { mutate, isLoading, error } = useMutation(createListAction, {
		onSuccess: () => {
			query.invalidateQueries(['lists']);
		},
	});

	const onSubmit = useCallback(async (values: ICreateListValue, { resetForm }) => {
		const title = !isStringContainsWhitespace(values.title) ? values.title : 'Lista bez tytułu';
		await mutate({ title });
		resetForm();
		//TODO: redirect on created list
	}, []);

	interface ICreateListValue {
		title: string;
	}

	const initialValues: ICreateListValue = { title: '' };

	return (
		<div className='flex flex-col bg-light-grey transition ease-in-out delay-150 width w-52'>
			<Formik initialValues={initialValues} validationSchema={createEditListSchema} onSubmit={onSubmit}>
				{({ errors, touched, ...props }) => (
					<Form>
						<Input name='title' placeholder={'Nowa lista'} isIcon {...props} isLoading={isLoading} />
						{errors.title && touched.title && <ErrorMessageComponent name='title' />}
					</Form>
				)}
			</Formik>
		</div>
	);
};
