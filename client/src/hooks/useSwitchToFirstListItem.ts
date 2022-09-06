import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { listsState } from '../atoms';
import { ROUTE } from '../enums';
import { buildUrl } from '../utils/paths';

export const useSwitchToFirstListItem = (listId?: string | undefined) => {
	const navigate = useNavigate();
	const list = useRecoilValue(listsState);
	const urlToMyDay = buildUrl(ROUTE.myDay);
	const urlToFirstList = buildUrl(ROUTE.listsDetails, { listId: listId || list?.[0]?._id || '' });
	const minListLength = 1;

	const onHandleSwitchToFirstListItem = useCallback(() => {
		navigate(list?.length === minListLength ? urlToMyDay : urlToFirstList);
	}, [navigate, list]);

	return {
		onHandleSwitchToFirstListItem,
	};
};
