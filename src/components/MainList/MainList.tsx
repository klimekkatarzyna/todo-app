import { FC, useCallback } from "react";
import styled from 'styled-components';
import { MenuListItem } from "../MenuListItem/MenuListItem";
import { IListItem, IListItemType } from '../../interfaces';
import { mainListData } from "../../constants";
import { useMutation, useQuery } from "react-query";
import useList from "../List/useList";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

interface IMainList {

}

export const MainList: FC<IMainList> = () => {
    // TODO: renurns from API
    // TODO: endpomt to update tasksNumber

    // const { createMainList, getMainList } = useList();
    // const { data } = useQuery('createMainList', createMainList);
    
    return (
        <Wrapper>
            {mainListData.map((listItem: IListItem) => (
                <MenuListItem listItem={listItem} />
            ))}
        </Wrapper>
    )
}