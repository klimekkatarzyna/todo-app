import React, { useCallback } from 'react';
import { http } from '../../utils/http';
import * as api from '../../services';

const useList = () => {

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

    const deleteList = useCallback((listId: string) => {
        return http(api.removeList, 'DELETE', {
            body: JSON.stringify({ listId }),
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
        getLists,
        deleteList
    }
};

export default useList;