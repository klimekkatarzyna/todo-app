import { FC, useCallback } from 'react';
import { useDropdown } from '../../hooks/useDropdown';
import { IconButton } from './IconButton';
import { Folder, Loader } from 'react-feather';
import { useMutation, useQueryClient } from 'react-query';
import { createGroup } from '../../api/groups';
import { isStringContainsOnlyWhitespace } from '../../utils/utilsFunctions';
import { createEditGroupSchema, IGroup } from '@kkrawczyk/todo-common';
import { QueryKey } from '../../enums';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputType } from '../../interfaces/app';
import { useTranslation } from 'react-i18next';

export const CreateGroup: FC = () => {
	const { t } = useTranslation();
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
			query.setQueryData<IGroup[] | undefined>([QueryKey.groups], groups => [...(groups || []), response.data || {}]);
			toast.success(t('create-group-success'));
		},
	});

	const onSubmit: SubmitHandler<IGroup> = useCallback(
		async data => {
			const title = isStringContainsOnlyWhitespace(data.title) ? t('new-group') : data.title;
			await mutateAsync({ title });
			setValue('title', '');
			toggleDropdown();
		},
		[toggleDropdown, mutateAsync, setValue, t]
	);

	return (
		<div ref={elementeReference}>
			<IconButton onClick={toggleDropdown} />
			{dropdownOpen && (
				<div className='absolute bottom-[3.55rem] left-0 right-0 w-full flex items-center py-0 px-4 bg-input-color'>
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
								placeholder={t('group-placeholder')}
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
