import { useCallback } from 'react';
import { useContextMenu } from 'react-contexify';

export const useShowMenuContexify = (menuId: string | undefined, isMainMenu?: boolean) => {
	const { show } = useContextMenu({
		id: menuId,
	});

	const displayMenu = useCallback(
		e => {
			if (isMainMenu) return;
			show(e);
		},
		[isMainMenu, show]
	);

	return {
		displayMenu,
	};
};
