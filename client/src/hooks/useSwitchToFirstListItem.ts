import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { listsState } from '../atoms';
import { ROUTE } from '../enums';
import { buildUrl } from '../utils/paths';

export const useSwitchToFirstListItem = (listId?: string | undefined) => {
	const history = useHistory();
	const list = useRecoilValue(listsState);

	const onHandleSwitchToFirstListItem = useCallback(() => {
		history.push(buildUrl(ROUTE.listsDetails, { listId: listId || list?.[0]._id || '' }));
	}, [history, list]);

	return {
		onHandleSwitchToFirstListItem,
	};
};
