import { IGroup } from '@kkrawczyk/todo-common';
import { atom } from 'recoil';

export const groupState = atom<IGroup | undefined>({
	key: 'groupData',
	default: undefined,
});
