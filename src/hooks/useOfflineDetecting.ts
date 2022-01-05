import React, { useCallback, useEffect, useState } from 'react';

export const useOfflineDetecting = () => {
	const [onLineStatus, setOnLineStatus] = useState<boolean>(true);

	useEffect(() => {
		window.addEventListener('online', updateStatus);

		return () => window.removeEventListener('online', updateStatus);
	}, []);

	useEffect(() => {
		window.addEventListener('offline', updateStatus);

		return () => window.removeEventListener('offline', updateStatus);
	}, []);

	const updateStatus = useCallback(event => {
		setOnLineStatus(navigator.onLine);
	}, []);

	console.log({ navigator });

	return {
		onLineStatus,
	};
};
