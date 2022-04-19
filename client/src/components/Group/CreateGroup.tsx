import React, { FC, useCallback } from 'react';
import { useDropdown } from '../../hooks/useDropdown';
import { IconButton } from './IconButton';
import { Folder } from 'react-feather';
import { useMutation, useQueryClient } from 'react-query';
import { createGroup } from '../../actions/groups';
import { Input } from '../../formik/Input';
import { Formik, Form } from 'formik';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import { ErrorMessageComponent } from '../../formik/ErrorMessageComponent';
import { createEditGroupSchema, CreateEditGroupType, IGroup } from '@kkrawczyk/todo-common';
import { QueryKey } from '../../enums';

export const CreateGroup: FC = () => {
	const query = useQueryClient();
	const { elementeReference, toggleDropdown, dropdownOpen } = useDropdown();

	const initialValues: IGroup = { title: '' };

	const { mutate, error, isLoading } = useMutation(createGroup, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.groups]);
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
					<div className='relative'>
						<Formik initialValues={initialValues as CreateEditGroupType} validationSchema={createEditGroupSchema} onSubmit={onSubmit}>
							{({ errors, touched, ...props }) => (
								<Form>
									<Input
										name='title'
										placeholder={'Grupa bez nazwy'}
										isIcon
										{...props}
										isLoading={isLoading}
										autoFocus
										className='w-full border-none outline-none pt-2 pr-0 pb-2 pl-2'
									/>
									{errors.title && touched.title ? <ErrorMessageComponent name='title' /> : null}
								</Form>
							)}
						</Formik>
					</div>
				</div>
			)}
		</div>
	);
};
