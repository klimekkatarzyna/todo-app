import React, { FC, useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { editTaskAction } from '../../actions/tasks';
import { removesWhitespaceFromString } from '../../utils/utilsFunctions';
import { Input } from '../Input/Input';
import { Loader } from '../Loader/Loader';

interface IEditTaskNameProps {
	taskName: string;
	taskId: string;
}

export const EditTaskName: FC<IEditTaskNameProps> = ({ taskName, taskId }) => {
	const query = useQueryClient();
	const [name, setTaskName] = useState<string>(taskName);

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const clearStr = removesWhitespaceFromString(event.target.value);
		setTaskName(clearStr);
	}, []);

	const { mutate, isLoading } = useMutation(editTaskAction, {
		onSuccess: () => {
			query.invalidateQueries('getTask');
			query.invalidateQueries('tasksOfCurrentList');
		},
	});

	const onSubmit = useCallback(
		async (event: React.SyntheticEvent) => {
			event.preventDefault();
			await mutate({ taskName: name, taskId });
		},
		[name, taskId]
	);

	return (
		<div>
			<form onSubmit={onSubmit}>
				<Input name='taskName' value={name} onChange={handleChange} autoFocus />
				{isLoading && <Loader />}
			</form>
		</div>
	);
};
