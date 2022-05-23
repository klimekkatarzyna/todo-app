import { atom } from 'recoil';

export const elementVisibilityState = atom<boolean>({
	key: 'elementVisibility',
	default: false,
});
