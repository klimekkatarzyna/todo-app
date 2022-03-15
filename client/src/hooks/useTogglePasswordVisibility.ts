import React, { useState } from 'react';

export const useTogglePasswordVisibility = () => {
	const [showPassword, setShowPassowrd] = useState<boolean>(false);
	const handledSetPassword = (): void => setShowPassowrd(!showPassword);

	return {
		showPassword,
		handledSetPassword,
	};
};
