import React, { FC, useCallback, useContext, useState } from 'react';
import { ContextualMenuContext } from '../../ContextualMenuProvider';
import { ContextualMenuOpion } from '../../enums';
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

	const { contextualMenu } = useContext(ContextualMenuContext);

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

	// console.log(contextualMenu?.type === ContextualMenuOpion.edit_group_name && contextualMenu?.elementId === groupId);

	return (
		<div ref={elementeReference}>
			{contextualMenu?.type === ContextualMenuOpion.edit_group_name && contextualMenu?.elementId === groupId ? (
				<form onSubmit={onSubmit}>
					<Input name='groupName' value={groupName} onChange={handleChange} />
				</form>
			) : (
				<p onClick={toggleDropdown}>{title}</p>
			)}
		</div>
	);
};
