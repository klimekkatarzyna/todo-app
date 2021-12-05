import { useCallback } from 'react';
import { http } from '../../utils/http';
import * as api from '../../services';
import { useQuery } from 'react-query';
import { IMainListResponse } from '../../interfaces/list';

export const useMainList = () => {
	const getMainList = useCallback(async () => {
		const response = await http<IMainListResponse>(api.getMainList, 'GET');
		return response;
	}, []);

	const { data: mainList, isLoading: mainListLoading } = useQuery('getMainList', getMainList);

	return {
		getMainList,
		mainList,
		mainListLoading,
	};
};
