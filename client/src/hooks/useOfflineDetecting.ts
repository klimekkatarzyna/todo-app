import { useCallback, useEffect, useState } from 'react';

export const useOfflineDetecting = () => {
	const [onLineStatus, setOnLineStatus] = useState<boolean>(true);

	const updateStatus = useCallback(event => {
		setOnLineStatus(navigator.onLine);
	}, []);

	useEffect(() => {
		window.addEventListener('online', updateStatus);

		return () => window.removeEventListener('online', updateStatus);
	}, [updateStatus]);

	useEffect(() => {
		window.addEventListener('offline', updateStatus);

		return () => window.removeEventListener('offline', updateStatus);
	}, [updateStatus]);

	return {
		onLineStatus,
	};
};
