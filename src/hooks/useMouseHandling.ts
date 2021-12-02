import { useCallback, useState } from 'react';

const useFocusingHandling = () => {
	const [isFocused, setFocused] = useState<boolean>(false);

	const onFocus = useCallback((): void => {
		setFocused(true);
	}, []);

	const onBlur = useCallback((): void => {
		setFocused(false);
	}, []);

	return {
		isFocused,
		onFocus,
		onBlur,
	};
};

export default useFocusingHandling;
