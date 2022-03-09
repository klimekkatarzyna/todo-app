import React, { FC, useCallback, useContext, useEffect } from 'react';
import { ContextualMenuContext } from '../../ContextualMenuProvider';
import { ContextualMenuOpion } from '../../enums';
import { handleResertInput } from '../../utils/utilsFunctions';
import { Input } from '../Input/Input';
import { useGroup } from '../../hooks/useGroup';

interface IEditGroupProps {
	title: string;
	groupId: string;
}

export const EditGroup: FC<IEditGroupProps> = ({ title, groupId }) => {
	const { editGroupMutate, setIsInputVisible, isInputVisible, groupName, handleChange, setGroupName } = useGroup();
	const { contextualMenu } = useContext(ContextualMenuContext);

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

	useEffect(() => {
		setIsInputVisible(contextualMenu?.type === ContextualMenuOpion.edit_group_name && contextualMenu?.elementId === groupId);
	}, [contextualMenu]);

	return (
		<div>
			{isInputVisible ? (
				<form onSubmit={onSubmit}>
					<Input name='groupName' value={groupName} onChange={handleChange} autoFocus />
				</form>
			) : (
				<p>{title}</p>
			)}
		</div>
	);
};
