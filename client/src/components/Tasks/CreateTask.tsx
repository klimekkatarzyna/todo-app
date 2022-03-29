import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { createTaskAction } from '../../actions/tasks';
import { InputVersion } from '../../enums';
import { IUseParams } from '../../interfaces/app';
import { handleResertInput, removesWhitespaceFromString } from '../../utils/utilsFunctions';
import { Input } from '../Input/Input';

export const CreateTask = () => {
	const query = useQueryClient();
	const history = useHistory();
	const { listId } = useParams<IUseParams>();

	const { mutate: createTaskMutation } = useMutation(createTaskAction, {
		onSuccess: () => {
			query.invalidateQueries('tasksOfCurrentList');
		},
	});

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
				createTaskMutation({
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
