import React, { useCallback } from 'react';
import { http } from '../../utils/http';
import * as api from '../../services';

const useMainList = () => {
    const createMainList = useCallback(() => {
        return http(api.mainList, 'POST', {
            body: JSON.stringify({ data: '' }),
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

    const getMainList = useCallback(() => {
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
    
    return {
        createMainList,
        getMainList
    }
};

export default useMainList;