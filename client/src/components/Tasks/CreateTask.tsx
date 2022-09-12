import { FC, useCallback, useContext } from 'react';
import { useMutation } from 'react-query';
import { createTaskAction } from '../../api/tasks';
import { ITask, createEditTaskSchema, AppColor } from '@kkrawczyk/todo-common';
import { isStringContainsOnlyWhitespace } from '../../utils/utilsFunctions';
import toast from 'react-hot-toast';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { useListDetails } from '../../hooks/useListDetails';
import { Circle, Loader } from 'react-feather';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputType } from '../../interfaces/app';

export const CreateTask: FC<{ listTheme: AppColor | undefined }> = ({ listTheme }) => {
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { members, parentFolderId } = useListDetails();
	const membersArray = [authData?._id].concat(members);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ITask>({
		resolver: yupResolver(createEditTaskSchema),
	});

	const { mutateAsync, isLoading } = useMutation(createTaskAction, {
		onSuccess: () => {
			toast.success('Zadanie dodane');
		},
	});

	const onSubmit: SubmitHandler<ITask> = useCallback(
		async (data, e) => {
			if (isStringContainsOnlyWhitespace(data.title)) return;
			await mutateAsync({
				title: data.title,
				parentFolderId,
				themeColor: listTheme,
				createdBy: authData?._id,
				members: membersArray as string[],
			});
			e?.target.reset();
		},
		[parentFolderId, listTheme, authData, membersArray, mutateAsync]
	);

	return (
		<form className='w-full mt-2 flex' onSubmit={handleSubmit(onSubmit)}>
			<button type='submit' className='bg-inherit border-none mr-2'>
				<Circle className='icon-style' />
				{isLoading && <Loader />}
			</button>

			<div className='relative flex flex-col w-full'>
				<input
					autoFocus
					className='input-styles create-task'
					type={InputType.text}
					placeholder={'Dodaj zadanie'}
					{...register('title', { required: true })}
				/>
				{errors.title && <div className='input-error-styles'>{errors.title?.message}</div>}
			</div>
		</form>
	);
};
