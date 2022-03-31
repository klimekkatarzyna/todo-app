import { ITask } from '@kkrawczyk/todo-common';
import { atom } from 'recoil';

export const inCompletedTasksListState = atom<ITask[]>({
	key: 'inCompletedTaskslist',
	default: [],
});

export const completedTasksListState = atom<ITask[]>({
	key: 'completedTasksList',
	default: [],
});
