import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useDropdown } from '../../hooks/useDropdown';
import { IconButton } from './IconButton';
import { Folder } from '@styled-icons/feather/Folder';
import { IconWrapper } from '../../constants';
import { useMutation, useQueryClient } from 'react-query';
import { createGroup } from '../../actions/groups';
import { Input } from '../../formik/Input';
import { Formik, Form } from 'formik';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import { ErrorMessageComponent } from '../../formik/ErrorMessageComponent';
import { createEditGroupSchema, CreateEditGroupType, IGroup } from '@kkrawczyk/todo-common';

const InputWrapper = styled.div`
	position: absolute;
	bottom: 44px;
	left: 0;
	right: 0;
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0 1rem;
	background-color: #fdfdfd;
	> input {
		width: 100%;
		padding: 0.8rem 0 0.8rem 0.8rem;
		border: none;
		outline: none;
	}
`;

export const CreateGroup: FC = () => {
	const query = useQueryClient();
	const { elementeReference, toggleDropdown, dropdownOpen } = useDropdown();

	const initialValues: IGroup = { title: '' };

	const { mutate, error, isLoading } = useMutation(createGroup, {
		onSuccess: () => {
			query.invalidateQueries(['groups']);
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
				<InputWrapper>
					<IconWrapper color='grey'>
						<Folder />
					</IconWrapper>
					<div className='relative'>
						<Formik initialValues={initialValues as CreateEditGroupType} validationSchema={createEditGroupSchema} onSubmit={onSubmit}>
							{({ errors, touched, ...props }) => (
								<Form>
									<Input name='title' placeholder={'Grupa bez nazwy'} isIcon {...props} isLoading={isLoading} autoFocus />
									{errors.title && touched.title ? <ErrorMessageComponent name='title' /> : null}
								</Form>
							)}
						</Formik>
					</div>
				</InputWrapper>
			)}
		</div>
	);
};
