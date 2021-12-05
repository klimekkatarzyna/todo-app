import { useCallback, useState } from 'react';

export const useShowModal = () => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const onOpeneModal = useCallback((): void => {
		setIsModalVisible(true);
	}, []);

	const onCloseModal = useCallback((): void => {
		setIsModalVisible(false);
	}, []);

	return {
		isModalVisible,
		onOpeneModal,
		onCloseModal,
	};
};
