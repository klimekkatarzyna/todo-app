import { atom } from 'recoil';
import { ContextMenuOpion, ModalType } from '../enums';

export const modalState = atom<ModalType | ContextMenuOpion | null>({
	key: 'modalState',
	default: null,
});
