import { FC, useCallback } from 'react';
import { useDropdown } from '../../hooks/useDropdown';
import { IconButton } from './IconButton';
import { Folder, Loader } from 'react-feather';
import { useMutation, useQueryClient } from 'react-query';
import { createGroup } from '../../actions/groups';
import { isStringContainsOnlyWhitespace } from '../../utils/utilsFunctions';
import { createEditGroupSchema, IGroup } from '@kkrawczyk/todo-common';
import { QueryKey } from '../../enums';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputType } from '../../interfaces/app';

export const CreateGroup: FC = () => {
	const query = useQueryClient();
	const { elementeReference, toggleDropdown, dropdownOpen } = useDropdown();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IGroup>({
		resolver: yupResolver(createEditGroupSchema),
	});

	const { mutateAsync, isLoading } = useMutation(createGroup, {
		onSuccess: async response => {
			query.setQueryData<IGroup[] | undefined>([QueryKey.groups], groups => [...(groups || []), response.body || {}]);
			toast.success('Grupa utworzona');
		},
	});

	const onSubmit: SubmitHandler<IGroup> = useCallback(
		async data => {
			const title = isStringContainsOnlyWhitespace(data.title) ? 'Nowa grupa' : data.title;
			await mutateAsync({ title });
			setValue('title', '');
			toggleDropdown();
		},
		[dropdownOpen, toggleDropdown]
	);

	return (
		<div ref={elementeReference}>
			<IconButton onClick={toggleDropdown} />
			{dropdownOpen && (
				<div className='absolute bottom-11 left-0 right-0 w-full flex items-center py-0 px-4 bg-input-color'>
					<form className='w-full mt-2 flex' onSubmit={handleSubmit(onSubmit)}>
						<button type='submit' className='bg-inherit border-none mr-2'>
							<Folder className='icon-style text-grey' />
							{isLoading && <Loader />}
						</button>

						<div className='w-full border-none outline-none pt-2 pr-0 pb-2 pl-2'>
							<input
								autoFocus
								className='input-styles'
								type={InputType.text}
								placeholder={'Grupa bez nazwy'}
								{...register('title', { required: true })}
							/>
							{errors.title && <div className='input-error-styles'>{errors.title?.message}</div>}
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
