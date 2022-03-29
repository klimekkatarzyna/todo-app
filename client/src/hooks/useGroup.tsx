import React, { useCallback, useState } from 'react';
import { removesWhitespaceFromString } from '../utils/utilsFunctions';

export const useGroup = () => {
	const [groupName, setGroupName] = useState<string>('');

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const clearStr = removesWhitespaceFromString(event.target?.value);
		setGroupName(clearStr);
	}, []);

	return {
		groupName,
		handleChange,
		setGroupName,
	};
};
