import { useCallback, useEffect, useState, RefObject } from 'react';

export const useFocusingHandling = (ref?: RefObject<HTMLInputElement>) => {
	const [isFocused, setFocused] = useState<boolean>(false);

	// useEffect(() => {
	// 	const handleClick = (event: MouseEvent) => {
	// 		const dropdown = ref?.current;
	// 		if (!dropdown?.contains(event.target as Node)) {
	// 			setFocused(false);
	// 		}
	// 	};

	// 	document.addEventListener('click', handleClick);
	// 	return () => document.removeEventListener('click', handleClick);
	// }, []);

	const onFocus = useCallback((): void => {
		setFocused(true);
	}, []);

	const onClick = useCallback((): void => {
		setFocused(true);
	}, []);

	const onBlur = useCallback((): void => {
		setFocused(false);
	}, []);

	return {
		isFocused,
		onFocus,
		onBlur,
		onClick,
	};
};
