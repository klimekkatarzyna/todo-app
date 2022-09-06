import { FC, useCallback, useEffect } from 'react';
import { useMutation } from 'react-query';
import { editTaskAction } from '../../actions/tasks';
import { ITask, createEditTaskSchema } from '@kkrawczyk/todo-common';
import { isStringContainsOnlyWhitespace } from '../../utils/utilsFunctions';
import toast from 'react-hot-toast';
import { InputType } from '../../interfaces/app';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from 'react-feather';

export const EditTaskName: FC<{ taskData: ITask | undefined }> = ({ taskData }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
	} = useForm<ITask>({
		resolver: yupResolver(createEditTaskSchema),
	});

	const { mutateAsync, isLoading } = useMutation(editTaskAction, {
		onSuccess: () => {
			toast.success('Zadanie zmienione');
		},
	});

	useEffect(() => {
		setFocus('title');
	}, [setFocus]);

	const onSubmit: SubmitHandler<ITask> = useCallback(
		async data => {
			if (isStringContainsOnlyWhitespace(data.title)) return;
			await mutateAsync({ _id: taskData?._id, title: data.title, parentFolderId: taskData?.parentFolderId });
		},
		[isStringContainsOnlyWhitespace, taskData]
	);

	return (
		<div className='relative'>
			<div className='flex items-center rounded py-0 cursor-pointer w-full relative'>
				<form className='w-full mt-2 flex' onSubmit={handleSubmit(onSubmit)}>
					{isLoading && <Loader />}
					<div className='relative flex flex-col w-full'>
						<input
							autoFocus
							className='input-styles task-title'
							type={InputType.text}
							defaultValue={taskData?.title}
							{...register('title', { required: true })}
						/>
						{errors.title && <div className='input-error-styles'>{errors.title?.message}</div>}
					</div>
				</form>
			</div>
		</div>
	);
};
