import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { createTaskAction } from '../../actions/tasks';
import { IUseParams } from '../../interfaces/app';
import { Input } from '../../formik/Input';
import { Formik, Form } from 'formik';
import { ITask, createEditTaskSchema, CreateEditTaskType, AppColorTypeEnum } from '@kkrawczyk/todo-common';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import { ErrorMessageComponent } from '../../formik/ErrorMessageComponent';

export const CreateTask = () => {
	const query = useQueryClient();
	const { listId } = useParams<IUseParams>();

	const { mutate, isLoading } = useMutation(createTaskAction, {
		onSuccess: () => {
			query.invalidateQueries('tasksOfCurrentList');
		},
	});

	const initialValues: ITask = { title: '' };

	const onSubmit = useCallback(
		async (values: CreateEditTaskType, { resetForm }) => {
			if (isStringContainsWhitespace(values.title)) return;
			await mutate({
				title: values.title,
				parentFolderId: listId,
				themeColor: AppColorTypeEnum.blue,
			});
			resetForm();
		},
		[listId]
	);

	return (
		<div className='relative'>
			<Formik initialValues={initialValues as CreateEditTaskType} validationSchema={createEditTaskSchema} onSubmit={onSubmit}>
				{({ errors, touched, ...props }) => (
					<Form>
						<Input name='title' placeholder={'Dodaj zadanie'} isIcon {...props} isLoading={isLoading} />
						{errors.title && touched.title ? <ErrorMessageComponent name='title' /> : null}
					</Form>
				)}
			</Formik>
		</div>
	);
};
