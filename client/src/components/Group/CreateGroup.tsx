import { FC, useCallback } from 'react';
import { useDropdown } from '../../hooks/useDropdown';
import { IconButton } from './IconButton';
import { Folder } from 'react-feather';
import { useMutation, useQueryClient } from 'react-query';
import { createGroup } from '../../actions/groups';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import { createEditGroupSchema, CreateEditGroupType, IGroup } from '@kkrawczyk/todo-common';
import { QueryKey } from '../../enums';
import toast from 'react-hot-toast';
import { TitleForm } from '../TitleForm';

export const CreateGroup: FC = () => {
	const query = useQueryClient();
	const { elementeReference, toggleDropdown, dropdownOpen } = useDropdown();

	const initialValues: IGroup = { title: '' };

	const { mutate, error, isLoading } = useMutation(createGroup, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.groups]);
			toast.success('Grupa utworzona');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	const onSubmit = useCallback(async (values: CreateEditGroupType, { resetForm }) => {
		if (isStringContainsWhitespace(values.title)) return;
		await mutate({ title: values.title });
		resetForm();
		toggleDropdown();
	}, []);

	return (
		<div ref={elementeReference}>
			<IconButton onClick={toggleDropdown} />
			{dropdownOpen && (
				<div className='absolute bottom-11 left-0 right-0 w-full flex items-center py-0 px-4 bg-input-color'>
					<div>
						<Folder className='icon-style text-grey' />
					</div>
					<TitleForm
						className='w-full border-none outline-none pt-2 pr-0 pb-2 pl-2'
						isLoading={isLoading}
						placeholder={'Grupa bez nazwy'}
						initialValues={initialValues as CreateEditGroupType}
						validationSchema={createEditGroupSchema}
						isIcon
						onSubmit={onSubmit}
					/>
				</div>
			)}
		</div>
	);
};
