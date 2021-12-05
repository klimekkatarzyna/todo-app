import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { InputVersion } from '../../enums';
import { IUseParams } from '../../interfaces/app';
import { handleResertInput, removesWhitespaceFromString } from '../../utils/utilsFunctions';
import { Input } from '../Input/Input';
import { useTask } from './useTask';

export const CreateTask = () => {
	const history = useHistory();
	const { listId } = useParams<IUseParams>();
	const { mutateCreateTask } = useTask();

	useEffect(() => {
		history.listen(() => setTaskName(''));
	}, [history]);

	const [taskName, setTaskName] = useState<string | undefined>(undefined);

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const clearStr = removesWhitespaceFromString(event.target.value);
		setTaskName(clearStr);
	}, []);

	const onSubmit = useCallback(
		async (event: React.SyntheticEvent) => {
			event.preventDefault();
			try {
				mutateCreateTask({
					title: taskName,
					parentFolderId: listId,
					themeColor: 'blue',
				}); // TODO: async await?
				handleResertInput(setTaskName);
			} catch {
				// TODO: handle error
			}
		},
		[taskName, listId]
	);

	return (
		<div>
			<form onSubmit={onSubmit}>
				<Input
					isIcon
					name='taskName'
					colorType={InputVersion.primary}
					isTaskInput
					placeholder={'Dodaj zadanie'}
					value={taskName}
					autoFocus
					onChange={handleChange}
				/>
			</form>
		</div>
	);
};
