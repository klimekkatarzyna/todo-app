import { IList } from '@kkrawczyk/todo-common';
import { atom } from 'recoil';

export const listsState = atom<IList[] | undefined>({
	key: 'listsState',
	default: [],
});
