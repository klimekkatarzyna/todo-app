import { FC, useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createEditTaskSchema, IList } from '@kkrawczyk/todo-common';
import { isStringContainsOnlyWhitespace } from '../../utils/utilsFunctions';
import { QueryKey } from '../../enums';
import toast from 'react-hot-toast';
import { editListAction } from '../../actions/lists';
import { useParams } from 'react-router-dom';
import { InputType, IUseParams } from '../../interfaces/app';
import { useRecoilState } from 'recoil';
import { formToEditListTitleVisibilityState } from '../../atoms';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from 'react-feather';

export const EditListTitle: FC<{ title: string; className: string }> = ({ title }) => {
	const query = useQueryClient();
	const { listId } = useParams<IUseParams>();
	const [, setIsFormVisible] = useRecoilState(formToEditListTitleVisibilityState);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
	} = useForm<IList>({
		resolver: yupResolver(createEditTaskSchema),
	});

	useEffect(() => {
		setFocus('title');
	}, [setFocus]);

	const { mutateAsync, isLoading } = useMutation(editListAction, {
		onSuccess: async response => {
			query.setQueryData<IList | undefined>([QueryKey.getListById, response.body?._id], list =>
				list?._id === response.body?._id ? { ...list, title: response.body?.title } : list
			);
			query.setQueryData<IList[] | undefined>(QueryKey.lists, lists =>
				lists?.map(list => (list._id === response.body?._id ? { ...list, title: response.body?.title } : list))
			);
			toast.success('Nazwa listy zmieniona');
		},
	});

	const onSubmit: SubmitHandler<IList> = useCallback(
		async data => {
			if (isStringContainsOnlyWhitespace(data.title)) return;
			await mutateAsync({ _id: listId, title: data.title });
			setIsFormVisible(false);
		},
		[listId, setIsFormVisible]
	);

	return (
		<div className='relative'>
			<div className='flex items-center rounded py-0 cursor-pointer w-full relative'>
				<form className='w-full mt-2 flex' onSubmit={handleSubmit(onSubmit)}>
					{isLoading && <Loader />}
					<div className='relative flex flex-col w-full'>
						<input
							autoFocus
							className='input-styles'
							type={InputType.text}
							defaultValue={title}
							{...register('title', { required: true })}
						/>
						{errors.title && <div className='input-error-styles'>{errors.title?.message}</div>}
					</div>
				</form>
			</div>
		</div>
	);
};
