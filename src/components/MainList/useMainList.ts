import React, { useCallback } from 'react';
import { http } from '../../utils/http';
import * as api from '../../services';
import { useQuery } from 'react-query';
import { IMainListResponse } from '../../interfaces';

const useMainList = () => {
    const getMainList = useCallback((): Promise<IMainListResponse> => {
        return http(api.getMainList, 'GET', {
            headers: {
                'Content-type': 'application/json',
            }
        }).then((response) => {
            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }, []);

    const { data: mainList, isLoading: mainListLoading } = useQuery<IMainListResponse>('getMainList', getMainList);
    
    return {
        getMainList,
        mainList,
        mainListLoading
    }
};

export default useMainList;