import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useDropdown } from '../../hooks/useDropdown';
import { handleResertInput } from '../../utils/utilsFunctions';
import { Input } from '../Input/Input';
import { IconButton } from './IconButton';
import { useGroup } from '../../hooks/useGroup';
import { Folder } from '@styled-icons/feather/Folder';
import { IconWrapper } from '../../constants';
import { useMutation, useQueryClient } from 'react-query';
import { createGroup } from '../../actions/groups';

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
	const { groupName, handleChange, setGroupName } = useGroup();

	const { mutate, error, isLoading } = useMutation(createGroup, {
		onSuccess: () => {
			query.invalidateQueries(['groups']);
		},
	});

	const onSubmit = useCallback(
		async (event: React.SyntheticEvent): Promise<void> => {
			event.preventDefault();

			await mutate(groupName);
			handleResertInput(setGroupName);
			toggleDropdown();
		},
		[groupName]
	);

	return (
		<div ref={elementeReference}>
			<IconButton onClick={toggleDropdown} />
			{dropdownOpen && (
				<InputWrapper>
					<IconWrapper color='grey'>
						<Folder />
					</IconWrapper>
					<form onSubmit={onSubmit}>
						<Input name='groupName' placeholder='Grupa bez nazwy' value={groupName} onChange={handleChange} autoFocus />
					</form>
				</InputWrapper>
			)}
		</div>
	);
};
