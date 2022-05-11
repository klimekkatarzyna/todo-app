import { ITask } from '@kkrawczyk/todo-common';
import { atom } from 'recoil';

export const searchResultState = atom<ITask[] | undefined>({
	key: 'searchResultData',
	default: [],
});

export const loadingState = atom<boolean>({
	key: 'isLoading',
	default: false,
});
