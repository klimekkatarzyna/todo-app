import React, { useCallback } from 'react';
import { http, HttpResponse } from '../../utils/http';
import * as api from '../../services';
import { mainListData } from '../../constants';
import { IListItem } from '../../interfaces';

const useList = (listId?: string) => {
    const createMainList = useCallback(() => {
        return http(api.mainList, 'POST', {
            body: JSON.stringify(mainListData),
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

    const getListById = useCallback(() => {
        if (!listId) return;
        return http(`${api.getListById}/${listId}`, 'GET', {
            headers: {
                'Content-type': 'application/json',
            }
        }).then((response) => {
            return response.body[0];
        }).catch(error => {
            console.error(error);
            return error;
        })
    }, [listId]);

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
        deleteList,
        createMainList,
        getMainList,
        getListById
    }
};

export default useList;