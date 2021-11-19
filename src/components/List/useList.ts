import { useCallback } from 'react';
import { http, HttpResponse } from '../../utils/http';
import * as api from '../../services';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IUseParams } from '../../interfaces/app';
import { IDeleteListResponse, IListItem, IListResponse } from '../../interfaces/list';
import { useParams } from 'react-router';

const useList = () => {
    const query = useQueryClient();
    const { listId } = useParams<IUseParams>();

    const createList = useCallback((title: string | undefined): Promise<HttpResponse<IListItem>> => {
        return http(api.createList, 'POST', {
            body: JSON.stringify({ title, taskNumber: 0  }),
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

    const { mutate: mutateCreateList, isLoading: mutateCreateListLoading } = useMutation(createList, {
        onSuccess: (() => {
            query.invalidateQueries(['lists'])
        })
    });

    const getLists = useCallback(():  Promise<IListResponse> => {
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

    const { isLoading: getListsLoading, data: getListsQuery } = useQuery<IListResponse>('lists', getLists); // TODO: cache it

    const getListById = useCallback((): Promise<any> | undefined => {
        if (!listId) return;
        return http(`${api.getListById}/${listId}`, 'GET', {
            headers: {
                'Content-type': 'application/json',
            }
        }).then((response) => {
            return response.body?.[0];
        }).catch(error => {
            console.error(error);
            return error;
        })
    }, [listId]);

    const { data: getListByIdData, isLoading: getListByIdLoading } = useQuery(['getListById', listId], getListById);

    const deleteList = useCallback((listId: string): Promise<IDeleteListResponse> => {
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

    const { mutate: mutateRemoveList } = useMutation(deleteList, {
        onSuccess: () => {
            query.invalidateQueries(['lists'])
        }
    });

    return {
        mutateCreateList,
        mutateCreateListLoading,
        getListsLoading,
        getListsQuery,
        getListByIdData,
        getListByIdLoading,
        mutateRemoveList
    }
};

export default useList;