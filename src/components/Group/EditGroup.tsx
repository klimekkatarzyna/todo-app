import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { ContextualMenuContext } from '../../ContextualMenuProvider';
import { ContextualMenuOpion } from '../../enums';
import { handleResertInput, removesWhitespaceFromString } from '../../utils/utilsFunctions';
import { Input } from '../Input/Input';
import { useGroup } from './useGroup';

interface IEditGroupProps {
	title: string;
	groupId: string;
}

export const EditGroup: FC<IEditGroupProps> = ({ title, groupId }) => {
	const { editGroupMutate, setIsInputVisible, isInputVisible } = useGroup();
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

	useEffect(() => {
		setIsInputVisible(contextualMenu?.type === ContextualMenuOpion.edit_group_name && contextualMenu?.elementId === groupId);
	}, [contextualMenu]);

	return (
		<div>
			{isInputVisible ? (
				<form onSubmit={onSubmit}>
					<Input name='groupName' value={groupName} onChange={handleChange} />
				</form>
			) : (
				<p>{title}</p>
			)}
		</div>
	);
};
