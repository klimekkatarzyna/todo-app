import { useState } from 'react';

export const useModalVisibility = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const onShow = () => setIsVisible(true);

	const onHide = () => setIsVisible(false);

	return {
		isVisible,
		onShow,
		onHide,
	};
};
