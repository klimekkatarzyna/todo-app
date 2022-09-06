import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modal';
import { ContextMenuOpion, ModalType } from '../enums';

interface IModalType {
	modal: ModalType | ContextMenuOpion;
}

export const useModal = () => {
	const [modalType, setModal] = useRecoilState(modalState);

	const showModal = useCallback(({ modal }: IModalType) => setModal(modal), []);

	const hideModal = useCallback(() => setModal(null), []);

	return {
		modalType,
		setModal,
		showModal,
		hideModal,
	};
};
