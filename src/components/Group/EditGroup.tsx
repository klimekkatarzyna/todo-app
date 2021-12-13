import React, { FC, useCallback, useState } from 'react';
import { useDropdown } from '../../hooks/useDropdown';
import { handleResertInput, removesWhitespaceFromString } from '../../utils/utilsFunctions';
import { Input } from '../Input/Input';
import { useGroup } from './useGroup';

interface IEditGroupProps {
	title: string;
	groupId: string;
}

export const EditGroup: FC<IEditGroupProps> = ({ title, groupId }) => {
	const { elementeReference, toggleDropdown, dropdownOpen } = useDropdown();
	const { editGroupMutate } = useGroup();

	const [groupName, setGroupName] = useState<string>(title);

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const clearStr = removesWhitespaceFromString(event.target?.value);
		setGroupName(clearStr);
	}, []);

	const onSubmit = useCallback(
		async (event: React.SyntheticEvent): Promise<void> => {
			event.preventDefault();
			try {
				await editGroupMutate({ groupId, title: groupName });
				handleResertInput(setGroupName);
			} catch {
				//TODO: handle error & show notificayion
			}
		},
		[groupName]
	);

	return (
		<div ref={elementeReference}>
			{dropdownOpen && (
				<form onSubmit={onSubmit}>
					<Input name='groupName' value={groupName} onChange={handleChange} />
				</form>
			)}
			<p onClick={toggleDropdown}>{title}</p>
		</div>
	);
};
