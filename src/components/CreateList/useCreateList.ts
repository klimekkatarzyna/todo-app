import React, { useCallback } from 'react';
import { http } from '../../utils/http';
import * as api from '../../services';

const useCreateList = () => {

    const createList = useCallback((title: string) => {
        return http(api.createList, 'POST', {
            body: JSON.stringify({ title  }),
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

    const getLists = useCallback(() => {
        return http(api.getLists, 'GET', {
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
        createList,
        getLists
    }
};

export default useCreateList;