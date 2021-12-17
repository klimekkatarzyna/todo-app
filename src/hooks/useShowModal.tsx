import { useCallback, useState } from 'react';

export const useShowModal = () => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const onOpeneModal = useCallback((): void => {
		setIsModalVisible(true);
	}, [isModalVisible]);

	const onCloseModal = useCallback((): void => {
		setIsModalVisible(false);
	}, [isModalVisible]);

	return {
		isModalVisible,
		onOpeneModal,
		onCloseModal,
	};
};
