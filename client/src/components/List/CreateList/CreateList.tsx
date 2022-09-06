import { FC, useCallback } from 'react';
import { isStringContainsOnlyWhitespace } from '../../../utils/utilsFunctions';
import { useMutation, useQueryClient } from 'react-query';
import { createListAction } from '../../../actions/lists';
import { createEditListSchema, IList } from '@kkrawczyk/todo-common';
import { QueryKey, ROUTE } from '../../../enums';
import toast from 'react-hot-toast';
import { InputType } from '../../../interfaces/app';
import { Loader, Plus } from 'react-feather';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { buildUrl } from '../../../utils/paths';

export const CreateList: FC = () => {
	const query = useQueryClient();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IList>({
		resolver: yupResolver(createEditListSchema),
	});

	const { mutateAsync, isLoading } = useMutation(createListAction, {
		onSuccess: async response => {
			query.setQueryData<IList[] | undefined>([QueryKey.lists], lists => [...(lists || []), response.body || {}]);
			toast.success('Lista dodana');
			navigate(buildUrl(ROUTE.listsDetails, { listId: response?.body?._id || '' }));
		},
	});

	const onSubmit: SubmitHandler<IList> = useCallback(async (data, e) => {
		const title = isStringContainsOnlyWhitespace(data.title) ? 'Lista bez tytułu' : data.title;
		await mutateAsync({ title });
		e?.target.reset();
	}, []);

	return (
		<div className='flex flex-col bg-light-grey transition ease-in-out delay-150 width w-full'>
			<form className='w-full mt-2 flex' onSubmit={handleSubmit(onSubmit)}>
				<button type='submit' className='bg-inherit border-none mr-2'>
					<Plus className='icon-style' />
					{isLoading && <Loader />}
				</button>

				<div className='relative flex flex-col w-full'>
					<input
						autoFocus
						className='input-styles'
						type={InputType.text}
						placeholder={'Nowa lista'}
						{...register('title', { required: true })}
					/>
					{errors.title && <div className='input-error-styles'>{errors.title?.message}</div>}
				</div>
			</form>
		</div>
	);
};
