import { atom } from 'recoil';

export const modalVisibilityState = atom<boolean>({
	key: 'modalVisibility',
	default: false,
});
