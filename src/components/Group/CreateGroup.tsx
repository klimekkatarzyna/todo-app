import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDropdown } from '../../hooks/useDropdown';
import { handleResertInput, removesWhitespaceFromString } from '../../utils/utilsFunctions';
import { Input } from '../Input/Input';
import { IconButton } from './IconButton';
import { useGroup } from './useGroup';
import { Folder } from '@styled-icons/feather/Folder';
import { IconWrapper } from '../../constants';

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

export const CreateGroup = () => {
	const { elementeReference, toggleDropdown, dropdownOpen } = useDropdown();
	const { mutateCreateGroup } = useGroup();

	const [groupName, setGroupName] = useState<string>('');

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const clearStr = removesWhitespaceFromString(event.target?.value);
		setGroupName(clearStr);
	}, []);

	const onSubmit = useCallback(
		async (event: React.SyntheticEvent): Promise<void> => {
			event.preventDefault();
			try {
				await mutateCreateGroup(groupName);
				handleResertInput(setGroupName);
			} catch {
				//TODO: handle error & show notificayion
			}
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
						<Input name='groupName' placeholder='Grupa bez nazwy' value={groupName} onChange={handleChange} />
					</form>
				</InputWrapper>
			)}
		</div>
	);
};
