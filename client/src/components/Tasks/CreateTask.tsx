import { FC, useCallback, useContext } from 'react';
import { useMutation } from 'react-query';
import { createTaskAction } from '../../actions/tasks';
import { ITask, createEditTaskSchema, CreateEditTaskType, AppColor } from '@kkrawczyk/todo-common';
import { isStringContainsOnlyWhitespace } from '../../utils/utilsFunctions';
import toast from 'react-hot-toast';
import { TitleForm } from '../TitleForm';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { useListDetails } from '../../hooks/useListDetails';

export const CreateTask: FC<{ listTheme: AppColor | undefined }> = ({ listTheme }) => {
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { members, parentFolderId } = useListDetails();
	const membersArray = [authData?._id].concat(members);

	const { mutateAsync, isLoading } = useMutation(createTaskAction, {
		onSuccess: () => {
			toast.success('Zadanie dodane');
		},
	});

	const initialValues: ITask = { title: '' };

	const onSubmit = useCallback(
		async (values: CreateEditTaskType, { resetForm }) => {
			if (isStringContainsOnlyWhitespace(values.title)) return;
			await mutateAsync({
				title: values.title,
				parentFolderId,
				themeColor: listTheme,
				createdBy: authData?._id,
				members: membersArray as string[],
			});
			resetForm();
		},
		[isStringContainsOnlyWhitespace, parentFolderId, listTheme, authData, membersArray]
	);

	return (
		<TitleForm
			isLoading={isLoading}
			placeholder={'Dodaj zadanie'}
			initialValues={initialValues as CreateEditTaskType}
			validationSchema={createEditTaskSchema}
			onSubmit={onSubmit}
			isIcon
		/>
	);
};
