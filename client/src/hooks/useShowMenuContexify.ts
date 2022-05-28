import { useCallback } from 'react';
import { useContextMenu } from 'react-contexify';

export const useShowMenuContexify = (menuId: string | undefined) => {
	const { show } = useContextMenu({
		id: menuId,
	});

	const displayMenu = useCallback(e => show(e), []);

	return {
		displayMenu,
	};
};
