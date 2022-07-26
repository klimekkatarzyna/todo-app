import { IList } from '@kkrawczyk/todo-common';
import { atom } from 'recoil';

export const listsState = atom<IList[] | undefined>({
	key: 'listsState',
	default: [],
});

export const formToEditListTitleVisibilityState = atom<boolean>({
	key: 'formToEditListTitleVisibilityState',
	default: false,
});

export const mobileNavVisibilityState = atom<boolean>({
	key: 'mobileNavVisibility',
	default: true,
});
