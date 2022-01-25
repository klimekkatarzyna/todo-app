import { useCallback } from 'react';
import { http, HttpResponse } from '../../utils/http';
import * as api from '../../services';
import { useQuery } from 'react-query';
import { IMainListResponse } from '../../interfaces/list';

export const useMainList = () => {
	const getMainListAction = useCallback(async () => await http<IMainListResponse>(api.getMainList, 'GET'), []);
	const { data: mainList, isLoading: mainListLoading } = useQuery<HttpResponse<IMainListResponse>>('getMainList', getMainListAction);

	return {
		mainList,
		mainListLoading,
	};
};
